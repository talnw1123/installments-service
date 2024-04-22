const express = require("express");
const router = express.Router();
const downloadPdfController = require("../controllers/downloadPdfController");

router.get("/download", downloadPdfController.downloadContract);

module.exports = router;
