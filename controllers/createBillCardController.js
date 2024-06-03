const Bills = require("../models/billsModel");

const createBillCard = async (req, res) => {
  const {
    borrowerID,
    nationID,
    billNumber,
    contractNumber,
    totalLoan,
    downPayment,
    numberOfInstallments,
    interestRates,
    totalInstallmentAmount,
  } = req.body;

  try {
    const newBill = await Bills.create({
      borrowerID,
      nationID,
      billNumber,
      contractNumber,
      totalLoan,
      downPayment,
      numberOfInstallments,
      interestRates,
      totalInstallmentAmount,
    });

    res.status(201).json(newBill);
  } catch (err) {
    console.error("Error in creating borrower:", err);
    res.status(400).json({ message: "Error in creating borrower" });
  }
};

module.exports = createBillCard;
