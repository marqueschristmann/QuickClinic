import React, { useState, Fragment } from 'react';
import {Redirect} from 'react-router-dom';
import {setAlert} from '../../actions/alert';
import { register} from '../../actions/authUser';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


const UserRegister = ({ setAlert, register, isUserAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, email, password, password2} = formData;
    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2) {
            setAlert('Password do not match', 'danger');
        } else {
            register({ name, email, password });
        }
    }
    if(isUserAuthenticated) {
        return <Redirect to='/appointment' />
    }

    return (
        <Fragment>
            <section id="common">
                <div className="container">
                    <div className="common-form">
                        <div className="form-side">
                            <div className="heading-common">
                            <h1><strong> Usuário </strong>
                                <i className="fas fa-users"></i>
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
                                />
                                <small id="emailHelp" className="form-text text-muted">Este site  <a href="https://en.gravatar.com/" target="_blank" rel="noopener noreferrer">Gravatar </a> então se você quiser uma imagem de perfil, use um e-mail Gravatar</small>
                                </div>
                                <div className="form-group">
                                <label className="label" for="exampleInputEmail1"> Nome</label>
                                <input 
                                    type="text"
                                    className="form-control" 
                                    placeholder="Nome do Usuário." 
                                    name="name"
                                    value={name}
                                    onChange={e => onChange(e)}
                                />
                                </div>
                                <div className="form-group">
                                <label className="label" for="exampleInputPassword1">Senha</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Digite a senha." 
                                    name="password"
                                    value={password} 
                                    onChange={e => onChange(e)}
                                />
                                </div>
                                <div className="form-group">
                                <label className="label" for="exampleInputPassword1">Confirme Senha</label>
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    placeholder="Confirme Senha." 
                                    name="password2"
                                    value={password2} 
                                    onChange={e => onChange(e)}
                                />
                                </div>
                                <input type="submit" className="btn btn-info" value="Inscrever-se" />
                            </form>
                        </div>
                        <div className="img-side">
                            <img className="register-user" src={require("../../img/undraw_forms_78yw.svg")} alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

UserRegister.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isUserAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps =state => ({
    isUserAuthenticated: state.authUser.isUserAuthenticated
});

export default connect(mapStateToProps, {setAlert, register})(UserRegister);
