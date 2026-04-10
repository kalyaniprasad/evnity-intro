import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Features from './components/Features'
import Team from './components/Team'
import Download from './components/Download'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#F8FAFF]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Features />
        <Team />
        <Download />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
