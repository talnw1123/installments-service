const Borrower = require("../models/borrowerModel");

async function getBorrowersName(req, res) {
  try {
    const borrowers = await Borrower.find(
      { nationID: { $exists: true } },
      "firstName lastName"
    );
    res.json(borrowers);
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = getBorrowersName;
