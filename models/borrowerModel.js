const mongoose = require("mongoose");

const borrowerSchema = mongoose.Schema(
    {
        borrowerID:{
            type: String, 
            required: true,
            unique: true
        },
        nationID:{
            type: String,
            required: true,
            unique: true
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true
        },
        birthDate: {
            type: Date,
            required: true
        },
        job: {
            type: String,
            required: true
        },
        income: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        phoneInJob: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        kids: {
            type: String,
            required: true
        },
        addressReal: {
            type: String,
            required: true
        },
        addressCurrent: {
            type: String,
            required: true
        },
        addressJob: {
            type: String,
            required: true
        },
        googleMapAdressReal: {
            type: String,
            required: true
        },
        googleMapAdressCurrent: {
            type: String,
            required: true
        },
        googleMapAdressJob: {
            type: String,
            required: true
        },
        firstNameOfSpouse: {
            type: String,
        },
        lastNameOfSpouse: {
            type: String,
        },
        jobOfSpouse: {
            type: String,
        },
        incomeOfSpouse: {
            type: String,
        },
        phoneOfSpouseInJob: {
            type: String,
        },
        phoneOfSpouse: {
            type: String,
        },
        addressOfSpouseJob: {
            type: String,
            required: true
        },
        googleMapAdressJobOfSpouse: {
            type: String,
            required: true
        },
        guarantorFirstName: {
            type: String,
            required: true
        },
        guarantorLastName: {
            type: String,
            required: true
        },
        phoneOfGuarantor: {
            type: String,
            required: true
        },
        addressOfGuarantorReal: {
            type: String,
            required: true
        },
        addressOfGuarantorCurrent: {
            type: String,
            required: true
        },
        addressOfGuarantorJob: {
            type: String,
            required: true
        },
        jobOfGuarantor: {
            type: String,
            required: true
        },
        incomeOfGuarantor: {
            type: String,
            required: true
        },
        phoneOfGuarantorInJob: {
            type: String,
            required: true
        },
        bills: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);
  
module.exports = mongoose.model("Borrower", borrowerSchema);
