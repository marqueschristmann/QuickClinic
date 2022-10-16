import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import {Dots} from 'react-preloaders';
import ProfileItem from './ProfileItem';
import {getProfiles} from '../../actions/profile';

const Profiles = ({getProfiles, profile: { profiles,loading }}) => {
    useEffect(() => {
        getProfiles();
    },[getProfiles]);

    return (
        <Fragment>
            { loading ? <Spinner /> : 
                <Fragment>
                <section id="profiles-page">
                    <div className="container">
                        <div className="heading-common">
                            <h1><strong>Perfis das Clínicas</strong></h1>  
                        </div>
                        <h2 className="welcome-heading"><i className="fas fa-clinic-medical"></i> Reserve seus agendamentos</h2>
                        <br />
                        {
                            profiles != null ? (
                                profiles.map(profile => (
                                    <ProfileItem key={profile._id} profile={profile} />
                                ))
                            ) : <h4>Nenhum perfil encontrado..</h4>
                        }
                    </div>
                    <br />
                    <div className="img">
                        <div className="img-1">
                            <img src={require("../../img/Home.34f7bdfa.svg")}  />
                        </div>
                    </div>
                </section>
                </Fragment>
            }
        </Fragment>
    )
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {getProfiles})(Profiles);
