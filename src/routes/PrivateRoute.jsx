import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (user) {
    return children;
  }
  navigate("/");
};

export default PrivateRoute;
