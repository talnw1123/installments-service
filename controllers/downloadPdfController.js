const PuppeteerHTMLPDF = require("puppeteer-html-pdf");
const hbs = require("handlebars");
const path = require("path");

async function downloadContract(req, res) {
  try {
    const htmlPDF = new PuppeteerHTMLPDF();
    htmlPDF.setOptions({ format: "A4" });

    const html = await htmlPDF.readFile(
      path.join(__dirname, "..", "template", "contract.html"),
      "utf8"
    );
    const template = hbs.compile(html);
    const content = template();

    const pdfBuffer = await htmlPDF.create(content);
    res.type("application/pdf");
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).send("Failed to generate PDF : ", error);
  }
}

module.exports = { downloadContract };
