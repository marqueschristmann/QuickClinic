const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pacienteSchema = new Schema({
    googleId: {
        type: String,
        required: true,
        unique: true
    },
    email : {
        type: String
    },
    name: {
        type: String
    },
    picture: {
        type: String
    },
    phoneNumber: {
        type: String
    }
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;