import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex  justify-start items-center bg-white p-4 gap-6">
      <Link to="/">
        <h1 className="text-4xl font-bold text-blue-700">MERN Workouts</h1>
      </Link>
      <ul className="text-xl font-bold">
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
