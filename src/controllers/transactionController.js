import Transaction from "../models/Transaction.js";

export const createTransaction = async (req, res) => {
  const { amount, type, category, merchant, date } = req.body;

  const transaction = await Transaction.create({
    userId: req.user.id,
    amount,
    type,
    category,
    merchant,
    date,
  });

  return res.status(201).json({
    success: true,
    message: "Transaction created successfully",
    data: {
      transaction,
    },
  });
};

export const getTransactions = async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
  const skip = (page - 1) * limit;

  const filter = {
    userId: req.user.id,
  };

  if (req.query.type) {
    filter.type = req.query.type;
  }

  if (req.query.category) {
    filter.category = req.query.category;
  }

  const [transactions, total] = await Promise.all([
    Transaction.find(filter).sort({ date: -1 }).skip(skip).limit(limit),
    Transaction.countDocuments(filter),
  ]);

  return res.status(200).json({
    success: true,
    data: {
      transactions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    },
  });
};

export const updateTransaction = async (req, res) => {
  const allowedUpdates = ["amount", "type", "category", "merchant", "date"];
  const updates = {};

  for (const field of allowedUpdates) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }

  const transaction = await Transaction.findOneAndUpdate(
    {
      _id: req.params.id,
      userId: req.user.id,
    },
    updates,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!transaction) {
    return res.status(404).json({
      success: false,
      message: "Transaction not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Transaction updated successfully",
    data: {
      transaction,
    },
  });
};

export const deleteTransaction = async (req, res) => {
  const transaction = await Transaction.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!transaction) {
    return res.status(404).json({
      success: false,
      message: "Transaction not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Transaction deleted successfully",
  });
};
