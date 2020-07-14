const fs = require("fs");
const pdf = require("html-pdf");
const path = require("path");
const querys = require("../querys/SELECT");

const cardController = {};

cardController.create = async (req, res) => {
  const informacion = await querys.buscarAlumno(req.params.id);
  const exixtente = fs.existsSync(
    path.join(__dirname, `../pdf/${informacion[0].nombre}.pdf`)
  );

  if (!exixtente) {
    const html = fs.readFileSync(
      path.join(__dirname, `../public/pdf.html`),
      "utf-8"
    );
    const option = { format: "Letter" };
    pdf
      .create(html, option)
      .toFile(
        path.join(__dirname, `../pdf/${informacion[0].nombre}.pdf`),
        (err, res) => {
          if (err) {
            return console.log(err);
          }
        }
      );
      req.flash("info", "El pdf ha sido creado");
      res.reden("pages/pdf", { informacion });  
  }else{
      res.send('aqui andamos');
  } 
  
};

module.exports = cardController;
