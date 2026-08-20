import mongoose from "mongoose";
import Budget from "../models/Budget.js";
import Transaction from "../models/Transaction.js";

const getMonthDateRange = (month, year) => {
  const startDate = new Date(Date.UTC(year, month - 1, 1));
  const endDate = new Date(Date.UTC(year, month, 1));

  return { startDate, endDate };
};

const getUserObjectId = (userId) => {
  return new mongoose.Types.ObjectId(userId);
};

export const getMonthlySummary = async (req, res) => {
  const month = Number(req.query.month);
  const year = Number(req.query.year);
  const { startDate, endDate } = getMonthDateRange(month, year);

  const summary = await Transaction.aggregate([
    {
      $match: {
        userId: getUserObjectId(req.user.id),
        date: { $gte: startDate, $lt: endDate },
      },
    },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  const income = summary.find((item) => item._id === "income")?.total || 0;
  const expenses = summary.find((item) => item._id === "expense")?.total || 0;

  return res.status(200).json({
    success: true,
    data: {
      month,
      year,
      income,
      expenses,
      balance: income - expenses,
    },
  });
};

export const getCategoryBreakdown = async (req, res) => {
  const month = Number(req.query.month);
  const year = Number(req.query.year);
  const { startDate, endDate } = getMonthDateRange(month, year);

  const categories = await Transaction.aggregate([
    {
      $match: {
        userId: getUserObjectId(req.user.id),
        type: "expense",
        date: { $gte: startDate, $lt: endDate },
      },
    },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        total: 1,
      },
    },
    {
      $sort: { total: -1 },
    },
  ]);

  return res.status(200).json({
    success: true,
    data: {
      month,
      year,
      categories,
    },
  });
};

export const getBudgetProgress = async (req, res) => {
  const month = Number(req.query.month);
  const year = Number(req.query.year);
  const { startDate, endDate } = getMonthDateRange(month, year);
  const userId = getUserObjectId(req.user.id);

  const [budgets, spendingByCategory] = await Promise.all([
    Budget.find({ userId }).sort({ category: 1 }),
    Transaction.aggregate([
      {
        $match: {
          userId,
          type: "expense",
          date: { $gte: startDate, $lt: endDate },
        },
      },
      {
        $group: {
          _id: "$category",
          spent: { $sum: "$amount" },
        },
      },
    ]),
  ]);

  const spendingMap = new Map(
    spendingByCategory.map((item) => [item._id, item.spent])
  );

  const budgetProgress = budgets.map((budget) => {
    const spent = spendingMap.get(budget.category) || 0;
    const remaining = budget.monthlyLimit - spent;
    const percentageUsed = (spent / budget.monthlyLimit) * 100;

    return {
      id: budget._id,
      category: budget.category,
      monthlyLimit: budget.monthlyLimit,
      spent,
      remaining,
      percentageUsed: Number(percentageUsed.toFixed(2)),
      isOverBudget: spent > budget.monthlyLimit,
    };
  });

  return res.status(200).json({
    success: true,
    data: {
      month,
      year,
      budgets: budgetProgress,
    },
  });
};
