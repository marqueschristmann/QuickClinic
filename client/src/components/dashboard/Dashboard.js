import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import Experience from './Experience';
import Education from './Education';
import Patient from './Patient';
import Review from './Review';
import {getCurrentProfile, deleteAccount} from '../../actions/profile';
import {Link} from 'react-router-dom';


const Dashboard = ({
        getCurrentProfile, 
        deleteAccount, 
        authDoctor: {doctor}, 
        profile: {profile, loading}
    }) => {
        useEffect(() => {
            getCurrentProfile();
        }, [getCurrentProfile]);    
        
    return loading && profile == null ? (
        <Spinner />
    ) : (
        <Fragment>
                <section id="dashboard">
                    <div className="container">
                        <div className="heading-common">
                            <h1><strong>Dashboard</strong></h1>
                            <h2 className="welcome-heading"><i className="fas fa-clinic-medical"></i> Bem Vindo: {doctor && doctor.name}</h2>
                        </div>
                        <br />
                        {profile !== null ? (
                            <Fragment>
                                {profile.patients !== null && profile.patients.length > 0 ? 
                                    (
                                        <Patient patient={profile.patients} />
                                    ) : (
                                        <h5 style={{color: "#738f93"}}>Ainda não há agendamentos..</h5>
                                    )
                                }
                                <Review patient={profile.patients} review={profile.review} />
                                <Experience experience={profile.experience} />
                                <Education education={profile.education} />
                                <button 
                                    onClick={() => deleteAccount()}
                                    type="button" 
                                    className="btn btn-danger"><i className="fas fa-user-minus"></i> Deletar minha conta
                                </button>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <p>Você não tem nenhum perfil Informação do seu Perfil Adicione Agora..!</p>
                                <Link to='/create-profile' className="btn btn-info">
                                  Criar perfil
                                </Link>
                            </Fragment>  
                    )}
                    </div>
                </section>
                <br />
        </Fragment>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    authDoctor: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    authDoctor: state.authDoctor,
    profile: state.profile
});

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);
