// const Bills = require("../models/billsModel");

// const createBill = async (req, res) => {
//   const {
//     billNumber,
//     contractNumber,
//     totalLoan,
//     downPayment,
//     numberOfInstallment,
//     interestRates,
//     totalInstallmentAmount
//   } = req.body;

//   // Create a new Bills document using the Bills model
//   const bill = new Bills({
//     billNumber,
//     contractNumber,
//     totalLoan,
//     downPayment,
//     numberOfInstallment,
//     interestRates,
//     totalInstallmentAmount
//   });

//   try {
//     // Save the new bill to the database
//     const newBill = await bill.save();
//     res.status(201).json(newBill);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// module.exports = createBill;
const Bills = require("../models/billsModel");

const createBill = async (req, res) => {
  const {
    nationID,
    billNumber,
    contractNumber,
    totalLoan,
    downPayment,
    numberOfInstallment,
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

    // Create a new bill in the database using Bills.create()
    const newBill = await Bills.create({
      nationID,
      billNumber,
      contractNumber,
      totalLoan,
      downPayment,
      numberOfInstallment,
      interestRates,
      totalInstallmentAmount
    });

    res.status(201).json(newBill);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = createBill;
