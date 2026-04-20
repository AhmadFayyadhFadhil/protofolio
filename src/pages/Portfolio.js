import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Skills from '../components/Skills';
import Organizations from '../components/Organizations';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Portfolio() {
    return (
        <div className="bg-darkBg min-h-screen">
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Organizations />
            <Contact />
            <Footer />
        </div>
    );
}
