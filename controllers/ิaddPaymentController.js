const Bills = require("../models/billsModel");

const addPayment = async (req, res) => {
  const { billNumber, timePayments, damages } = req.body;

  if (!billNumber || !timePayments) {
    return res.status(400).json({ message: "Bill number and time payments are required" });
  }

  try {
    // Find the bill by billNumber
    const bill = await Bills.findOne({ billNumber });
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }
  
    // Update the paymentHistory array
    const updatedPaymentHistory = bill.paymentHistory.map((payment) => {
      if (timePayments.includes(payment.timePayment) && payment.status === 'unpaid') {
        return { ...payment, damages, status: 'paid' }; // Ensure to update damages field
      }
      return payment;
    });

    bill.paymentHistory = updatedPaymentHistory;
    await bill.save();

    res.status(200).json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = addPayment;


// const addPayment = async (req, res) => {
//   const { billNumber, timePayment, damages } = req.body;

//   if (!billNumber || !timePayment) {
//     return res.status(400).json({ message: "Bill number and time payment are required" });
//   }

//   try {
//     // ค้นหาบิลตาม billNumber
//     const bill = await Bills.findOne({ billNumber });

//     if (!bill) {
//       return res.status(404).json({ message: "Bill not found" });
//     }

//     // ค้นหา payment ที่ต้องการอัปเดต
//     const payment = bill.paymentHistory.find(
//       payment => payment.timePayment === timePayment && payment.status === 'unpaid'
//     );

//     if (!payment) {
//       return res.status(404).json({ message: "Payment not found or already paid" });
//     }

//     // อัปเดตค่า damages ถ้าได้รับ
//     if (damages !== undefined) {
//       payment.damages = damages;
//     }
//     payment.status = 'paid';

//     // บันทึกการเปลี่ยนแปลง
//     await bill.save();

//     res.status(200).json(bill);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = addPayment;

