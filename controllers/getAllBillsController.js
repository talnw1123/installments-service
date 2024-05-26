const Bills = require("../models/billsModel");

// Route to get all bills
const getAllBills = async (req, res) => {
  try {
    const allBills = await Bills.find();
    res.status(200).json(allBills);
  } catch (error) {
    console.error('Error fetching bills:', error);
    res.status(500).json({ error: 'Failed to fetch bills' });
  }
};

module.exports = getAllBills;