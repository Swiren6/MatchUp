import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Pricing = () => {
  const plans = [
    {
      id: 1,
      title: "Basique",
      price: "Gratuit",
      description: "Idéal pour découvrir les fonctionnalités de base",
      features: [
        "Matching intelligent basé sur l'IA",
        "Création de profil complète",
        "3 projets actifs/mois",
        "Support communautaire"
      ],
      popular: false,
      cta: "Commencer"
    },
    {
      id: 2,
      title: "Standard",
      price: "59.9",
      period: "/mois",
      description: "Solution complète pour freelances et petites équipes",
      features: [
        "Tout inclus dans Basique",
        "Projets illimités",
        "Outils de collaboration avancés",
        "Support prioritaire",
        "Statistiques de base"
      ],
      popular: true,
      cta: "Essayer maintenant"
    },
    {
      id: 3,
      title: "Premium",
      price: "99.9",
      period: "/mois",
      description: "Solution entreprise avec fonctionnalités avancées",
      features: [
        "Tout inclus dans Standard",
        "Gestion d'équipe complète",
        "Analyses approfondies",
        "Onboarding personnalisé",
        "Support dédié 24/7"
      ],
      popular: false,
      cta: "Nous contacter"
    }
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header" data-aos="fade-up">
          <h2 className="section-title">Des tarifs adaptés à vos besoins</h2>
          <p className="section-subtitle">Choisissez l'offre qui correspond à votre façon de travailler</p>
          <div className="divider" data-aos="fade-up" data-aos-delay="100"></div>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-grid">
          {plans.map((plan) => (
            <div 
              key={plan.id} 
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
              data-aos="fade-up" 
              data-aos-delay={150 * plan.id}
            >
              {plan.popular && <div className="popular-tag">Le plus choisi</div>}
              
              <div className="card-header">
                <h3>{plan.title}</h3>
                <div className="price">
                  {plan.price === "Gratuit" ? (
                    <span className="free-price">{plan.price}</span>
                  ) : (
                    <>
                      <span className="currency">TND</span>
                      <span className="amount">{plan.price}</span>
                      <span className="period">{plan.period}</span>
                    </>
                  )}
                </div>
                <p className="description">{plan.description}</p>
              </div>

              <div className="card-body">
                <ul className="features-list">
                  {plan.features.map((feature, index) => (
                    <li key={index}>
                      <svg className="check-icon" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card-footer">
                <button className={`cta-button ${plan.popular ? 'primary' : 'secondary'}`}>
                  {plan.cta}
                  <svg className="arrow-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom CSS */}
        <style jsx>{`
          .pricing-section {
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

          .pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
          }

          .pricing-card {
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
            position: relative;
            z-index: 1;
            display: flex;
            flex-direction: column;
            border: 1px solid #e2e8f0;
          }

          .pricing-card.popular {
            border: 2px solid #3a7bd5;
            transform: translateY(-10px);
            box-shadow: 0 15px 40px rgba(58, 123, 213, 0.15);
          }

          .pricing-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
          }

          .popular-tag {
            position: absolute;
            top: 20px;
            right: 20px;
            background: #3a7bd5;
            color: white;
            padding: 6px 12px;
            font-size: 0.8rem;
            font-weight: 600;
            border-radius: 50px;
          }

          .card-header {
            padding: 30px 30px 20px;
            border-bottom: 1px solid #f1f5f9;
          }

          .card-header h3 {
            font-size: 1.5rem;
            color: #2c3e50;
            margin-bottom: 15px;
            font-weight: 600;
          }

          .price {
            margin: 20px 0;
            color: #3a7bd5;
            display: flex;
            align-items: flex-end;
          }

          .free-price {
            font-size: 2rem;
            font-weight: 700;
          }

          .amount {
            font-size: 2rem;
            font-weight: 700;
            line-height: 1;
          }

          .currency {
            font-size: 1.2rem;
            margin-right: 5px;
            color: #64748b;
          }

          .period {
            font-size: 1rem;
            color: #64748b;
            margin-left: 5px;
          }

          .description {
            color: #64748b;
            line-height: 1.6;
            font-size: 0.95rem;
          }

          .card-body {
            padding: 25px 30px;
            flex-grow: 1;
          }

          .features-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .features-list li {
            margin-bottom: 12px;
            display: flex;
            align-items: flex-start;
            color: #475569;
          }

          .check-icon {
            width: 18px;
            height: 18px;
            color: #3a7bd5;
            margin-right: 10px;
            flex-shrink: 0;
            margin-top: 3px;
          }

          .card-footer {
            padding: 0 30px 30px;
          }

          .cta-button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            padding: 14px;
            border-radius: 8px;
            font-weight: 600;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            font-size: 1rem;
          }

          .cta-button.primary {
            background: linear-gradient(to right, #3a7bd5, #00d2ff);
            color: white;
          }

          .cta-button.secondary {
            background: white;
            color: #3a7bd5;
            border: 2px solid #3a7bd5;
          }

          .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(58, 123, 213, 0.3);
          }

          .arrow-icon {
            width: 18px;
            height: 18px;
            margin-left: 8px;
            transition: transform 0.3s ease;
          }

          .cta-button:hover .arrow-icon {
            transform: translateX(5px);
          }

          @media (max-width: 992px) {
            .pricing-card.popular {
              transform: none;
            }
          }

          @media (max-width: 768px) {
            .pricing-section {
              padding: 60px 0;
            }
            
            .section-title {
              font-size: 2rem;
            }
            
            .pricing-grid {
              grid-template-columns: 1fr;
              max-width: 400px;
              margin: 0 auto;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default Pricing;