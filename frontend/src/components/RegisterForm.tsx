import { useState } from "react";
import userService from "../requests/users";

const RegisterForm = () => {
  const [username, setUsername] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userObject = {
      username: username,
      password: password,
      name: firstname,
      last_name: lastname,
    };
    userService.createUser(userObject);
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
      <h1> Register </h1>
      <a href="/"> « Volver al inicio</a>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input value={username} onChange={handleUsernameChange}/>
        </div>
        <div>
          firstname
          <input value={firstname} onChange={handleFirstnameChange}/>
        </div>
        <div>
          lastname
          <input value={lastname} onChange={handleLastnameChange}/>
        </div>
        <div>
          password
          <input value={password} onChange={handlePasswordChange}/>
        </div>
        <button type="submit"> register </button>
      </form>
    </div>
  );
};

export default RegisterForm;