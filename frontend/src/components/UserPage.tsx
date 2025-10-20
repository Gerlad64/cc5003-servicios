import { useEffect, useState } from "react";
import loginService from "../requests/login";
import type { UserData } from "../model/UserData";

const UserPage = () => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const init = async () => {
      const user = await loginService.restoreLogin();
      console.log(user);
      setUser(user);
    };
    init()
  }, []);

  return (
    <div>
      {!user ? 
      (
        <div>
          not logged in
        </div>
      ) : (
        <div>
          <div>Name: {user?.name}</div>
          <div>Biography: {user?.biography}</div>
          <div>Last Name: {user?.last_name}</div>
          <div>Services: {user?.services}</div>
          <div>Rating: {user?.rating}</div>
        </div>
      )}
    </div>
  );
};

export default UserPage;