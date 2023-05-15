const { model, Schema } = require('mongoose');

const productoSchema = new Schema({

    nombre: { type: String, unique: true, required: [true, 'El nombre es obligatorio'] },
    estado: { type: Boolean, default: true, required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    precio: { type: Number, default: 0 },
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required: true },
    descripcion: { type: String },
    disponible: { type: Boolean, default: true },
    img: { type: String }
}, {
    versionKey: false
});

productoSchema.methods.toJSON = function () {
    const { _id, estado, ...data } = this.toObject();
    data.uid = _id;
    return data;
};

module.exports = model('Producto', productoSchema);