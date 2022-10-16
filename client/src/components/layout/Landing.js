import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import '../../App.css';

const Landing = ({isDoctorAuthenticated, isUserAuthenticated}) => {
    if(isDoctorAuthenticated){
        return <Redirect to="/dashboard" />
    } else if(isUserAuthenticated) {
        return <Redirect to="/appointment" />
    }

    return (
        <Fragment>
            <section id="landing">
                <div className="container">
                    <div className="heading">
                        <h1 className="main-heading">Encontre Sua Clínica &</h1>
                        <h1 className="main-heading">Reserve seu <span className="main-span">Horário.</span></h1>
                    </div>
                    <div className="signup">
                        <div className="doctor-signup">
                            <h2 className=" item heading-sub"><strong>Entrar como Clínicas</strong></h2>
                            <p className="item description">Registe sua Clínica para Encontrar Novos Usuários</p>
                            <Link to="/registerDoctor" type="button" className="item btn btn-info">inscrever-se</Link>
                        </div>
                        <div className="user-signup">
                            <h2 className="item heading-sub"><strong>Entrar como Usuários</strong></h2>
                            <p className="item special description">Aqui nosso sistema localiza a clínica, mais Próxima de você. </p>
                            <Link to="/registerUser" className="item btn btn-outline-info">inscrever-se</Link>
                        </div>
                    </div>
                    <br />
                    <div className="img">
                        <div className="img-1">
                            <img src={require("../../img/agenda-medica.svg")}  />
                        </div>
                    </div>
                </div>
                <br />
            </section>
        </Fragment>
    );
};
Landing.propTypes = {
    isDoctorAuthenticated: PropTypes.bool.isRequired,
    isUserAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
    isDoctorAuthenticated: state.authDoctor.isDoctorAuthenticated,
    isUserAuthenticated: state.authUser.isUserAuthenticated
});

export default connect(mapStateToProps)(Landing);
