import { useState } from "react";
import userService from "../requests/users";
import {useNavigate} from "react-router-dom";


const RegisterForm = () => {
  const [username, setUsername] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const navigate = useNavigate();
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userObject = {
      username: username,
      password: password,
      name: firstname,
      last_name: lastname,
    };
    userService.createUser(userObject)
        .then(() => {
            navigate('/login');
        })
        .catch((error) => {
        setErrorMessage(error.response?.data?.error);
    });
  }

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const handleFirstnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstname(event.target.value);
  }

  const handleLastnameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastname(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  return (
    <div>
      <h1> Registrarse </h1>
      <a href="/"> « Volver al inicio</a>
      <form onSubmit={handleSubmit}>
        <div>
          Nombre de usuario
          <input value={username} onChange={handleUsernameChange}/>
        </div>
        <div>
          Nombre 
          <input value={firstname} onChange={handleFirstnameChange}/>
        </div>
        <div>
          Apellido
          <input value={lastname} onChange={handleLastnameChange}/>
        </div>
        <div>
          Contraseña
          <input value={password} onChange={handlePasswordChange}/>
        </div>
        <button type="submit"> Registrarse </button>
      </form>
        {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default RegisterForm;