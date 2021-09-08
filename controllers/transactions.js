const Transaction = require('../models/Transaction.js');

// @desc   Get all transactions
// @route  GET /api/v1/transactions
// @access Public
exports.getTransactions = async (req, res, next) => {
  // res.send('GET transactions');
  // Apparently the try catch it's not ending and it also executes the catch
  try {
    const transactions = await Transaction.find(); // retrieves model to get info from db

    // console.log('Test in try');
    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    });
  } catch (err) {
    // console.log('Test in catch ', err.message );
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @desc   Add transactions
// @route  POST /api/v1/transactions
// @access Public
exports.addTransaction = async (req, res, next) => {
  try {
    const { text, amount } = req.body;

    const transaction = await Transaction.create(req.body);
    console.log('Try executed...');
  
    return res.status(201).json({
      success: true,
      data: transaction
    });
  } catch (err) {
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      console.log('...but also catch');
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      });
    }
  }
}

// @desc   Delete transactions
// @route  DELETE /api/v1/transactions:id
// @access Public
exports.deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if(!transaction) {
      return res.status(404).json({
        success: false,
        error: 'No transaction found'
      });
    }

    await transaction.remove();

    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    // console.log('Test in catch ', err.message );
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}