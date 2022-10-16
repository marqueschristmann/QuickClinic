import React, { useState, Fragment } from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/authDoctor';

const LoginDoctor = ({ login, isDoctorAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email, password} = formData;
    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    const onSubmit = async e => {
        e.preventDefault();
        login(email,password);
    }

    // Redirect if login
    if(isDoctorAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <section id="Login">
                <div className="container">
                    <div className="common-form">
                        <div className="form-side">
                            <div className="heading-common">
                                <h1><strong> Log Clínicas </strong>
                                      <i className="fas fa-sign-in-alt"></i>
                                </h1>
                            </div>
                            <form onSubmit={e => onSubmit(e)}>
                                <div className="form-group">
                                <label className="label" for="exampleInputEmail1">Endereço de Email</label>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder="Insira o seu endereço de email." 
                                    name="email"
                                    value={email}
                                    onChange={e => onChange(e)}
                                    required
                                />
                                <small id="emailHelp" className="form-text text-muted">Nunca compartilharemos seu e-mail com mais ninguém.</small>
                                </div>
                                <div className="form-group">
                                <label className="label" for="exampleInputPassword1">Senha</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Coloque sua senha." 
                                    name="password"
                                    minLength="6"
                                    value={password}
                                    onChange={e => onChange(e)}
                                />
                                </div>
                                <input type="submit" className="btn btn-info" value="Conecte-se" />
                                <p>or {' '}
                                <Link to="/">Criar uma nova conta</Link></p>
                            </form>
                        </div>
                        <div className="img-side">
                            <img src={require("../../img/undraw_doctor_kw5l.svg")} alt="" className="register-user" />
                        </div>
                    </div>
                </div>
            </section>    
        </Fragment>
    );
};

LoginDoctor.propTypes ={
    login: PropTypes.func.isRequired,
    isDoctorAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
    isDoctorAuthenticated: state.authDoctor.isDoctorAuthenticated
});

export default connect(mapStateToProps, {login})(LoginDoctor);
