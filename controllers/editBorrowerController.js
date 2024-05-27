const Borrower = require("../models/borrowerModel");

const updateCard = async (req, res) => {
  const {
    borrowerID,
    nationID,
    firstName,
    lastName,
    birthDate,
    job,
    income,
    phone,
    phoneInJob,
    status,
    kids,
    addressReal,
    addressCurrent,
    addressJob,
    googleMapAdressReal,
    googleMapAdressCurrent,
    googleMapAdressJob,
    firstNameOfSpouse,
    lastNameOfSpouse,
    jobOfSpouse,
    incomeOfSpouse,
    phoneOfSpouseInJob,
    phoneOfSpouse,
    addressOfSpouseJob,
    googleMapAdressJobOfSpouse,
    guarantorFirstName,
    guarantorLastName,
    phoneOfGuarantor,
    addressOfGuarantorReal,
    addressOfGuarantorCurrent,
    addressOfGuarantorJob,
    googleMapAdressRealOfGuarantor,
    googleMapAdressCurrentOfGuarantor,
    googleMapAdressJobOfGuarantor,
    jobOfGuarantor,
    incomeOfGuarantor,
    phoneOfGuarantorInJob,
    // bills,
  } = req.body;

  try {
    // ตรวจสอบว่ามี Borrower ที่มี nationID เดียวกันอยู่แล้วหรือไม่
    const existingBorrower = await Borrower.findOne({ nationID });
    if (!existingBorrower) {
      return res
        .status(404)
        .json({ message: "Borrower with this nationID does not exist" });
    }

    // ทำการอัปเดตข้อมูลของ Borrower ที่มี nationID ตรงกับที่รับมา
    const updatedBorrower = await Borrower.findOneAndUpdate(
      { nationID },
      {
        borrowerID,
        nationID,
        firstName,
        lastName,
        birthDate,
        job,
        income,
        phone,
        phoneInJob,
        status,
        kids,
        addressReal,
        addressCurrent,
        addressJob,
        googleMapAdressReal,
        googleMapAdressCurrent,
        googleMapAdressJob,
        firstNameOfSpouse,
        lastNameOfSpouse,
        jobOfSpouse,
        incomeOfSpouse,
        phoneOfSpouseInJob,
        phoneOfSpouse,
        addressOfSpouseJob,
        googleMapAdressJobOfSpouse,
        guarantorFirstName,
        guarantorLastName,
        phoneOfGuarantor,
        addressOfGuarantorReal,
        addressOfGuarantorCurrent,
        addressOfGuarantorJob,
        googleMapAdressRealOfGuarantor,
        googleMapAdressCurrentOfGuarantor,
        googleMapAdressJobOfGuarantor,
        jobOfGuarantor,
        incomeOfGuarantor,
        phoneOfGuarantorInJob,
        // bills,
      },
      { new: true }
    );

    res.status(200).json(updatedBorrower);
  } catch (err) {
    console.error("Error in updating borrower:", err);
    res.status(400).json({ message: "Error in updating borrower" });
  }
};

module.exports = updateCard;
