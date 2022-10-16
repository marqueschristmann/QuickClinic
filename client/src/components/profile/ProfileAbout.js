import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({ 
    profile: {
        bio,
        timing,
        doctor: {name}
    }
}) => {
    return (
        <Fragment>
            <div className="top-bio">
                <div className="bio">
                    <h2 className="heading-bio">Clínicas {(name.split(' ')[1])} Biografia</h2>
                    <p className="bio-p">{bio}</p>
                </div>
                <hr />
                <div className="time">
                    <h2 className="heading-bio">Horários de Funcionamentos</h2>
                    <p className="bio-p">{timing}</p>
                </div>
            </div>
            <br />
        </Fragment>
    )
};

ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileAbout;
