import About from "./About";
import Contact from "./Contact";
import Feature from "./Feature";
import FeaturesCards from "./FeaturesCards";
import Hero from "./Hero";
import Pricing from "./Pricing";
import Services from "./Services";
import Stats from "./Stats";
import Testimonials from "./Testimonials";




const LandingPage = () => {
  return (
    <div>
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
