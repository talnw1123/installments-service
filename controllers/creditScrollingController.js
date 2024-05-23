const axios = require("axios");

const creditScrolling = async (req, res) => {
  const { age, income, maritalStatus, children } = req.body;
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/predict-credit-scrolling",
      {
        Age: age,
        Income: income,
        "Marital Status": maritalStatus,
        "Number of Children": children,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.status(201).json(response.data);
  } catch (error) {
    console.error(error);
  }
};

module.exports = creditScrolling;
