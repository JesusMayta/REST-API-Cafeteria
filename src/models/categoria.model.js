const { model, Schema } = require('mongoose');

const categoriaSchema = new Schema({
    nombre: { type: String, unique: true, required: [true, 'El nombre es obligatorio'] },
    estado: { type: Boolean, default: true, required: true },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
}, {
    versionKey: false
});

categoriaSchema.methods.toJSON = function () {
    const { estado, ...data } = this.toObject();
    return data;
};

module.exports = model('Categoria', categoriaSchema);