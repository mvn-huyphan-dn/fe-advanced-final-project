import { useState } from "react";
import { fakeAuth } from "../../core/services";

export default function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = cb => {
    return fakeAuth.signin(() => {
      setUser("admin");
      localStorage.setItem('user', JSON.stringify({username: 'admin', role: 'admin'}))
      cb();
    });
  };

  const signout = cb => {
    return fakeAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
    setUser
  };
}
