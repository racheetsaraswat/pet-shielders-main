import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"

// Components
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import AuthGuard from "./components/AuthGuard"

// Pages
import Home from "./pages/Home"
import PetDetails from "./pages/PetDetails"
import PetListing from "./pages/PetListing"
import About from "./pages/About"
import Contact from "./pages/Contact"
import NotFound from "./pages/NotFound"
import RescuePage from "./pages/RescuePage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import AdoptionForm from "./pages/AdoptionForm"
import ScheduleVisit from "./pages/ScheduleVisit"
import FosterPage from "./pages/FosterPage"

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pets" element={<PetListing />} />
            <Route path="/pets/:id" element={<PetDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/rescue" element={<AuthGuard><RescuePage /></AuthGuard>} />
            <Route path="/adopt/:petId" element={<AuthGuard><AdoptionForm /></AuthGuard>} />
            <Route path="/visit/:petId" element={<AuthGuard><ScheduleVisit /></AuthGuard>} />
            <Route path="/foster" element={<FosterPage />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App

