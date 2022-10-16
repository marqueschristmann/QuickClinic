import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileExperience = ({
    experience: {
        medical, position, location ,from, to, description
    }
}) => {
    return (
        <Fragment>
            <div className="exp-common-details">
                <h5 className="profile-p"><strong> Nome: {medical}</strong></h5>
                <p className="mar-1">Data Da Ação : 
                     <Moment format='DD/MM/YYYY'>{from}</Moment> - {
                        !to ? 'Now' : <Moment format='DD/MM/YYYY'>{to}</Moment>
                    }
                </p>
                <p><strong>Tipo De Ação Social: </strong> {position}</p>
                <p><strong>Lacalização: </strong> {location}</p>
                <p><strong>Descrição: </strong>{description}</p>
            </div>
            <hr />
        </Fragment>
    )
};

ProfileExperience.propTypes = {
    experience: PropTypes.array.isRequired
};

export default ProfileExperience;
