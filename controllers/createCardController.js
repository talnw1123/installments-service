const Borrower = require("../models/borrowerModel")

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
        jobOfGuarantor,
        incomeOfGuarantor,
        phoneOfGuarantorInJob,
        bills,
      } = req.body;
    
      // Create a new Borrower document using the Borrower model
      const borrower = new Borrower({
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
        jobOfGuarantor,
        incomeOfGuarantor,
        phoneOfGuarantorInJob,
        bills,
      });
    
      try {
        // Save the new borrower to the database
        const newBorrower = await borrower.save();
        res.status(201).json(newBorrower);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
};

module.exports = createCard;