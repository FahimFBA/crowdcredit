import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className="flex gap-3" id="HEADER__NAVBAR__ID">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
    </div>
  );
};
