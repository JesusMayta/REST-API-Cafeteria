const { model, Schema, STATES } = require('mongoose');

const UsuarioSchema = new Schema({

    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    correo: { type: String, required: [true, 'El correo es obligatorio'], unique: true },
    password: { type: String, required: [true, 'La contraseña es obligatoria'] },
    img: { type: String },
    rol: { type: String, default: 'USER_ROLE', required: true, enum: ['ADMIN_ROLE', 'USER_ROLE'] },
    estado: { type: Boolean, default: true },
    google: { type: Boolean, default: false }

}, {
    versionKey: false
});


UsuarioSchema.methods.toJSON = function () {
    const { _id, password, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
};

module.exports = model('Usuario', UsuarioSchema);