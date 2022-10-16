import React, {useState, Fragment, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {createProfile, getCurrentProfile} from '../../actions/profile';

const Edit = ({ profile: {profile, loading}, createProfile, getCurrentProfile, history}) => {
    const [formData, setFormData] = useState({
        clinic: '',
        website: '',
        location: '',
        status: '',
        specialists: '',
        ruppess: '',
        timing: '',
        bio: '',
        twitter: '',
        facebook: '',
        youtube: '',
        instagram: '' 
    });

    const [displySocialInputs, toggleSocialInputs] = useState(false);
    useEffect(() => {
        getCurrentProfile();
        setFormData({
            clinic: loading || !profile.clinic ? '': profile.clinic,
            website: loading || !profile.website ? '': profile.website,
            location: loading || !profile.location ? '': profile.location,
            status: loading || !profile.status ? '': profile.status,
            specialists: loading || !profile.specialists ? '': profile.specialists,
            ruppess: loading || !profile.ruppess ? '': profile.ruppess,
            timing: loading || !profile.timing ? '': profile.timing,
            bio: loading || !profile.bio ? '': profile.bio,
            twitter: loading || !profile.social ? '': profile.social.twitter,
            facebook: loading || !profile.social ? '': profile.social.facebook,
            youtube: loading || !profile.social ? '': profile.social.youtube,
            instagram: loading || !profile.social ? '': profile.social.instagram
        });
    },[loading, getCurrentProfile]);

    const {
        clinic,
        website,
        location,
        status,
        specialists,
        ruppess,
        timing,
        bio,
        twitter,
        facebook,
        youtube,
        instagram
    } = formData;

    const onChange = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
    };

    return (
        <Fragment>
            <section id="Login">
                <div className="container">
                    <div style={{height: "auto"}} class="common-form">
                        <div className="form-side">
                            <div className="heading-common">
                                <h1><strong>Editar Perfil</strong>{' '}
                                    <i className="far fa-id-card"></i>
                                </h1>  
                                <p className="lead">
                                    <i className="fas fa-user"></i> Vamos pegar algumas informações para fazer seu
                                    perfil se destaca
                                </p>
                            </div>
                            <form onSubmit={e => onSubmit(e)}>
                                <small>* = Campo obrigatório</small>
                                <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="* Digite a especialidade da Clínica."
                                    name="status"
                                    value={status}
                                    onChange={e => onChange(e)} required
                                />
                                <small className="form-text text-muted">Dê-nos uma ideia da especialidade da Clínica</small>
                                </div>
                                <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="* Nome da Clínica" 
                                    name="clinic" 
                                    value={clinic}
                                    onChange={e => onChange(e)} required
                                />
                                <small className="form-text text-muted"> </small>
                                </div>
                                <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Serviços Na Área"
                                    name="specialists" 
                                    value={specialists}
                                    onChange={e => onChange(e)} required 
                                />
                                <small className="form-text text-muted">Dê-nos uma ideia do seus Serviços. </small>
                                </div>
                                <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="* Horários de Atendimentosg"
                                    name="timing"
                                    value={timing}
                                    onChange={e => onChange(e)} required
                                />
                                <small className="form-text text-muted">Diga nos seus Horários de Funcionamentos. </small>
                                </div>
                                <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="* Dias da Semana de Atendimentos"
                                    name="ruppess"
                                    value={ruppess}
                                    onChange={e => onChange(e)} required
                                />
                                <small className="form-text text-muted">Diga nos seus Dias de Funcionamentos. </small>
                                </div>
                                <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="* Geo-localização."
                                    name="website"
                                    value={website}
                                    onChange={e => onChange(e)} required
                                />
                                <small className="form-text text-muted">Outras Formas de Encontrar Copie olink do maps... </small>
                                </div>
                                <div className="form-group">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="* Localização."
                                    name="location"
                                    value={location}
                                    onChange={e => onChange(e)} required
                                />
                                <small className="form-text text-muted">Seu endereço de clínica </small>
                                </div>
                                <div className="form-group">
                                    <textarea 
                                        className="form-control" 
                                        placeholder="*  Uma pequena biografia sua" 
                                        name="bio"
                                        value={bio}
                                        onChange={e => onChange(e)} required
                                    />
                                    <small className="form-text">Conte-nos um pouco sobre você</small>
                                </div>

                                <div className="mb-3">
                                    <button onClick={() => toggleSocialInputs(!displySocialInputs)}
                                        type="button" className="btn btn-outline-secondary">
                                         Adicionar links de redes sociais
                                    </button>
                                    <span className="text-muted"> {' '}
                                    Opcional
                                    </span>
                                </div>
                                {displySocialInputs && (
                                    <Fragment>
                                        <div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fab fa-twitter"></i>
                                                    </span>
                                                </div>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Twitter Profile URL" 
                                                    name="twitter" 
                                                    value={twitter} onChange={e => onChange(e)} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fab fa-facebook"></i>
                                                    </span>
                                                </div>
                                                <input 
                                                    type="text" 
                                                    className="form-control form-control-lg" 
                                                    placeholder="Facebook Profile URL" 
                                                    name="facebook" 
                                                    value={facebook} onChange={e => onChange(e)} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fab fa-youtube"></i>
                                                    </span>
                                                </div>
                                                <input 
                                                    type="text" 
                                                    className="form-control form-control-lg" 
                                                    placeholder="Youtube Profile URL" 
                                                    name="youtube" 
                                                    value={youtube} onChange={e => onChange(e)} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <i className="fab fa-instagram"></i>
                                                    </span>
                                                </div>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    placeholder="Instagram Profile URL" 
                                                    name="instagram" 
                                                    value={instagram} onChange={e => onChange(e)} />
                                            </div>
                                        </div>
                                    </Fragment>
                                )}
                                <input type="submit" className="btn btn-info" /> {' '}
                                <Link to="/dashboard" className="btn btn-outline-secondary">Voltar</Link>
                            </form>
                            <br />
                        </div>
                        <div className="img-side">
                            <img src={require("../../img/mention.svg")} alt="" className="register-user" />
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

Edit.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile:PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(Edit));
