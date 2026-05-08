import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import Loader from './components/Loader'
import Home from './pages/Home'
import PrivacyPolicy from './pages/PrivacyPolicy'

export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-[#F8FAFF]">
        <Loader />
        <CustomCursor />
        <Navbar />
        
        {/* Main Content with Reveal Layering */}
        <div className="relative z-10 bg-[#F8FAFF] shadow-[0_-1px_100px_rgba(0,0,0,0.05)] mb-[400px] lg:mb-[400px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </div>

        {/* Sticky Footer */}
        <div 
          className="fixed bottom-0 left-0 w-full z-0 h-[400px]"
        >
          <Footer />
        </div>
      </div>
    </Router>
  )
}
