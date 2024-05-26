const mongoose = require("mongoose");

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
    required: true,
  },
});

function calculateTotalPaymentWithInterest(doc) {
  const totalLoanValue = parseFloat(doc.totalLoan);
  const interestRatesValue = parseFloat(doc.interestRates) / 100;
  return Math.ceil(totalLoanValue * (1 + interestRatesValue));
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

module.exports = mongoose.model("Bills", billsSchema);