import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SchoolDetails from "./pages/SchoolDetails";
import NotFound from "./pages/NotFound";
import Compare from "./pages/Compare";
import Footer from "./components/Footer";

function App() {

    return (

        <BrowserRouter>

            <Header />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route path="/about" element={<About />} />

                <Route path="/contact" element={<Contact />} />

                <Route
                    path="/school/:id"
                    element={<SchoolDetails />}
                />

                
                <Route
                    path="/compare"
                    element={<Compare />}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>

    );

}

export default App;