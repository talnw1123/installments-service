const axios = require("axios");

const creditScrolling = async (req, res) => {
  const { age, income, maritalStatus, children } = req.body;
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/predict-credit-scoring",
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
    res.status(500).send("Error predicting credit score");
  }
};

module.exports = creditScrolling;
