const router = require('express').Router();
const agendamentoImport = require("../models/agendamento.model");
const { Agendamento,  Feedback } = agendamentoImport;

router.route('/add-meet-link').put((req, res) => {
    const meetLink = req.body.meetLink;
    const agendamentoId = req.body.agendamentoId;

    Agendamento.findOne({ _id: agendamentoId }).then((agendamento) => {
        if (agendamento) {
            agendamento.googleMeetLink = meetLink;
            console.log(`Link do encontro recebido : ${meetLink}`);

            agendamento.save().then(() => {
                console.log(`Atualizado o link do encontro!`);
                res.status(200).json({ message: "Link do encontro atualizado!" });
            }).catch((err) => {
                console.log(`Não é possível adicionar o link do encontro ao compromisso devido a ${err}`);
                res.status(400).json({ message: `Não é possível adicionar o link do encontro ao compromisso devido a ${err}` });
            })
        }
    })
})

router.route('/feedback').put((req, res) => {
    const agendamentoId = req.body.agendamentoId;
    const stars = req.body.stars;
    const title = req.body.title;
    const review = req.body.review;

    Agendamento.findOne({ _id : agendamentoId }).then((agendamento) => {
        if(agendamento) {
            agendamento.feedback.stars = stars;
            agendamento.feedback.title = title;
            agendamento.feedback.review = review;
            agendamento.feedback.given = true;

            agendamento.save().then(() => {
                res.status(200).json({message : `Feedback updated successfully!`});
            }).catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
        }
    }).catch(err => {
        console.log(err);
        res.status(400).json(err);
    })
})

module.exports = router;