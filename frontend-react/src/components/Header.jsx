 import { Link } from "react-router-dom";
function Header() {
   
    return (

        <header className="header">

            <div className="logo">

                <h1>🎓 Kenya School Finder</h1>

                <p>Helping Kenyan students find the right senior school.</p>

            </div>

            <nav>
<Link to="/">Home</Link>
    <Link to="/">Schools</Link>
    <Link to="/about">About</Link>
    <Link to="/contact">Contact</Link>
                
            </nav>

        </header>

    );
}

export default Header;
