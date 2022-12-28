import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navBar">
            <Link to="/"> Provincias</Link>
            <Link to="/cant"> Cantones</Link>
            <Link to="/par"> Parroquias</Link>
        </div>
      );
}
 
export default Navbar;
