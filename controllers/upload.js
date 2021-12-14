const { response } = require("express");
const { subirarchivo } = require("../helpers/subirarchivo");
const Usuario = require("../models/usuario");
const Producto = require("../models/producto");
const path = require("path");
const fs = require("fs");

//  Subir Imagen a Cloudinary
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const CargarArchivos = async (req, res = response) => {
  try {
    const path = await subirarchivo(req.files, undefined, "Imagenes");
    res.json({
      name: path,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Bad Request / Extension No Permitida",
    });
  }
};

const ActualizarImagen = async (req, res = response) => {
  const { id, coleccion } = req.params;
  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe un usuario con ese id: ${id}`,
        });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `no existe un producto con ese id: ${id} `,
        });
      }
      break;
    default:
      res.status(500).json({ msg: "Aun no esta listo las demas validaciones" });
  }

  //Limpiar Imagen Previa

  if (modelo.img) {
    const pathimg = path.join(__dirname, "../uploads/", coleccion, modelo.img);

    if (fs.existsSync(pathimg)) {
      fs.unlinkSync(pathimg);
    }
  }

  //  Line de Codigo para Subir Archivo -> Subir Archivo -> Helper
  const namefile = await subirarchivo(req.files, undefined, coleccion);

  //  Igualamos la propiedad de la base de datos -> Revisar Nombre en
  modelo.img = namefile;

  await modelo.save();

  res.json({
    modelo,
  });
};

const GetImage = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: "No existe un usuario con ese id",
        });
      }

      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: "No existe un usuario con ese id",
        });
      }

      break;
    default:
      res.status(500).json({ msg: "Aun no esta listo las demas validaciones" });
  }

  //Limpiar Imagen Previa

  if (modelo.img) {
    const pathimg = path.join(__dirname, "../uploads/", coleccion, modelo.img);

    if (fs.existsSync(pathimg)) {
      return res.sendFile(pathimg);
    }
  }

  //  Si el Producto/Usuario o coleccion no tiene una imagen regresar una imagen por Default
  const PathNoFound = path.join(__dirname, "../assets/no-image.jpg");
  res.sendFile(PathNoFound);
};

const ActualizarImagenCloudinary = async (req, res = response) => {
  const { id, coleccion } = req.params;

  let modelo;

  switch (coleccion) {
    case "usuarios":
      modelo = await Usuario.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: "No existe un usuario con ese id",
        });
      }

      break;

    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: "No existe un usuario con ese id",
        });
      }

      break;
    default:
      res.status(500).json({ msg: "Aun no esta listo las demas validaciones" });
  }

  //Limpiar Imagen Previa

  if (modelo.img) {
    const cut = modelo.img.split("/");
    const nameimg = cut[cut.length - 1];
    const [public_id] = nameimg.split(".");

    cloudinary.uploader.destroy(public_id);
  }

  //  Nombre Temporal del Path del archivo
  const { tempFilePath } = req.files.archivo;

  //  Subir a Cloudinary
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

  //  Igualamos la propiedad de la base de datos -> Revisar Nombre en base de datos
  modelo.img = secure_url;

  await modelo.save();

  res.json({
    modelo,
  });
};

module.exports = {
  CargarArchivos,
  ActualizarImagen,
  GetImage,
  ActualizarImagenCloudinary,
};
