import About from "../components/landing-page/About";
import Contact from "../components/landing-page/Contact";
import Feature from "../components/landing-page/Feature";
import FeaturesCards from "../components/landing-page/FeaturesCards";
import Hero from "../components/landing-page/Hero";
import Pricing from "../components/landing-page/Pricing";
import Services from "../components/landing-page/Services";
import Stats from "../components/landing-page/Stats";
import Testimonials from "../components/landing-page/Testimonials";
import NavBar from  "../components/NavBar";



const LandingPage = () => {
  return (
    <div>
      <NavBar/>
      <Hero />
      <About />
      <Services />
      <Feature />
      <FeaturesCards />
      <Stats />
      <Testimonials />
      <Pricing />
      <Contact />
    </div>
  );
};

export default LandingPage;
