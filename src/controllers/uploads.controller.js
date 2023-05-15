const path = require('path');
const fs = require('fs');
const { request, response } = require('express');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { subirArchivo, obtenerModeloImagen, catalogarArchivo } = require('../helpers');


const cargarArchivos = async (req = request, res = response) => {

    const { coleccion } = req.params;

    try {
        const nombreArchivo = await subirArchivo(req.files, coleccion);
        res.status(201).json({
            nombreArchivo
        });

    } catch (msg) {
        res.status(400).json({ msg });
    };
};

const actualizarImagen = async (req = request, res = response) => {

    const { coleccion, id } = req.params;

    const modelo = await obtenerModeloImagen(coleccion, id);

    if (!modelo) {
        return res.status(404).json({ msg: `El id: ${id} de la colección: ${coleccion.toUpperCase()} no existe` });
    };

    //Limpiar imagenes previas
    if (modelo.img) {

        const { tipo } = catalogarArchivo(modelo.img);
        const pathImg = path.join(__dirname, '../uploads/', coleccion, tipo, modelo.img);

        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg);
        };
    };

    const nombreArchivo = await subirArchivo(req.files, coleccion);
    modelo.img = nombreArchivo;

    await modelo.save();

    res.json(modelo);

};

const mostrarImagen = async (req = request, res = response) => {

    const { id, coleccion } = req.params;

    const notFound = path.join(__dirname, '../assets/no-image.jpg');

    const modelo = await obtenerModeloImagen(coleccion, id);

    if (!modelo) {
        return res.status(400).sendFile(notFound);
    };

    if (modelo.img) {
        const { tipo } = catalogarArchivo(modelo.img);
        const pathImg = path.join(__dirname, '../uploads/', coleccion, tipo, modelo.img);

        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg);
        };
    };

    res.status(404).sendFile(notFound);
};

const actualizarImagenCloudinary = async (req = request, res = response) => {

    const { id, coleccion } = req.params;

    const { tempFilePath } = req.files.archivo;

    const modelo = await obtenerModeloImagen(coleccion, id);

    if (modelo.img) {
        const nombreArr = modelo.img.split('/');
        const nombre = nombreArr[nombreArr.length - 1];
        const [public_id] = nombre.split('.');

        cloudinary.uploader.destroy(public_id);
    };

    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);

    modelo.img = secure_url;

    await modelo.save();

    res.json(modelo);
};

module.exports = {
    actualizarImagen,
    actualizarImagenCloudinary,
    cargarArchivos,
    mostrarImagen
};