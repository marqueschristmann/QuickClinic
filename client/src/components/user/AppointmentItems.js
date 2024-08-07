import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import {deleteAppointment} from '../../actions/appointment';

const AppointmentItems = ({
        appointment, deleteAppointment,
    }) => {
    
    const appointments = appointment.map(appnt => (
        <div key={appnt.id} className="profile-1">
            <div className="profile-img">
                <Link to={`/doctor/${appnt.doctor}`}>
                    <img src={appnt.avatar} alt="" />
                </Link>
                <h5 className="heading-sub"><strong>{appnt.name}</strong></h5>
            </div>
            <div className="profile-details">
                <div className="appointment-p profile-desc">
                    <h2 className="profile-heading">Nome: <strong>{appnt.patientname}</strong></h2>
                    <p className="profile-p"><strong> Doença Hereditárias: {appnt.fathername}</strong></p>
                    <p className="profile-p2"><strong>Idade: </strong>{appnt.age}</p>
                    <p className="profile-p2"><strong>Whatsapp: </strong>{appnt.status}</p>
                    <p className="profile-p2"><strong>Data: </strong><Moment format='DD/MM/YYYY'>{appnt.date}</Moment></p>
                    <p className="profile-p2"><strong>Reserva ID: </strong>{appnt.bookingId}</p>
                </div>
            </div>
            <div className="desc-p">
                <p className="profile-p2"><strong>Descrição: </strong>{appnt.description}</p>
                <button onClick={() => deleteAppointment(appnt._id)} type="button" className="profile-btn btn btn-danger">Cancelar</button>
            </div>
        </div>
    ));
    return (
        <Fragment>
            {appointments}
        </Fragment>
    );
};

AppointmentItems.propTypes = {
    appointment: PropTypes.array.isRequired,
    deleteAppointment: PropTypes.func.isRequired
}

export default connect(null, {deleteAppointment})(AppointmentItems);
