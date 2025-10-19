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
      <h1> Login </h1>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input value={username} onChange={handleUsernameChange}/>
        </div>
        <div>
          password
          <input value={password} onChange={handlePasswordChange}/>
        </div>
        <button type="submit"> login </button>
      </form>
    </div>
  );
};

export default LoginForm;