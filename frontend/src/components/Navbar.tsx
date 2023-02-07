import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <Link to="/">
        <h1>MERN Workouts</h1>
      </Link>
      <ul>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
