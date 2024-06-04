const Bills = require("../models/billsModel");

const createBill = async (req, res) => {
  const {
    nationID,
    billNumber,
    contractNumber,
    totalLoan,
    downPayment,
    numberOfInstallments,
    interestRates,
    totalInstallmentAmount
  } = req.body;

  try {
    // Check if BillNumber or ContractNumber already exists in the database
    const existingBill = await Bills.findOne({
      $or: [{ billNumber }, { contractNumber }]
    });

    if (existingBill) {
      return res.status(400).json({ message: "BillNumber or ContractNumber already exists" });
    }

    // Generate paymentHistory based on numberOfInstallments
    const paymentHistory = [];
    for (let i = 1; i <= numberOfInstallments; i++) {
      paymentHistory.push({
        timePayment: i,
        amount: (totalInstallmentAmount * (1 + parseFloat(interestRates) / 100) / numberOfInstallments),
        status: 'unpaid'
      });
    }

    // Create a new bill in the database using Bills.creainterestRateste()
    const newBill = await Bills.create({
      nationID,
      billNumber,
      contractNumber,
      totalLoan,
      downPayment,
      numberOfInstallments,
      interestRates,
      totalInstallmentAmount,
      paymentHistory
    });

    res.status(201).json(newBill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = createBill;

// const Bills = require("../models/billsModel");

// const createBill = async (req, res) => {
//   const {
//     nationID,
//     billNumber,
//     contractNumber,
//     totalLoan,
//     downPayment,
//     numberOfInstallments,
//     interestRates,
//     totalInstallmentAmount
//   } = req.body;

//   try {
//     // Check if BillNumber or ContractNumber already exists in the database
//     const existingBill = await Bills.findOne({
//       $or: [{ billNumber }, { contractNumber }]
//     });

//     if (existingBill) {
//       return res.status(400).json({ message: "BillNumber or ContractNumber already exists" });
//     }

//     // Create a new bill in the database using Bills.create()
//     const newBill = await Bills.create({
//       nationID,
//       billNumber,
//       contractNumber,
//       totalLoan,
//       downPayment,
//       numberOfInstallments,
//       interestRates,
//       totalInstallmentAmount
//     });

//     res.status(201).json(newBill);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// module.exports = createBill;
