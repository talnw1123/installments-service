const mongoose = require("mongoose");

const counterSchema = mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

const borrowerSchema = mongoose.Schema(
  {
    borrowerID: {
      type: Number,
      unique: true,
    },
    nationID: {
      type: String,
      unique: true,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    job: {
      type: String,
    },
    income: {
      type: String,
    },
    phone: {
      type: String,
    },
    phoneInJob: {
      type: String,
    },
    status: {
      type: String,
    },
    kids: {
      type: String,
    },
    addressReal: {
      type: String,
    },
    addressCurrent: {
      type: String,
    },
    addressJob: {
      type: String,
    },
    googleMapAdressReal: {
      type: String,
    },
    googleMapAdressCurrent: {
      type: String,
    },
    googleMapAdressJob: {
      type: String,
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
    },
    googleMapAdressJobOfSpouse: {
      type: String,
    },
    guarantorNationID: {
      type: String,
    },
    guarantorFirstName: {
      type: String,
    },
    guarantorLastName: {
      type: String,
    },
    phoneOfGuarantor: {
      type: String,
    },
    addressOfGuarantorReal: {
      type: String,
    },
    addressOfGuarantorCurrent: {
      type: String,
    },
    addressOfGuarantorJob: {
      type: String,
    },
    googleMapAdressRealOfGuarantor: {
      type: String,
    },
    googleMapAdressCurrentOfGuarantor: {
      type: String,
    },
    googleMapAdressJobOfGuarantor: {
      type: String,
    },
    jobOfGuarantor: {
      type: String,
    },
    incomeOfGuarantor: {
      type: String,
    },
    phoneOfGuarantorInJob: {
      type: String,
    },
    bills: {
      type: String,
    },
    creditScoreText: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

borrowerSchema.pre("save", function (next) {
  var doc = this;
  Counter.findByIdAndUpdate(
    { _id: "entityID" },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  )
    .then(function (count) {
      doc.borrowerID = count.seq;
      next();
    })
    .catch(function (err) {
      console.error("Counter error:", err);
      throw err;
    });
});

module.exports = mongoose.model("Borrower", borrowerSchema);
