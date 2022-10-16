import React, {Fragment, useState} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addExperience} from '../../actions/profile';

const AddExperience = ({addExperience, history}) => {
    const [formData, setFormData] = useState({
        medical: '',
        position: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '' 
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {medical, position, location, from, to, current, description} = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    return (
        <div>
            <Fragment>
            <section id="Login">
                <div className="container">
                    <div style={{height: "auto"}} class="common-form">
                            <div className="form-side">
                                <div className="heading-common">
                                    <h1><strong> Adicionar  Serviços </strong>
                                        <i className="fab fa-black-tie"></i>
                                    </h1>  
                                    <p className="lead">
                                        <i className="fas fa-user"></i> Adicione qualquer Parceirias ou Ações feitas pela Clínica
                                    </p>
                                </div>
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    addExperience(formData, history);
                                }}>
                                    <small>* = Campo obrigatório</small>
                                    <div className="form-group">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="* Locais Das Acões"
                                        name="medical"
                                        value={medical}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                    </div>
                                    <div className="form-group">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="* Tipo De Ação Social"
                                        name="position" 
                                        value={position} 
                                        onChange={e => onChange(e)} 
                                        required
                                    />
                                    </div>
                                    <div className="form-group">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        placeholder="* Localização" 
                                        name="location" 
                                        value={location} 
                                        onChange={e => onChange(e)} 
                                        required 
                                    />
                                    </div>
                                    
                                    <h6>Data Inicio</h6>
                                    <div className="form-group">
                                        <input type="date" className="form-control" name="from" value={from} onChange={e => onChange(e)} />
                                    </div>
                                    <div className="form-group">
                                        <p><input type="checkbox" name="current" checked={current} value={current} onChange={e => {
                                            setFormData({ ...formData, current: !current });
                                            toggleDisabled(!toDateDisabled);
                                        }} /> {' '} Doação Atual</p>
                                    </div>
                                    <h6>Até a presente data</h6>
                                    <div className="form-group">
                                        <input 
                                            type="date" 
                                            className="form-control" 
                                            name="to" 
                                            value={to} 
                                            onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''} />
                                    </div>
                                    <div className="form-group">
                                        <textarea 
                                            name="description"
                                            className="form-control" 
                                            placeholder="* Descrição do Programa" 
                                            value={description} onChange={e => onChange(e)}></textarea>
                                        <small className="form-text">Fale um pouco sobre o trabalho.</small>
                                    </div>
                                    <input type="submit" className="btn btn-info" />{' '}
                                    <Link to="/dashboard" type="submit" className="btn btn-outline-secondary">Volte</Link>
                                </form>
                                <br />
                            </div>
                            <div className="img-side">
                                <img className="register-user" src={require("../../img/undraw_medical_research_qg4d.svg")} alt="" />
                            </div>
                        </div>
                    </div>
            </section>
        </Fragment>
        </div>
    )
};
AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
}

export default connect(null, {addExperience})(withRouter(AddExperience));
