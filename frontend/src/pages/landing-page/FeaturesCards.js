import React from "react";

const FeaturesCards = () => {
  const features = [
    {
      icon: "bi bi-award",
      title: "Matching Intelligent",
      description: "Notre algorithme d'IA vous connecte avec les bonnes personnes en fonction de vos compétences et intérêts.",
      color: "orange",
      delay: "100",
    },
    {
      icon: "bi bi-patch-check",
      title: "Collaboration Facile",
      description: "Utilisez nos outils intégrés pour communiquer et partager des ressources avec votre équipe.",
      color: "blue",
      delay: "200",
    },
    {
      icon: "bi bi-sunrise",
      title: "Gestion de Projet",
      description: "Suivez l'avancement de vos projets et gérez les tâches efficacement avec notre tableau de bord.",
      color: "green",
      delay: "300",
    },
    {
      icon: "bi bi-shield-check",
      title: "Sécurité des Données",
      description: "Vos données sont protégées grâce à des mesures de sécurité avancées et un chiffrement robuste.",
      color: "red",
      delay: "400",
    },
  ];

  return (
    <section id="features-cards" className="features-cards section">
      <div className="container">
        <div className="row gy-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="col-xl-3 col-md-6"
              data-aos="zoom-in"
              data-aos-delay={feature.delay}
            >
              <div className={`feature-box ${feature.color}`}>
                <i className={feature.icon}></i>
                <h4>{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Styles CSS intégrés */}
      <style jsx>{`
        .features-cards {
          padding: 60px 0;
          background-color: #f8f9fa;
        }

        .feature-box {
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          background-color: white;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .feature-box:hover {
          transform: translateY(-10px);
        }

        .feature-box i {
          font-size: 2rem;
          margin-bottom: 15px;
        }

        .feature-box h4 {
          font-size: 1.5rem;
          margin-bottom: 10px;
        }

        .feature-box p {
          font-size: 1rem;
          color: #666;
        }

        /* Couleurs dynamiques */
        .feature-box.orange {
          border-top: 4px solid orange;
        }

        .feature-box.blue {
          border-top: 4px solid blue;
        }

        .feature-box.green {
          border-top: 4px solid green;
        }

        .feature-box.red {
          border-top: 4px solid red;
        }
      `}</style>
    </section>
  );
};

export default FeaturesCards;