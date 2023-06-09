const { Schema, model } = require('mongoose');

const RolSchema = new Schema({
    rol: { type: String, required: [true, 'El rol es obligatorio'] }
}, {
    versionKey: false
});

module.exports = model('Role', RolSchema);