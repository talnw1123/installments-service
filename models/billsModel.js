// const mongoose = require("mongoose");
// const DailyLog = require("./dailyLogModel"); // import DailyLog model

// const paymentHistorySchema = mongoose.Schema({
//   paymentDate: {
//     type: Date,
//     default: Date.now,
//   },
//   timePayment: {
//     type: Number,
//     required: true,
//   },
//   amount: {
//     type: Number,
//   },
//   damages: {
//     type: Number,
//   },
//   status: {
//     type: String,
//     enum: ['unpaid', 'paid'],
//     default: 'unpaid'
//   }
// });

// function calculateTotalPaymentWithInterest(doc) {
//   const totalInstallmentAmountValue = parseFloat(doc.totalInstallmentAmount);
//   const interestRatesValue = parseFloat(doc.interestRates) / 100;
//   return Math.ceil(totalInstallmentAmountValue * (1+interestRatesValue));
// }

// const billsSchema = mongoose.Schema(
//   {
//     nationID: {
//       type: String,
//       ref: "Borrower",
//     },
//     billNumber: {
//       unique: true,
//       type: String,
//       required: true,
//     },
//     contractNumber: {
//       unique: true,
//       type: String,
//       required: true,
//     },
//     totalLoan: {
//       type: String,
//     },
//     downPayment: {
//       type: String,
//     },
//     numberOfInstallments: {
//       type: String,
//     },
//     interestRates: {
//       type: String,
//     },
//     totalInstallmentAmount: {
//       type: String,
//     },
//     paymentHistory: [paymentHistorySchema],
//     totalPaymentWithInterest: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// billsSchema.pre('save', function(next) {
//   this.totalPaymentWithInterest = calculateTotalPaymentWithInterest(this);
//   next();
// });

// billsSchema.methods.calculateDailyLogs = async function () {
//   const today = new Date();
//   const startOfDay = new Date(today.setHours(0, 0, 0, 0));
//   const endOfDay = new Date(today.setHours(23, 59, 59, 999));

//   const paymentsToday = this.paymentHistory.filter(payment => {
//     return payment.paymentDate >= startOfDay && payment.paymentDate <= endOfDay;
//   });

//   const totalPaidToday = paymentsToday.reduce((sum, payment) => sum + payment.amount, 0);

//   const totalDeptToday = this.totalPaymentWithInterest - this.paymentHistory.reduce((sum, payment) => sum + payment.amount, 0);

//   await DailyLog.findOneAndUpdate(
//     { date: startOfDay },
//     { totalPaid: totalPaidToday, totalDept: totalDeptToday },
//     { upsert: true, new: true }
//   );
// };

// module.exports = mongoose.model("Bills", billsSchema);

const mongoose = require("mongoose");
const DailyLog = require("./dailyLogModel"); // import DailyLog model

const paymentHistorySchema = mongoose.Schema({
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  timePayment: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
  },
  damages: {
    type: Number,
  },
  status: {
    type: String,
    enum: ['unpaid', 'paid'],
    default: 'unpaid'
  },
  demandDate: {
    type: Date,
  },
  paymentDueDate: {
    type: Date,
  },
  numberOfCall:{
    type:Number,
    default:0
  }
});

function calculateTotalPaymentWithInterest(doc) {
  const totalInstallmentAmountValue = parseFloat(doc.totalInstallmentAmount);
  const interestRatesValue = parseFloat(doc.interestRates) / 100;
  return Math.ceil(totalInstallmentAmountValue * (1 + interestRatesValue));
}

const billsSchema = mongoose.Schema(
  {
    nationID: {
      type: String,
      ref: "Borrower",
    },
    billNumber: {
      unique: true,
      type: String,
      required: true,
    },
    contractNumber: {
      unique: true,
      type: String,
      required: true,
    },
    totalLoan: {
      type: String,
    },
    downPayment: {
      type: String,
    },
    numberOfInstallments: {
      type: String,
    },
    interestRates: {
      type: String,
    },
    totalInstallmentAmount: {
      type: String,
    },
    paymentHistory: [paymentHistorySchema],
    totalPaymentWithInterest: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

billsSchema.pre('save', function(next) {
  this.totalPaymentWithInterest = calculateTotalPaymentWithInterest(this);
  next();
});

billsSchema.methods.calculateDailyLogs = async function () {
  const today = new Date();
  const startOfDay = new Date(today.setHours(0, 0, 0, 0));
  const endOfDay = new Date(today.setHours(23, 59, 59, 999));

  const bills = await mongoose.model('Bills').find();

  let totalPaidToday = 0;
  let totalDeptToday = 0;

  bills.forEach(bill => {
    const paidPayments = bill.paymentHistory.filter(payment => payment.status === 'paid');
    const unpaidPayments = bill.paymentHistory.filter(payment => payment.status === 'unpaid');
    
    const totalPaidInBill = paidPayments.reduce((sum, payment) => sum + payment.amount, 0);
    const totalUnpaidInBill = unpaidPayments.reduce((sum, payment) => sum + payment.amount, 0);

    totalPaidToday += totalPaidInBill;
    totalDeptToday += totalUnpaidInBill;
  });

  await DailyLog.findOneAndUpdate(
    { date: startOfDay },
    { totalPaid: totalPaidToday, totalDept: totalDeptToday },
    { upsert: true, new: true }
  );
};

module.exports = mongoose.model("Bills", billsSchema);
