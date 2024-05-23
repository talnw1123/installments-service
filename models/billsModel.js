const mongoose = require("mongoose");

const billsSchema = mongoose.Schema(
    {
        nationID:{
            type: String, // เปลี่ยนเป็น String
            ref:"Borrower", // เชื่อมโยงไปยัง Borrower model
        },
        billNumber:{
            unique: true,
            type: String,
            required: true,
        },
        contractNumber:{
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
        numberOfInstallment: {
            type: String,
        },
        interestRates: {
            type: String,
        },
        totalInstallmentAmount: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Bills", billsSchema);