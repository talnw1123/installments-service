const Borrower = require("../models/borrowerModel");

const createCard = async (req, res) => {
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
    if (existingBorrower) {
      return res.status(400).json({ message: 'Borrower with this nationID already exists' });
    }

    const newBorrower = await Borrower.create({
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
    });
    
    res.status(201).json(newBorrower);
  } catch (err) {
    console.error('Error in creating borrower:', err);
    res.status(400).json({ message: 'Error in creating borrower' });
  }
};

module.exports = createCard;
