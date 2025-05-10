import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Services = () => {
  const services = [
    {
      id: 1,
      icon: "bi bi-robot",
      title: "Matching Intelligent",
      description: "Notre algorithme d'IA avancé analyse vos compétences, intérêts et objectifs pour vous connecter avec les partenaires idéaux.",
      link: "#",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 2,
      icon: "bi bi-people-fill",
      title: "Collaboration Facile",
      description: "Des outils intégrés pour une communication fluide, le partage de fichiers et le travail d'équipe en temps réel.",
      link: "#",
      color: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)"
    },
    {
      id: 3,
      icon: "bi bi-kanban-fill",
      title: "Gestion de Projet",
      description: "Tableaux Kanban, calendriers partagés et suivi des tâches pour une gestion de projet optimale.",
      link: "#",
      color: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)"
    },
    {
      id: 4,
      icon: "bi bi-shield-lock-fill",
      title: "Sécurité des Données",
      description: "Chiffrement de bout en bout et protocoles de sécurité avancés pour protéger vos informations.",
      link: "#",
      color: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  return (
    <section id="services" className="services section">
      <div className="container">
        {/* Section Title */}
        <div className="section-header" data-aos="fade-up">
          <h2 className="section-title">Nos Services Premium</h2>
          <p className="section-subtitle">Découvrez comment nous transformons votre façon de collaborer</p>
          <div className="divider" data-aos="fade-up" data-aos-delay="100"></div>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="service-card" 
              data-aos="fade-up" 
              data-aos-delay={150 * service.id}
            >
              <div 
                className="service-icon" 
                style={{ background: service.color }}
              >
                <i className={service.icon}></i>
              </div>
              <div className="service-content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href={service.link} className="service-link">
                  Explorer le service
                  <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Styles CSS intégrés */}
      <style jsx>{`
        .services {
          padding: 100px 0;
          background-color: #f8faff;
          position: relative;
          overflow: hidden;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 60px;
          position: relative;
        }
        
        .section-title {
          font-size: 2.8rem;
          color: #2c3e50;
          margin-bottom: 15px;
          font-weight: 700;
          background: linear-gradient(to right, #3a7bd5, #00d2ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .section-subtitle {
          font-size: 1.2rem;
          color: #7f8c8d;
          max-width: 700px;
          margin: 0 auto;
        }
        
        .divider {
          width: 80px;
          height: 4px;
          background: linear-gradient(to right, #3a7bd5, #00d2ff);
          margin: 20px auto;
          border-radius: 2px;
        }
        
        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }
        
        .service-card {
          background: white;
          border-radius: 15px;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.05);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
          position: relative;
          z-index: 1;
        }
        
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to bottom right, rgba(255,255,255,0.3), rgba(255,255,255,0));
          z-index: -1;
          border-radius: 15px;
        }
        
        .service-icon {
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          color: white;
        }
        
        .service-content {
          padding: 30px;
        }
        
        .service-content h3 {
          font-size: 1.5rem;
          color: #2c3e50;
          margin-bottom: 15px;
          font-weight: 600;
        }
        
        .service-content p {
          color: #7f8c8d;
          margin-bottom: 25px;
          line-height: 1.6;
        }
        
        .service-link {
          display: inline-flex;
          align-items: center;
          color: #3a7bd5;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .service-link i {
          margin-left: 8px;
          transition: transform 0.3s ease;
        }
        
        .service-link:hover {
          color: #00d2ff;
        }
        
        .service-link:hover i {
          transform: translateX(5px);
        }
        
        @media (max-width: 768px) {
          .services {
            padding: 60px 0;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;