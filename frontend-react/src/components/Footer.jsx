import { Link } from "react-router-dom";

function Footer() {

    return (

        <footer className="footer">

            <div className="footerContent">


                <div className="footerBrand">

                    <h2>
                        🎓 Kenya School Finder
                    </h2>

                    <p>
                        Helping students discover the right senior school
                        opportunities across Kenya.
                    </p>

                </div>



                <div className="footerLinks">

                    <h3>
                        Explore
                    </h3>


                    <Link to="/">
                        Home
                    </Link>


                    <Link to="/about">
                        About
                    </Link>


                    <Link to="/contact">
                        Contact
                    </Link>

                </div>



                <div className="footerLinks">

                    <h3>
                        Features
                    </h3>


                    <span>
                        🔍 School Search
                    </span>


                    <span>
                        ⚖️ Compare Schools
                    </span>


                    <span>
                        📚 Subject Combinations
                    </span>


                </div>


            </div>



            <div className="footerBottom">

                <p>
                    © 2026 Kenya School Finder. All rights reserved.
                </p>

            </div>


        </footer>

    );

}


export default Footer;