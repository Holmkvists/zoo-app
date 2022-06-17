import { Link } from "react-router-dom";
import "../css/Header.css";

export const Header = () => {
  return (
    <header>
      <Link to={"/"}>
        <span className="logo">Z</span>
        <span className="logo">o</span>
        <span className="logo">o</span>
        <span className="logo">k</span>
        <span className="logo">l</span>
        <span className="logo">a</span>
        <span className="logo">p</span>
        <span className="logo">p</span>
        <span className="logo">a</span>
        <span className="logo">r</span>
      </Link>
    </header>
  );
};
