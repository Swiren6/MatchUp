import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          {/* Content Section */}
          <div className="about-content" data-aos="fade-right" data-aos-delay="100">
            <div className="section-tag" data-aos="fade-down" data-aos-delay="150">
              À propos de nous
            </div>
            <h2 className="section-title">
              <span className="gradient-text">MatchUp</span> - Votre plateforme de collaboration intelligente
            </h2>
            <p className="section-description">
              MatchUp révolutionne la façon dont les professionnels se connectent et collaborent. 
              Notre algorithme d'IA avancé analyse les compétences, les intérêts et les personnalités 
              pour créer des équipes parfaitement complémentaires.
            </p>

            <div className="features-grid">
              <div className="feature-item" data-aos="fade-up" data-aos-delay="200">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.5 3A6.5 6.5 0 0116 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 019.5 16 6.5 6.5 0 013 9.5 6.5 6.5 0 019.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5z" />
                  </svg>
                </div>
                <h3>Matching intelligent</h3>
                <p>Notre IA analyse 20+ critères pour des connexions pertinentes</p>
              </div>

              <div className="feature-item" data-aos="fade-up" data-aos-delay="250">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                  </svg>
                </div>
                <h3>Outils intégrés</h3>
                <p>Tout ce dont vous avez besoin pour gérer vos projets en un seul endroit</p>
              </div>

              <div className="feature-item" data-aos="fade-up" data-aos-delay="300">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" />
                  </svg>
                </div>
                <h3>Réseau qualifié</h3>
                <p>Connectez-vous avec des professionnels vérifiés et compétents</p>
              </div>

              <div className="feature-item" data-aos="fade-up" data-aos-delay="350">
                <div className="feature-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  </svg>
                </div>
                <h3>Gestion simplifiée</h3>
                <p>Suivi des projets et évaluation des membres en temps réel</p>
              </div>
            </div>
          </div>

          {/* Visual Section */}
          <div className="about-visual" data-aos="fade-left" data-aos-delay="100">
            <div className="image-stack">
              <div className="main-image-wrapper" data-aos="zoom-in" data-aos-delay="300">
                <img
                  src={process.env.PUBLIC_URL + "/assets/img/about-5.webp"}
                  alt="Équipe collaborant sur MatchUp"
                  className="main-image"
                />
                <div className="experience-badge" data-aos="fade-up" data-aos-delay="500">
                  <div className="years">3+</div>
                  <div className="label">Ans d'expérience</div>
                </div>
              </div>
              
              <div className="secondary-image-wrapper" data-aos="fade-left" data-aos-delay="400">
                <img
                  src={process.env.PUBLIC_URL + "/assets/img/about-2.webp"}
                  alt="Interface de MatchUp"
                  className="secondary-image"
                />
              </div>

              <div className="floating-element" data-aos="fade-down" data-aos-delay="600">
                <span className="icon">👥</span>
                <span className="text">10K+ utilisateurs satisfaits</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modern CSS Styles */}
      <style jsx>{`
        .about-section {
          padding: 100px 0;
          background: linear-gradient(to bottom, #f9fbfd 0%, #ffffff 100%);
          position: relative;
          overflow: hidden;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .section-tag {
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

        .section-title {
          font-size: 2.8rem;
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

        .section-description {
          font-size: 1.2rem;
          line-height: 1.6;
          color: #64748b;
          margin-bottom: 40px;
          max-width: 90%;
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }

        .feature-item {
          background: white;
          border-radius: 12px;
          padding: 25px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .feature-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 15px;
          color: white;
        }

        .feature-icon svg {
          width: 24px;
          height: 24px;
        }

        .feature-item h3 {
          font-size: 1.2rem;
          color: #1e293b;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .feature-item p {
          font-size: 0.95rem;
          color: #64748b;
          line-height: 1.5;
        }

        .about-visual {
          position: relative;
        }

        .image-stack {
          position: relative;
          height: 100%;
          min-height: 500px;
        }

        .main-image-wrapper {
          position: relative;
          width: 80%;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
          transform-style: preserve-3d;
          margin-left: auto;
        }

        .main-image {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.5s ease;
        }

        .main-image-wrapper:hover .main-image {
          transform: scale(1.03);
        }

        .secondary-image-wrapper {
          position: absolute;
          width: 50%;
          bottom: -40px;
          left: 0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
          border: 5px solid white;
          z-index: 2;
        }

        .secondary-image {
          width: 100%;
          height: auto;
          display: block;
        }

        .experience-badge {
          position: absolute;
          bottom: -20px;
          left: -20px;
          background: white;
          padding: 20px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 120px;
          height: 120px;
        }

        .years {
          font-size: 2.5rem;
          font-weight: 800;
          color: #3b82f6;
          line-height: 1;
        }

        .label {
          font-size: 0.9rem;
          color: #64748b;
          text-align: center;
          margin-top: 5px;
        }

        .floating-element {
          position: absolute;
          top: 50px;
          right: 0;
          background: white;
          padding: 12px 20px;
          border-radius: 50px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          z-index: 3;
          animation: float 6s ease-in-out infinite;
        }

        .floating-element .icon {
          font-size: 1.2rem;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @media (max-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .section-description {
            max-width: 100%;
          }

          .image-stack {
            min-height: 400px;
            margin-top: 40px;
          }

          .main-image-wrapper {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .about-section {
            padding: 60px 0;
          }

          .section-title {
            font-size: 2rem;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .image-stack {
            min-height: 300px;
          }

          .secondary-image-wrapper {
            width: 60%;
          }
        }
      `}</style>
    </section>
  );
};

export default About;