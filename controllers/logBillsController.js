// const DailyLog = require('../models/dailyLogModel');
// const Bills = require('../models/billsModel');

// const calculateDailyLog = async () => {
//   const today = new Date().setHours(0, 0, 0, 0);

//   const bills = await Bills.find({});
//   let totalPaid = 0;
//   let totalDept = 0;

//   bills.forEach(async (bill) => {
//     const paidToday = bill.paymentHistory.reduce((sum, payment) => {
//       const paymentDate = new Date(payment.paymentDate).setHours(0, 0, 0, 0);
//       return paymentDate === today ? sum + payment.amount : sum;
//     }, 0);
//     totalPaid += paidToday;
//     const totalLoanWithInterest = bill.totalPaymentWithInterest;
//     const totalPaidForBill = bill.paymentHistory.reduce((sum, payment) => sum + payment.amount, 0);
//     const deptForBill = totalLoanWithInterest - totalPaidForBill;
//     totalDept += deptForBill;
//   });

//   // Find or create daily log for today
//   await DailyLog.findOneAndUpdate(
//     { date: today },
//     { $set: { totalPaid, totalDept } },
//     { upsert: true, new: true }
//   );
// };

// module.exports = calculateDailyLog;

const DailyLog = require('../models/dailyLogModel');
const Bills = require('../models/billsModel');

const calculateDailyLog = async () => {
  const today = new Date().setHours(0, 0, 0, 0);

  const bills = await Bills.find({});
  let totalPaid = 0;
  let totalDept = 0;

  bills.forEach((bill) => {
    const totalPaidForBill = bill.paymentHistory
      .filter(payment => payment.status === 'paid')
      .reduce((sum, payment) => sum + payment.amount, 0);

    const totalDeptForBill = bill.paymentHistory
      .filter(payment => payment.status === 'unpaid')
      .reduce((sum, payment) => sum + payment.amount, 0);

    totalPaid += totalPaidForBill;
    totalDept += totalDeptForBill;
  });

  // Find or create daily log for today
  await DailyLog.findOneAndUpdate(
    { date: today },
    { $set: { totalPaid, totalDept } },
    { upsert: true, new: true }
  );
};

module.exports = calculateDailyLog;

