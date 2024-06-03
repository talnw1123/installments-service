const Bills = require('../models/billsModel');

const updatePaymentHistory = async (req, res) => {
  const { billNumber, demandDate, paymentDueDate, damages } = req.body;

  if (!billNumber || !demandDate || !paymentDueDate || !damages) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const bill = await Bills.findOne({ billNumber });

    if (!bill) {
      return res.status(404).send('Bill not found');
    }

    const latestUnpaid = bill.paymentHistory
      .filter(payment => payment.status === 'unpaid')
      .sort((a, b) => a.timePayment - b.timePayment)[0]; // หาค่า payment ที่มี timePayment น้อยที่สุด

    if (latestUnpaid) {
      latestUnpaid.demandDate = demandDate;
      latestUnpaid.paymentDueDate = paymentDueDate;
      latestUnpaid.damages = damages; // อัปเดตค่า damages
      latestUnpaid.numberOfCall += 1; // เพิ่มค่า numberOfCall ทีละ 1
    }

    await bill.save();

    res.status(200).send('Payment dates and damages updated successfully');
  } catch (error) {
    console.error('Error updating payment dates:', error);
    res.status(500).send('Internal server error');
  }
}

module.exports = updatePaymentHistory;
