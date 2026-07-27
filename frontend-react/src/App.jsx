import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SchoolDetails from "./pages/SchoolDetails";
import NotFound from "./pages/NotFound";
import Compare from "./pages/Compare";

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
                    path="*"
                    element={<NotFound />}
                />
                <Route
                    path="/compare"
                    element={<Compare />}
                />
            </Routes>

        </BrowserRouter>

    );

}

export default App;