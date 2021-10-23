import useProvideAuth from "../../hooks/useProvideAuth";
import { authContext } from "../../context";

export default function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}
