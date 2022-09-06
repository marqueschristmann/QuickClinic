import React from "react";

import Image from "../image/doctor.jpg";

const About = () => {
  return (
    <div className="container">
    <div className="card my-5  ">
      <div className="row g-0">
        <div className="col-md-4 order-md-2">
          <img src={Image} className="img-fluid rounded-start" alt="..." 
          width={300}
            height={300}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h3 className="card-title">sistema de agendamento</h3>
            <p className="card-text">
              nosso sistema
              localiza a clinica,
              mais proxima de voçe
              e marca sua consulta. 
              Um dos principais problemas com a atual situação de pandemia é que o
              hospitais estão um pouco ocupados lidando com pacientes de covid e outros foi pensando nisso
              que esse sistema surgiu.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default About;
