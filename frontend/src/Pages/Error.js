import React from "react";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <div>
      <h1 className="text-center mb-4 mt-4">Página não encontrada</h1>
      <div className="d-flex justify-content-center">
        <Link to="/" className="btn">
          <button type="button" className="btn btn-outline-dark text-centre">
            Voltar para Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
