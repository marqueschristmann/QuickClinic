const router = require('express').Router();
const agendamentoImport = require('../models/agendamento.model');
const jwt = require('jsonwebtoken');
const stripe = require("stripe")("sk_test_51IabQNSCj4BydkZ38AsoDragCM19yaMzGyBVng5KUZnCNrxCJuj308HmdAvoRcUEe2PEdoORMosOaRz1Wl8UX0Gt00FCuSwYpz")
const { v4: uuidv4 } = require('uuid');
const Paciente = require('../models/paciente.model');
const { Agendamento } = agendamentoImport;


// Para obter todos os pacientes
// ** SOMENTE PARA TESTES **
router.route('/').get((req, res) => {
    Paciente.find().then(pacientes => {
        res.status(200).json(pacientes);
    }).catch((err) => {
        res.status(400).json(`Error : ${err}`);
    })
})

// Para adicionar um paciente
router.route('/add').post((req, res) => {
    const googleId = req.body.googleId;
    const name = req.body.name;
    const picture = req.body.picture;

    const newPaciente = new Paciente({
        googleId, name, picture
    })

    newPaciente.save().then(() => {
        res.status(200).json('Paciente Adcionado');
    }).catch(err => {
        res.status(400).json(`Error : ${err}`);
    })
})

// Para atualizar o número de telefone de um paciente
router.route('/update-phone').put((req, res) => {
    const googleId = req.body.googleId;

    Paciente.findOne({ googleId: googleId }).then(paciente => {
        if (paciente) {
            paciente.phoneNumber = req.body.phoneNumber;

            paciente.save().then(() => {
                res.status(200).json('Paciente\'número de telefone atualizado');
            }).catch(err => {
                res.status(400).json({ message: `Error : ${err}` });
            });
        }
    })
})

router.route('/google-login').post(async (req, res) => {
    try {
        const tokenId = req.body.tokenId;

// Decodifica o jwt
        const decoded = jwt.decode(tokenId, process.env.KEY);
        const googleId = await decoded.sub;

// Verifica se o usuário já existe no banco de dados
        const paciente = await Paciente.findOne({ googleId: googleId });


// Se o paciente não for encontrado
        if (paciente === null) {
            const { email, name, picture } = decoded;
            const newPaciente = new Paciente({
                googleId, email, name, picture
            })
            const savedPromise = await newPaciente.save();
            if (savedPromise) {
                return res.status(200).json({ phoneNumberExists: false });
            }
            else {
                throw savedPromise;
            }
        }

// Se o número de telefone não estiver presente no banco de dados
        else if (paciente.phoneNumber === undefined) {
            return res.status(200).json({ phoneNumberExists: false });
        }

// O telefone do paciente já existe no banco de dados
        else {
            return res.status(200).json({ phoneNumberExists: true })
        }
    }
    catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
})

router.route('/getPacienteDetails/:googleId').get(async (req, res) => {
    try {
        const googleId = req.params.googleId;
        const paciente = await Paciente.findOne({ googleId: googleId });

        if (paciente) {
            return res.status(200).json(paciente);
        }
        else {
            return res.status(201).json({ message: "Paciente não encontrado!" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).json({ message: err });
    }
})

router.route('/previous-agendamento').post(async (req, res) => {
    try {
        const googleId = req.body.googleId;
        const agendamento = await agendamento.find({ pacienteId: googleId });


// Obtém dateTime atual
        const date = new Date()
        let currDateTime = date.getFullYear().toString()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()

        currDateTime += month < 10 ? ('-0' + month.toString()) : '-' + month.toString()
        currDateTime += day < 10 ? ('-0' + day.toString()) : '-' + day.toString()
        currDateTime += hour < 10 ? ('T0' + hour.toString()) : 'T' + hour.toString()
        currDateTime += minutes < 10 ? (':0' + minutes.toString()) : ':' + minutes.toString()
        currDateTime += seconds < 10 ? (':0' + seconds.toString()) : ':' + seconds.toString()

        const filteredAgendamentos = agendamentos.filter((agendamento) => {
            return Date.parse(currDateTime) >= Date.parse(agendamento.date + 'T' + agentamento.slotTime)
        })

        const sortedAgendamentos = filteredAgendamentos.sort((a, b) => {
            return Date.parse(b.date + 'T' + b.slotTime) - Date.parse(a.date + 'T' + a.slotTime)
        })

        res.status(200).json(sortedAgendamentos);
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
})

router.route('/upcoming-agendamentos').post(async (req, res) => {
    try {
        const googleId = req.body.googleId;
        const agendamentos = await Agendamento.find({ pacienteId: googleId });

// Obtém dateTime atual
        const date = new Date()
        let currDateTime = date.getFullYear().toString()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()

        currDateTime += month < 10 ? ('-0' + month.toString()) : '-' + month.toString()
        currDateTime += day < 10 ? ('-0' + day.toString()) : '-' + day.toString()
        currDateTime += hour < 10 ? ('T0' + hour.toString()) : 'T' + hour.toString()
        currDateTime += minutes < 10 ? (':0' + minutes.toString()) : ':' + minutes.toString()
        currDateTime += seconds < 10 ? (':0' + seconds.toString()) : ':' + seconds.toString()

        const filteredAgendamentos = agendamentos.filter((agendamento) => {
            return Date.parse(currDateTime) <= Date.parse(agendamento.date + 'T' + agendamento.slotTime)
        })

        const sortedAgendamentos = filteredAgendamentos.sort((a, b) => {
            return Date.parse(a.date + 'T' + a.slotTime) - Date.parse(b.date + 'T' + b.slotTime)
        })

        res.status(200).json(sortedAgendamentos);
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
})

router.route("/payment").post(async (req, res) => {
    const { finalBalnce, token } = req.body;
    // console.log(product);
    const idempotencyKey = uuidv4();

    return stripe.customers
        .create({
            email: token.email,
            source: token.id
        })
        .then(customer => {
            stripe.charges
                .create(
                    {
                        amount: finalBalnce * 100,
                        currency: 'usd',
                        customer: customer.id,
                        receipt_email: token.email,
                        description: `Agendamento reservado com sucesso`,
                        shipping: {
                            name: token.card.name,
                            address: {
                                line1: token.card.address_line1,
                                line2: token.card.address_line2,
                                city: token.card.address_city,
                                country: token.card.address_country,
                                postal_code: token.card.address_zip
                            }
                        }
                    },
                    {
                        idempotencyKey
                    }
                )
                .then(result => res.status(200).json(result))
                .catch(err => {
                    console.log(`Error : ${err}`);
                    res.status(400).json(err);
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
})


module.exports = router;