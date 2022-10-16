import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import {Dots} from 'react-preloaders';
import AppointmentItems from './AppointmentItems';
import {getAppointments, deleteAccountUser} from '../../actions/appointment';

const Appointments = ({
    getAppointments, 
    deleteAccountUser,
    authUser: {user},
    appointment: {appointments, loading}
}) => { 
    useEffect(() => {
        getAppointments();
    }, [getAppointments])

    return (
        <Fragment>
            { loading && appointments !== null ? <Spinner /> : 
                <Fragment>
                    <section id="dashboard">
                        <div class="container">
                            <div class="heading-common">
                                <h1><strong>Agendamentos</strong></h1>  
                                <h2 class="welcome-heading"><i class="fas fa-calendar-check"> Bem Vindo:</i>{' '}
                                    {user && (user.name.split(' ')[0].toLocaleUpperCase())} Esses são seus Agendamentos</h2>
                                <div className="mt-3" style={{display:"flex", justifyContent:"flex-end"}}>
                                    <button className="btn btn-danger" onClick={() => deleteAccountUser()}>
                                        <i className="fas fa-user-minus"></i>
                                           Deletar minha conta
                                    </button>
                                </div>
                            </div>
                            <div class="common-details">
                                <br />
                                {appointments !== null && appointments.appointments.length !== 0 ? (
                                    <div class="profiles">
                                            <Fragment>
                                                <AppointmentItems appointment={appointments.appointments} />
                                            </Fragment>
                                    </div>
                                ) : (
                                        <h4 style={{color:"#738f93"}}>Nenhum agendamento encontrado...</h4>
                                    )   
                                }
                            </div>
                        </div>
                    </section>
                </Fragment> 
            }
        </Fragment>
    )
}

Appointments.propTypes = {
    getAppointments: PropTypes.func.isRequired,
    deleteAccountUser: PropTypes.func.isRequired,
    authUser: PropTypes.object.isRequired,
    appointment: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    authUser: state.authUser,
    appointment: state.appointment
});

export default connect(mapStateToProps, {getAppointments, deleteAccountUser})(Appointments);
