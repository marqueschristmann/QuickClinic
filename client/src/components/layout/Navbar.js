import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { logout_user } from '../../actions/authUser';
import { logout_doctor } from '../../actions/authDoctor';

import '../../App.css';

const Navbar = (
        { 
            authUser: { isUserAuthenticated, loadingUser, user}, logout_user,
            authDoctor: {isDoctorAuthenticated, loadingDoctor, doctor}, logout_doctor
        }
    ) => {
        
        const authUserLinks = (
            <Fragment>
                <Link className="nav-logo" to="/appointment">
                QuickClínic <img className="nav-log-img" style={{width: "4.2rem"}} src={require("./kisspng-clinic-physician-medicine-specialty-computer-icons-5b0d0b9a1814b2.0269865615275815940987.png")} />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link to="/profiles" className="nav-link">Clínicas</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/appointment" className="nav-link ">Agendamentos
                            </Link>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link font-weight-bolder" 
                                onClick= {logout_user} href="">
                            <i className='fas fa-sign-out-alt' />{' '}
                            <span>Sair</span></a>
                        </li>
                    </ul>
                </div>
            </Fragment>
        );
        const authDoctorLinks = (
            <Fragment>
                <Link className="nav-logo" to="/dashboard">
                QuickClínic   <img className="nav-log-img" style={{width: "4.2rem"}} src={require("./kisspng-clinic-physician-medicine-specialty-computer-icons-5b0d0b9a1814b2.0269865615275815940987.png")} />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarNav" >
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link to="/dashboard" className="nav-link ">Dashboard</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to="/profiles" className="nav-link">Clínicas</Link>
                        </li>
                        <li className="nav-item dropdown active">
                            <Link className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                
                              Atualizar perfil
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link className="dropdown-item" to="/edit-Profile"><i className="far fa-id-card"></i> Editar Perfil</Link>
                                <Link className="dropdown-item" to="/add-Experience"> <i className="fab fa-black-tie"></i> Add Ações</Link>
                                <Link className="dropdown-item" to="/add-Education"><i className="fas fa-university"></i> Add Sobre</Link>
                            </div>
                        </li>
                        <li className="nav-item active">
                                <a className="nav-link font-weight-bolder" 
                                    onClick= {logout_doctor} href="">
                                <i className='fas fa-sign-out-alt' />{' '}
                                <span>Sair</span></a>
                            </li>
                    </ul>
                </div>
            </Fragment>
        )
        const guestLinks = (
            <Fragment>
                <Link className="nav-logo" to="/">
                    QuickClínic  <img className="nav-log-img" style={{width: "4.2rem"}} src={require("./kisspng-clinic-physician-medicine-specialty-computer-icons-5b0d0b9a1814b2.0269865615275815940987.png")} />       
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
                aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse " id="navbarNav">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                        <Link to="/profiles" className="nav-link">Clínicas</Link>
                    </li>
                    <li className="nav-item dropdown active">
                            <Link className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Entrar
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link className="dropdown-item" to="/loginUser"><i className="fas fa-users"></i> Login  Usuário</Link>
                                <Link className="dropdown-item" to="/loginDoctor"><i className="fas fa-clinic-medical"></i> Login  Clínicas</Link>
                            </div>
                        </li>
                    <li className="nav-item dropdown active">
                            <Link className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Registrar
                            </Link>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link className="dropdown-item" to="/registerUser"><i className="fas fa-users"></i> Registrar Usuário</Link>
                                <Link className="dropdown-item" to="/registerDoctor"><i className="fas fa-clinic-medical"></i> Registrar  Clínicas</Link>
                            </div>
                        </li>
                </ul>
                </div>
            </Fragment>
        )
    
    return (
        <nav className="main navbar sticky-top navbar-expand-sm navbar-dark bg-dark mb-3">
            <div className="container">
                    {
                        isUserAuthenticated || isDoctorAuthenticated ? (
                            <Fragment>
                            {
                                !loadingUser && (
                                    <Fragment> 
                                        {
                                            isUserAuthenticated ? authUserLinks : authDoctorLinks
                                        } 
                                    </Fragment>
                                )
                            }
                            </Fragment>
                        ) : guestLinks
                    }
            </div>
        </nav>
    );
};
Navbar.propTypes = {
    logout_user: PropTypes.func.isRequired,
    logout_doctor: PropTypes.func.isRequired,
    authUser: PropTypes.object.isRequired,
    authDoctor: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    authUser: state.authUser,
    authDoctor: state.authDoctor
});

export default connect(mapStateToProps, {logout_user, logout_doctor})(Navbar);
