const router = require("express").Router();
const clinicas = require("../models/clinica.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const agendamentoImport = require("../models/agendamento.model");
const { Clinica, Slot, DateSchedule } = clinicas;
const { Agendamento, Feedback } = agendamentoImport;
const bcrypt = require('../bcrypt/bcrypt');

function createDate(date) {
	return new DateSchedule({
		date: date,
		slots: [
			new Slot({
				time: "09:00:00",
				isBooked: false,
			}),
			new Slot({
				time: "12:00:00",
				isBooked: false,
			}),
			new Slot({
				time: "15:00:00",
				isBooked: false,
			}),
		],
	});
}

// Para obter todos os clinicas
// **APENAS PARA TESTES**
router.route("/").get((req, res) => {
	Clinica.find()
		.then((clinicas) => {
			res.json(clinicas);
		})
		.catch((err) => {
			res.status(400).json(`Error : ${err}`);
		});
});


// Para adicionar um Clinica
router.route("/add").post((req, res) => {
	const username = req.body.username; // Required.. can't be undefined
	const password = req.body.password;
	const name = req.body.name;
	const phoneNumber = req.body.phoneNumber;
	const specialization = req.body.specialization;
	const feesPerSession = req.body.feesPerSession;

	const newClinica = new Clinica({
		username,
		password,
		name,
		phoneNumber,
		specialization,
		feesPerSession,
	});

	newClinica
		.save()
		.then(() => {
			res.json("Clinica adicionada");
		})
		.catch((err) => {
			res.status(400).json(`Error : ${err}`);
		});
});

// Para atualizar um clinica
router.route("/update").put((req, res) => {
	const username = req.body.username;// Obrigatório.. não pode ser indefinido

	Clinica.findOne({ username: username }).then((clinica) => {
		if (clinica) {
			clinica.name = req.body.name;
			clinica.phoneNumber = req.body.phoneNumber;
			clinica.specialization = req.body.specialization;
			clinica.feesPerSession = req.body.feesPerSession;

			clinica
				.save()
				.then(() => {
					res.json("Clinica atualizada");
				})
				.catch((err) => {
					res.status(400).json(`Error : ${err}`);
					// console.log(err);
				});
		}
	});
});


// Login do clinica
router.route("/login").post(async (req, res) => {
	console.log("bateuAQUI");
	try {
		const username = req.body.username;


// Senha digitada pelo usuário
		const plainTextPassword = req.body.password;

// Password Salt para fins de hash
		const passwordSalt = process.env.PASSWORD_SALT;

// Senha criptografada após operação de hash
		const encryptedPassword = bcrypt.hash(plainTextPassword, passwordSalt)

		const clinica = await Clinica.findOne({
			username: username,
			password: encryptedPassword,
		});

		console.log(clinica);

		if (clinica === null) {
			return res.status(201).json({ message: "nome de usuário ou senha errado" });
		}

// Médico encontrado, retorna o token para o lado do cliente
		const token = jwt.sign(
			JSON.stringify(clinica),
			process.env.KEY, 
			{
				algorithm: process.env.ALGORITHM,
			}
		);

		return res.status(200).json({ token: token.toString() });

	} catch (err) {
		console.log(err);
		return res.status(400).json(err);
	}
});

// Para obter os slots disponíveis para a data
router.route("/get-slots").post(async (req, res) => {
	try {
		const id = req.body.clinicaId; // clinica 
		const date = req.body.date; // Data para reservar

		const clinica = await Clinica.findOne({ _id: id });


// Médico não encontrado
		if (clinica === null) {
			console.log("A Clinica não encontrado no banco de dados!");
			return res.status(201).json({
				message: " Clinica não encontrado no banco de dados!",
			});
		}


// Médico encontrado
// Localiza a data
		let count = 0;
		for (const i of clinica.dates) {
			if (i.date === date) {
				return res.status(200).json(i);
			}
			count++;
		}

		const oldLength = count;

// Adiciona novos slots se a data não for encontrada no banco de dados
		const dateSchedule = createDate(date);
		const updatedClinica = await Clinica.findOneAndUpdate(
			{ _id: clinica._id },
			{ $push: { dates: dateSchedule } },
			{ new: true }
		);

		if (updatedClinica) {
			return res.status(200).json(updatedClinica.dates[oldLength]);
		} else {
			const err = { err: "um erro ocorreu!" };
			throw err;
		}
	} catch (err) {
		console.log(err);
		return res.status(400).json({
			message: err,
		});
	}
});

router.route("/book-slot").post((req, res) => {
	const pacienteId = req.body.googleId; // ID do google do paciente
	const pacienteName = req.body.pacienteName; // Nome do paciente
	const clinicaId = req.body.clinicaId; // ID do médico 606460d2e0dd28cc76d9b0f3
	const slotId = req.body.slotId; // ID desse slot específico
	const dateId = req.body.dateId; // ID dessa data específica
	const meetLink = "";

	Clinica.findOne({ _id: clinicaId }).then((clinica) => {
		const date = clinica.dates.id(dateId);
		const slot = date.slots.id(slotId);
		slot.isBooked = true;
		clinica
			.save()
			.then(() => {
				// Cria uma entrada no banco de dados de compromissos
				const newAgendamento = new Agendamento({
					clinicaId,
					dateId,
					slotId,
					pacienteId,
					date: date.date,
					slotTime: slot.time,
					clinicaName: clinica.name,
					clinicaEmail: clinica.email,
					pacienteName: pacienteName,
					googleMeetLink: meetLink,
					feedback: new Feedback()
				});

				console.log(newAgendamento);

				newAgendamento
					.save()
					.then((agendamento) => {
						return res.status(200).json(agendamento);
					})
					.catch((err) => {
						console.log(err);
						res.status(400).json(err);
					});
			})
			.catch((err) => {
				console.log(err);
				res.status(400).json({
					message: `Um erro ocorreu : ${err}`,
				});
			});
	});
});

router.route("/agendamentos").post(async (req, res) => {
	try {
		const clinicaId = req.body.clinicaId;
		const agendamentos = await Agendamento.find({
			clinicaId: clinicaId,
		});
		const sortedAgendamentos = agendamentos.sort((a, b) => {
			return (
				Date.parse(b.date + "T" + b.slotTime) -
				Date.parse(a.date + "T" + a.slotTime)
			);
		});

		res.status(200).json(sortedAgendamentos);
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
});

router.route("/agendamento/:id").get(async (req, res) => {
	try {
		const agendamentoId = req.params.id;
		const agendamento = await Agendamento.findOne({
			_id: agendamentoId,
		});

		res.status(200).json(agendamento);
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
});

router.route('/todays-agendamentos').post(async (req, res) => {
	try {
		const date = new Date()
		let currDate = date.getFullYear().toString()
		const month = date.getMonth() + 1
		const day = date.getDate()

		currDate += month < 10 ? ('-0' + month.toString()) : '-' + month.toString()
		currDate += day < 10 ? ('-0' + day.toString()) : '-' + day.toString()

		const clinicaId = req.body.clinicaId;

		const agendamentos = await Agendamento.find({ clinicaId: clinicaId, date: currDate });

		const sortedAgendamentos = agendamentos.sort((a, b) => {
			return (
				Date.parse(a.date + "T" + a.slotTime) - Date.parse(b.date + "T" + b.slotTime)
			);
		});

		res.status(200).json(sortedAgendamentos);
	}
	catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
})

router.route('/previous-agendamentos').post(async (req, res) => {
	try {
		const clinicaId = req.body.clinicaId;

		const agendamentos = await Agendamento.find({ clinicaId: clinicaId });


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
			return Date.parse(currDateTime) >= Date.parse(agendamento.date + 'T' + agendamento.slotTime)
		})

		const sortedAgendamentos  = filteredAgendamentos.sort((a, b) => {
			return Date.parse(b.date + 'T' + b.slotTime) - Date.parse(a.date + 'T' + a.slotTime)
		})

		res.status(200).json(sortedAgendamentos);
	}
	catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
})

module.exports = router;
