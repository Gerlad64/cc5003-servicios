import { useState } from "react";
import loginService from "../requests/login";
import type { UserData } from "../model/UserData";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<UserData | null>(null);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
    } catch (error) {
      console.log(user);
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
          <input value={username} onChange={handleUsernameChange}/>
        </div>
        <div>
          Contraseña
          <input value={password} onChange={handlePasswordChange}/>
        </div>
        <button type="submit"> Iniciar Sesión </button>
      </form>
    </div>
  );
};

export default LoginForm;