const Borrower = require("../models/borrowerModel");
const Bills = require("../models/billsModel");

const getBorrowers = async (req, res) => {
  try {
    const borrowers = await Borrower.find({});
    const bills = await Bills.find({});

    const groupedData = [];
    borrowers.forEach(borrower => {
      const borrowerID = borrower._id;
      const matchingBills = bills.filter(bill => bill.nationID === borrower.nationID);
      groupedData.push({ borrowerID, borrower, bills: matchingBills });
    });

    res.status(200).json(groupedData);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(400).json({ message: 'Error fetching data' });
  }
};

module.exports = getBorrowers;
