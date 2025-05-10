import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Stats = () => {
  const [counters, setCounters] = useState([
    { id: 1, current: 0, target: 1000, label: "Utilisateurs", duration: 2 },
    { id: 2, current: 0, target: 500, label: "Projets Créés", duration: 2 },
    { id: 3, current: 0, target: 2000, label: "Heures de Support", duration: 2 },
    { id: 4, current: 0, target: 50, label: "Équipes Formées", duration: 2 }
  ]);

  // Initialisation des animations
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });

    // Animation des compteurs
    const animateCounters = () => {
      const interval = setInterval(() => {
        setCounters(prevCounters => 
          prevCounters.map(counter => {
            if (counter.current < counter.target) {
              const increment = Math.ceil(counter.target / (counter.duration * 30));
              return {
                ...counter,
                current: Math.min(counter.current + increment, counter.target)
              };
            }
            return counter;
          })
        );
      }, 33); // ~30fps

      return () => clearInterval(interval);
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="stats" className="stats section">
      <div className="container" data-aos="fade-up">
        <div className="row gy-4">
          {counters.map((stat) => (
            <div key={stat.id} className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={stat.id * 100}>
              <div className="stats-item text-center w-100 h-100">
                <div className="stat-number">
                  <span className="counter">{stat.current.toLocaleString()}</span>
                  <span className="plus">+</span>
                </div>
                <p className="stat-label">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Styles CSS intégrés */}
      <style jsx>{`
        .stats {
          padding: 80px 0;
          background-color: #007bff;
          color: white;
        }
        
        .stats-item {
          padding: 30px 15px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          transition: transform 0.3s ease, background 0.3s ease;
        }
        
        .stats-item:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-5px);
        }
        
        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .counter {
          margin-right: 5px;
        }
        
        .plus {
          font-size: 1.5rem;
          opacity: 0.8;
        }
        
        .stat-label {
          font-size: 1.1rem;
          margin: 0;
          opacity: 0.9;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        @media (max-width: 768px) {
          .stat-number {
            font-size: 2rem;
          }
          
          .stat-label {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Stats;