const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const feedback = new Schema({
    given : {
        type : Boolean,
        default : false
    },
    stars : {
        type : Number,
        default : 0,
        min : 0,
        max : 5
    },
    title : {
        type : String,
        default : ""
    },
    review : {
        type : String,
        default : ""
    }
})

const agendamentoSchema = new Schema({
    ClinicaId : {
        required: true,
        type: String
    },
    dateId : {
        required: true,
        type: String
    },
    slotId : {
        required: true,
        type: String
    },
    pacienteId : {
        required: true,
        type: String
    },
    date : {
        type: String
    },
    slotTime : {
        type: String
    },
    clinicaName : {
        type : String
    },
    clinicaEmail : {
        type : String
    },
    pacienteName : {
        type : String
    },
    googleMeetLink : {
        type : String
    },
    feedback : feedback
})

const Agendamento = mongoose.model('Agendamento', agendamentoSchema);
const Feedback = mongoose.model('Feedback', feedback);

module.exports = { 
    Agendamento,
     Feedback
     };