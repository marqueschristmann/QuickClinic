import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const ProfileEducation = ({ 
    education : {
        school, degree, fieldofstudy,from, to, description
    }
}) => {
    return (
        <Fragment>
            <div class="exp-common-details">
                <h5 className="profile-p"> <strong>Nome: {school}</strong> </h5>
                <p class="mar-1"> Data De Criação : <Moment format='DD/MM/YYYY'>{from}</Moment> - 
                    {
                        !to ? 'Now' : <Moment format='DD/MM/YYYY'>{to}</Moment>
                    }
                </p>
                <p><strong>Whatssap: </strong> {degree}</p>
                <p><strong>Área de Atuação: </strong>{fieldofstudy}</p>
                <p><strong>Descrição: </strong>{description}</p>
            </div>
            <hr/>
        </Fragment>
    )
};

ProfileEducation.propTypes = {
    education: PropTypes.array.isRequired
};

export default ProfileEducation;
