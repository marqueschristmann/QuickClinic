const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const pacientesRouter = require('./routes/pacientes');
const clinicasRotuer = require('./routes/clinicas');
const agendamentoRouter = require('./routes/agendamentos');
require('dotenv').config();
 
app.use(express.json());
app.use(cors(
    {
        origin: "*",// permite que o servidor aceite requisições de origens diferentes
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true // permite que o cookie de sessão do navegador passe
    }
));

app.use('/pacientes', pacientesRouter);
app.use('/clinicas', clinicasRotuer);
app.use('/agendamentos', agendamentoRouter);

const port = process.env.PORT || 5000;
const uri = process.env.ATLAS_URI;


mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;

connection.once('open', () => {

console.log('Banco de dados conectado com sucesso');

});

function getCurrentTime() {
    const date = new Date()
    console.log(date)
}

function getEndDateTime(dateTime) {
    // 2021-03-22T09:00:00
    const hrs = (parseInt(dateTime.split('T')[1].split(':')[0]) + 1).toString().padStart(2, '0')
    const time = hrs + ':00:00'
    const date = dateTime.split('T')[0]
    return date + 'T' + time
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
    console.log(`NODE_ENV = ${process.env.NODE_ENV}`)
    getCurrentTime()
    getEndDateTime("2021-03-22T09:00:00")
})

app.get('/', (req, res) => {
    res.status(200).json("Hello");
})

module.exports = app;