import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Feature = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  const features = [
    {
      id: "tab1",
      title: "Matching Intelligent",
      subtitle: "Connectez-vous avec les bonnes personnes",
      description: "Notre algorithme d'IA avancé analyse 20+ critères pour vous proposer des partenaires et projets parfaitement adaptés à votre profil.",
      items: [
        "Analyse des compétences et objectifs",
        "Swipe pour découvrir des projets",
        "Suggestions personnalisées en temps réel",
        "Compatibilité des personnalités"
      ],
      image: "/assets/img/MatchIa.png"
    },
    {
      id: "tab2",
      title: "Collaboration",
      subtitle: "Travaillez efficacement en équipe",
      description: "Des outils intégrés conçus pour faciliter la communication et le travail collaboratif entre les membres de votre équipe.",
      items: [
        "Chat et visioconférence intégrés",
        "Partage de fichiers sécurisé",
        "Tableau de bord collaboratif",
        "Notifications intelligentes"
      ],
      image: "/assets/img/Col.jpeg"
    },
    {
      id: "tab3",
      title: "Gestion de Projet",
      subtitle: "Organisez et suivez vos projets",
      description: "Tout ce dont vous avez besoin pour gérer vos projets efficacement, de la planification à la livraison finale.",
      items: [
        "Gestion des tâches et échéances",
        "Calendrier partagé interactif",
        "Suivi des performances",
        "Rapports d'avancement automatisés"
      ],
      image: "/assets/img/GestionProj.jpeg"
    }
  ];

  return (
    <section id="features" className="features-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header" data-aos="fade-up">
          <h2 className="section-title">Fonctionnalités clés</h2>
          <p className="section-subtitle">
            Découvrez comment MatchUp révolutionne votre façon de collaborer
          </p>
          <div className="divider" data-aos="fade-up" data-aos-delay="100"></div>
        </div>

        {/* Tabs Navigation */}
        <div className="tabs-nav" data-aos="fade-up" data-aos-delay="150">
          {features.map((feature) => (
            <button
              key={feature.id}
              className={`tab-button ${activeTab === feature.id ? 'active' : ''}`}
              onClick={() => setActiveTab(feature.id)}
            >
              <span className="tab-icon">
                {feature.id === "tab1" && (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 11.11V7a2 2 0 00-2-2h-4.17L13 2H7a2 2 0 00-2 2v16a2 2 0 002 2h5.11a7 7 0 01-1.11-4 7 7 0 0111-6.11M9 4h4l2 2h4v4.26A6.984 6.984 0 0015 10a6.984 6.984 0 00-6 3.53V4m1 6v1h6v-1h-6m0 2v1h5v-1h-5m5.5 8.5l3-3L18 17l-1.5-1.5-1 1L18 20l3.5-3.5-1-1z" />
                  </svg>
                )}
                {feature.id === "tab2" && (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3a9 9 0 00-9 9v7c0 1.1.9 2 2 2h4v-8H5v-1a7 7 0 0114 0v1h-4v8h4c1.1 0 2-.9 2-2v-7a9 9 0 00-9-9z" />
                  </svg>
                )}
                {feature.id === "tab3" && (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  </svg>
                )}
              </span>
              <span className="tab-title">{feature.title}</span>
            </button>
          ))}
        </div>

        {/* Tabs Content */}
        <div className="tabs-content">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`tab-pane ${activeTab === feature.id ? 'active' : ''}`}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="feature-grid">
                <div className="feature-text">
                  <h3>{feature.title}</h3>
                  <p className="feature-subtitle">{feature.subtitle}</p>
                  <p className="feature-description">{feature.description}</p>
                  <ul className="feature-items">
                    {feature.items.map((item, index) => (
                      <li key={index}>
                        <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="feature-image">
                  <img
                    src={process.env.PUBLIC_URL + feature.image}
                    alt={feature.title}
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modern CSS Styles */}
      <style jsx>{`
        .features-section {
          padding: 100px 0;
          background: linear-gradient(to bottom, #f9fbfd 0%, #ffffff 100%);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title {
          font-size: 2.5rem;
          color: #2c3e50;
          margin-bottom: 15px;
          font-weight: 700;
          background: linear-gradient(to right, #3a7bd5, #00d2ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: #7f8c8d;
          max-width: 600px;
          margin: 0 auto;
        }

        .divider {
          width: 80px;
          height: 4px;
          background: linear-gradient(to right, #3a7bd5, #00d2ff);
          margin: 20px auto;
          border-radius: 2px;
        }

        .tabs-nav {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .tab-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 30px;
          background: white;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          min-width: 160px;
        }

        .tab-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .tab-button.active {
          background: linear-gradient(135deg, #3a7bd5, #00d2ff);
          color: white;
        }

        .tab-button.active .tab-icon {
          color: white;
        }

        .tab-icon {
          width: 40px;
          height: 40px;
          margin-bottom: 10px;
          color: #3a7bd5;
        }

        .tab-icon svg {
          width: 100%;
          height: 100%;
        }

        .tab-title {
          font-size: 1rem;
          font-weight: 600;
        }

        .tabs-content {
          position: relative;
          min-height: 500px;
        }

        .tab-pane {
          display: none;
          animation: fadeIn 0.5s ease-out;
        }

        .tab-pane.active {
          display: block;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .feature-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }

        .feature-text {
          padding-right: 40px;
        }

        .feature-text h3 {
          font-size: 2rem;
          color: #2c3e50;
          margin-bottom: 10px;
          font-weight: 700;
        }

        .feature-subtitle {
          font-size: 1.2rem;
          color: #3a7bd5;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .feature-description {
          font-size: 1rem;
          color: #7f8c8d;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .feature-items {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .feature-items li {
          margin-bottom: 15px;
          display: flex;
          align-items: flex-start;
          color: #475569;
        }

        .check-icon {
          width: 20px;
          height: 20px;
          color: #3a7bd5;
          margin-right: 10px;
          flex-shrink: 0;
          margin-top: 3px;
        }

        .feature-image {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
          transition: transform 0.5s ease;
        }

        .feature-image img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.5s ease;
        }

        .feature-image:hover img {
          transform: scale(1.05);
        }

        @media (max-width: 1024px) {
          .feature-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .feature-text {
            padding-right: 0;
            order: 2;
          }

          .feature-image {
            order: 1;
          }
        }

        @media (max-width: 768px) {
          .features-section {
            padding: 60px 0;
          }

          .section-title {
            font-size: 2rem;
          }

          .tabs-nav {
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }

          .tab-button {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </section>
  );
};

export default Feature;