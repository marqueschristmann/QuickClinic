import React, { Fragment,useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {connect} from 'react-redux';

const Patient = ({patient}) => {

    const [value,setValue] = useState([]);

    const modalBody = patient.map(pat => (
        <Fragment key={pat._id}>
            <h2 className="style-heading">Nome: <strong>{pat.patientname}</strong></h2>
            <p className="profile-p"><strong>Doença: {pat.fathername}</strong></p>
            <p className="profile-p2"><strong>Idade: </strong>{pat.age}</p>
            <p className="profile-p2"><strong>Whatsapp: </strong>{pat.status}</p>
            <p className="profile-p2"><strong>Data de Agendamento: </strong><Moment format='DD/MM/YYYY'>{pat.date}</Moment></p>
            <p className="profile-p2"><strong>Reserva ID: </strong>{pat.bookingId}</p>
        </Fragment>
    ));
    const patients = patient.map(ptn => (
        <tr key={ptn._id}>
            <td>{ptn.bookingId}</td>
            <td>{ptn.patientname}</td>
            <td>
                <Moment format='DD/MM/YYYY'>{ptn.date}</Moment>
            </td>
            <td>
            <button 
                onClick={() => setValue(ptn._id)}
                type="button" 
                className="btn btn-info"
                data-toggle="modal" data-target="#exampleModal">
                Ver
            </button>
                <div className="modal fade " id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Detalhes do paciente</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="profiles">
                                    <div className="profile-1">
                                        <div className="profile-details">
                                            <div className="appointment-p prfile-desc">
                                                {
                                                    modalBody.map(modal => value === modal.key ? 
                                                        modal.props.children : "")
                                                }
                                            </div>
                                        </div>
                                        <div className="desc-p profile-buttons">
                                            <p className="profile-p2"><strong>Descrição: </strong>{ptn.description}</p>                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-info" data-dismiss="modal">Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    ));

    return (
        <Fragment>
            <div className="common-details">
                <h2 className="credentials"><strong>Detalhes do Paciente</strong></h2>
                    <br />
                    <div className="common-table">
                        <div className="scroll-table">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Número da Reserva ID</th>
                                        <th>Nome do paciente</th>
                                        <th>Data do Agemdamento</th>
                                        <th></th>
                                    </tr>
                                </thead>
                            <tbody>
                                {patients}
                            </tbody>
                            </table>
                        </div>
                    </div>
            </div>
            <br />
        </Fragment>
    );
};

Patient.propTypes = {
    patient: PropTypes.array.isRequired,
}

export default connect(null)(Patient);
