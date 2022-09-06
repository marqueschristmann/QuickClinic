import { Button } from 'react-bootstrap';
import React, { useContext } from 'react';
// import GoogleLogin from 'react-google-login';
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from '../Auth/AuthContext';
import axios from 'axios';

const Card = ({ login = "Clinica", Image, link }) => {
  const { token, googleId, setToken, setGoogleId } = useContext(AuthContext);
  const history = useHistory();

  async function loginWithGoogle(e) {
    try {
      await window.gapi.auth2.getAuthInstance().signIn();
      const auth2 = await window.gapi.auth2.getAuthInstance();
      if (auth2.isSignedIn.get()) {
        console.log("[Google] Conectado com sucesso!");
        var profile = auth2.currentUser.get();
        console.log(profile);
        window.localStorage.setItem("token", profile.getAuthResponse().id_token);
        window.localStorage.setItem("googleId", profile.getId());

        const serverRes = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/pacientes/google-login/`,
          {
            tokenId: profile.getAuthResponse().id_token,
          }
        );

        if (serverRes) {
          console.log(serverRes.data.phoneNumberExists);

          setToken(profile.getAuthResponse().id_token);
          setGoogleId(profile.getId());

          if (serverRes.data.phoneNumberExists === true) {
            history.push("/paciente");
          } else {
            history.push("/paciente/update-phone");
          }
        }
        else {
          const err = {err : "Servidor não respondeu"}
          throw err;
        }
      }
    } catch (err) {
      console.log(`[Google] Ocorreu algum erro ao fazer login! ${err}`);
    }
  }

  return (
    <div className="card mb-3" style={{ width: "18rem" }}>
      <img src={Image} className="card-img-top" alt="..." height="240" />
      <div className="card-body">
        {((!token || googleId) && login === "Clinica") && <Link to={link} className="btn btn-primary justify-content-center w-100">Entrar como Clinica</Link>}
        {((token && !googleId) && login === "Clinica") && <Link to={link} className="btn btn-primary justify-content-center w-100">Meu painel</Link>}
        {((!googleId && login === "Paciente") && <Button onClick={loginWithGoogle} disabled={false} className="btn btn-primary justify-content-center w-100">Login Como Paciente</Button>)}
        {((token && googleId) && login === "Paciente") && <Link to={link} className="btn btn-primary justify-content-center w-100">Meu painel</Link>}
      </div>
    </div>
  )
}

export default Card;