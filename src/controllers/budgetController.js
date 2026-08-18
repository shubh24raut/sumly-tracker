import Budget from "../models/Budget.js";

const createBudget = async (req, res) => {
  try {
    const { monthlyLimit, category } = req.body;

    const budget = await Budget.create({
      userId: req.user.id,
      monthlyLimit,
      category,
    });

    return res.status(201).json({
      success: true,
      message: "Budget created successfully",
      data: {
        budget,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Budget already exists for this category",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create budget",
    });
  }
};

const updateBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const allowedUpdates = ["monthlyLimit", "category"];
    const updates = {};

    for (const field of allowedUpdates) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const budget = await Budget.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      updates,
      { new: true, runValidators: true }
    );

    if (!budget) {
      return res.status(404).json({
        success: false,
        message: "Budget not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Budget updated successfully",
      data: {
        budget,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Budget already exists for this category",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to update budget",
    });
  }
};

const getBudgets = async (req, res) => {
  const budgets = await Budget.find({ userId: req.user.id }).sort({
    category: 1,
  });

  return res.status(200).json({
    success: true,
    message: "Budgets retrieved successfully",
    data: {
      budgets,
    },
  });
};

const deleteBudget = async (req, res) => {
  const { id } = req.params;
  const budget = await Budget.findOneAndDelete({
    _id: id,
    userId: req.user.id,
  });

  if (!budget) {
    return res.status(404).json({
      success: false,
      message: "Budget not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Budget deleted successfully",
  });
};

export { createBudget, getBudgets, updateBudget, deleteBudget };
