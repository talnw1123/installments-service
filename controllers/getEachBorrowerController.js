const Borrower = require("../models/borrowerModel");
const Bills = require("../models/billsModel");

const getEachBorrowers = async (req, res) => {
  try {
    const { nationID } = req.params; // Assuming nationID is passed as a URL parameter
    const borrowers = await Borrower.find({ nationID });
    const bills = await Bills.find({ nationID });
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

module.exports = getEachBorrowers;