const Bills = require("../models/billsModel");

const addPayment = async (req, res) => {
  const { billNumber, amount } = req.body;

  if (!billNumber || !amount) {
    return res.status(400).json({ message: "Bill number and amount are required" });
  }

  try {
    // ค้นหาบิลตาม billNumber
    const bill = await Bills.findOne({ billNumber });

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    // คำนวณ timePayment ใหม่
    const newTimePayment = bill.paymentHistory.length ? bill.paymentHistory[bill.paymentHistory.length - 1].timePayment + 1 : 1;

    // สร้าง payment history ใหม่
    const newPayment = {
      paymentDate: new Date(),
      timePayment: newTimePayment,
      amount,
    };

    // เพิ่ม payment history ลงในบิล
    bill.paymentHistory.push(newPayment);

    // บันทึกการเปลี่ยนแปลง
    await bill.save();

    res.status(200).json(bill);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = addPayment;
