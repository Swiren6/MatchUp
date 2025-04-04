import React, { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      easing: 'ease-out-quart'
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className={`hero-section ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content" data-aos="fade-right" data-aos-delay="200">
            <div className="badge" data-aos="fade-down" data-aos-delay="300">
              Nouvelle Plateforme
            </div>
            <h1>
              <span className="gradient-text">Créez Votre Équipe</span><br />
              <TypeAnimation
                sequence={[
                  'Trouvez des Partenaires',
                  1500,
                  'Collaborez efficacement',
                  1500,
                  'Réalisez vos projets',
                  1500
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h1>
            <p className="subtitle">
              Trouvez des partenaires qui complètent vos compétences. Transformez vos idées en réalité avec une équipe alignée sur votre vision.
            </p>
            
            <div className="cta-container">
            <button 
            onClick={() => navigate('/register')} 
            className="btn-primary"
          >
                Commencer gratuitement
                <span className="arrow">→</span>
              </button>
              <a href="#features" className="cta-secondary" data-aos="fade-up" data-aos-delay="450">
                Voir les fonctionnalités
              </a>
            </div>

            <div className="stats" data-aos="fade-up" data-aos-delay="500">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Projets réalisés</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Utilisateurs</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">95%</span>
                <span className="stat-label">Satisfaction</span>
              </div>
            </div>
          </div>

          <div className="hero-visual" data-aos="fade-left" data-aos-delay="300">
            <div className="image-container">
              <img
                src={process.env.PUBLIC_URL + "/assets/img/partner.jpeg"}
                alt="Collaboration d'équipe"
                className="main-image"
              />
              <div className="floating-element element-1" data-aos="fade-down" data-aos-delay="600">
                <span>👋</span> Nouveaux membres
              </div>
              
            </div>
          </div>
        </div>
      </div>

      {/* Styles CSS modernes */}
      <style jsx>{`
        .hero-section {
          padding: 120px 0 100px;
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .hero-section.scrolled {
          padding: 100px 0 80px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .badge {
          display: inline-block;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          color: white;
          padding: 8px 16px;
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 20px;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }

        h1 {
          font-size: 3.5rem;
          line-height: 1.2;
          margin-bottom: 24px;
          font-weight: 800;
          color: #1e293b;
        }

        .gradient-text {
          background: linear-gradient(90deg, #3b82f6, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #64748b;
          max-width: 500px;
          margin-bottom: 32px;
        }

        .cta-container {
          display: flex;
          gap: 16px;
          margin-bottom: 40px;
        }

        .cta-primary, .cta-secondary {
          display: inline-flex;
          align-items: center;
          padding: 16px 28px;
          border-radius: 12px;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-decoration: none;
        }

        .cta-primary {
          background: linear-gradient(90deg, #3b82f6, #6366f1);
          color: white;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
        }

        .cta-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(59, 130, 246, 0.4);
        }

        .cta-secondary {
          background: white;
          color: #3b82f6;
          border: 1px solid #e2e8f0;
        }

        .cta-secondary:hover {
          background: #f8fafc;
          transform: translateY(-2px);
        }

        .arrow {
          margin-left: 8px;
          transition: transform 0.3s ease;
        }

        .cta-primary:hover .arrow {
          transform: translateX(4px);
        }

        .stats {
          display: flex;
          gap: 32px;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1e293b;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #64748b;
        }

        .hero-visual {
          position: relative;
        }

        .image-container {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
          transform-style: preserve-3d;
        }

        .main-image {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.5s ease;
        }

        .image-container:hover .main-image {
          transform: scale(1.03);
        }

        .floating-element {
          position: absolute;
          background: white;
          padding: 5px 10px;
          border-radius: 12px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 100;
          z-index: 3;
        }

        .element-1 {
          top: -20px;
          right: -20px;
          animation: float 6s ease-in-out infinite;
        }

        .element-2 {
          bottom: -20px;
          left: -20px;
          animation: float 5s ease-in-out infinite 1s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }

          .hero-content {
            text-align: center;
          }

          .subtitle {
            margin-left: auto;
            margin-right: auto;
          }

          .cta-container {
            justify-content: center;
          }

          .stats {
            justify-content: center;
          }

          .hero-visual {
            margin-top: 60px;
          }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2.5rem;
          }

          .subtitle {
            font-size: 1.1rem;
          }

          .cta-container {
            flex-direction: column;
            align-items: center;
          }

          .stats {
            flex-direction: column;
            gap: 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;