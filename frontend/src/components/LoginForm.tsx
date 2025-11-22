import { useState } from "react";
import loginService from "../requests/login";
import { useNavigate } from "react-router-dom";

interface LoginProps {
    setUser: (user: {username: string}) => void;
}

const LoginForm = ({setUser} : LoginProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user =await loginService.login({
        username,
        password,
      });
      setUser(user);
      navigate("/");
    } catch (error) {
      console.log(error)
    };
  }

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  return (
    <div>
      <h1> Iniciar Sesión </h1>
      <a href="/"> « Volver al inicio </a>
      <form onSubmit={handleSubmit}>
        <div>
          Nombre de usuario
          <input aria-label="username" id="username" name="username" value={username} onChange={handleUsernameChange}/>
        </div>
        <div>
          Contraseña
          <input aria-label="password" id="password" name="password" value={password} onChange={handlePasswordChange}/>
        </div>
        <button type="submit"> Iniciar Sesión </button>
      </form>
    </div>
  );
};

export default LoginForm;