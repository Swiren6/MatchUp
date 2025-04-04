import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Alex Dupont",
      role: "Entrepreneur",
      image: "/assets/img/testimonials/testimonials-1.jpg",
      stars: 5,
      quote: "MatchUp m'a permis de trouver une équipe incroyable pour mon projet de startup. L'algorithme de matching est vraiment puissant !",
    },
    {
      id: 2,
      name: "Sarah Martin",
      role: "Étudiante",
      image: "/assets/img/testimonials/testimonials-2.jpg",
      stars: 5,
      quote: "Je recommande MatchUp à tous les étudiants qui cherchent des partenaires pour leurs projets académiques. C'est simple et efficace !",
    },
    {
      id: 3,
      name: "Lucas Leroy",
      role: "Freelance",
      image: "/assets/img/testimonials/testimonials-3.jpg",
      stars: 5,
      quote: "Grâce à MatchUp, j'ai pu collaborer avec des professionnels talentueux sur des projets passionnants. Une plateforme indispensable !",
    },
    {
      id: 4,
      name: "Emma Bernard",
      role: "Chef de Projet",
      image: "/assets/img/testimonials/testimonials-4.jpg",
      stars: 5,
      quote: "Les outils de collaboration intégrés sont fantastiques. MatchUp a transformé la façon dont je gère mes projets d'équipe.",
    },
  ];

  // Initialisation des animations
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        {/* Section Title */}
        <div className="section-title" data-aos="fade-up">
          <h2>Témoignages</h2>
          <p>Découvrez ce que nos utilisateurs disent de MatchUp</p>
        </div>

        {/* Carrousel de témoignages */}
        <div className="testimonials-slider" data-aos="fade-up" data-aos-delay="100">
          <div className="row">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="col-lg-6 mb-4">
                <div className="testimonial-card" data-aos="zoom-in" data-aos-delay={testimonial.id * 100}>
                  <div className="card-header">
                    <img 
                      src={process.env.PUBLIC_URL + testimonial.image} 
                      alt={testimonial.name} 
                      className="testimonial-img"
                    />
                    <div className="user-info">
                      <h3>{testimonial.name}</h3>
                      <h4>{testimonial.role}</h4>
                    </div>
                  </div>
                  <div className="stars">
                    {[...Array(testimonial.stars)].map((_, i) => (
                      <i key={i} className="bi bi-star-fill"></i>
                    ))}
                  </div>
                  <div className="quote">
                    <i className="bi bi-quote quote-icon-left"></i>
                    <p>{testimonial.quote}</p>
                    <i className="bi bi-quote quote-icon-right"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Styles CSS intégrés */}
      <style jsx>{`
        .testimonials {
          padding: 80px 0;
          background-color: #f8f9fa;
        }
        
        .section-title {
          text-align: center;
          margin-bottom: 50px;
        }
        
        .section-title h2 {
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 15px;
        }
        
        .section-title p {
          font-size: 1.2rem;
          color: #6c757d;
        }
        
        .testimonial-card {
          background: white;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
        }
        
        .testimonial-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
        }
        
        .card-header {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .testimonial-img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 20px;
          border: 3px solid #007bff;
        }
        
        .user-info h3 {
          font-size: 1.3rem;
          color: #333;
          margin-bottom: 5px;
        }
        
        .user-info h4 {
          font-size: 1rem;
          color: #6c757d;
          font-weight: normal;
          margin: 0;
        }
        
        .stars {
          color: #ffc107;
          margin-bottom: 15px;
          font-size: 1.2rem;
        }
        
        .quote {
          position: relative;
        }
        
        .quote p {
          font-style: italic;
          color: #495057;
          line-height: 1.6;
        }
        
        .quote-icon-left,
        .quote-icon-right {
          color: #007bff;
          font-size: 1.5rem;
          opacity: 0.3;
        }
        
        .quote-icon-left {
          position: absolute;
          left: -10px;
          top: -5px;
        }
        
        .quote-icon-right {
          position: absolute;
          right: -10px;
          bottom: -5px;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;