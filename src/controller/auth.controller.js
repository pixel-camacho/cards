const conn = require("../database");
const helpers = require("../lib/helper");
const passport = require("passport");

const authController = {};

authController.sign_in = passport.authenticate("local.signin", {
  successRedirect: "/cards/home",
  failureRedirect: "/cards/sign-in",
  failureFlash: true,
});

authController.sign_up = async (req, res) => {
  const { usuario, nombre, correo, password } = req.body;

  const newUser = {
    usuario,
    nombre,
    correo,
    password,
  };
  newUser.password = await helpers.encryptPassword(password);
  const result = await conn.query("INSERT INTO usuarios SET ?", [newUser]);
  newUser.id = result.insertId;
  req.flash("success", "Usuario agregado");
  res.send({ status: "OK", data: newUser });
};

module.exports = authController;
