
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  // Initialisation de AOS pour les animations
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section id="contact" className="contact section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Contactez-nous</h2>
        <p>Nous sommes là pour répondre à vos questions. N'hésitez pas à nous contacter.</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          {/* Informations de Contact */}
          <div className="col-lg-6">
            <div className="info-box">
              <i className="bi bi-geo-alt"></i>
              <h3>Adresse</h3>
              <p>08 Rue Newton, Ariana 2088</p>
            </div>

            <div className="info-box">
              <i className="bi bi-envelope"></i>
              <h3>Email</h3>
              <p>contact@matchup.com</p>
            </div>

            <div className="info-box">
              <i className="bi bi-phone"></i>
              <h3>Téléphone</h3>
              <p>+216 1 23 45 67 89</p>
            </div>

            {/* Carte Google Maps */}
            <div className="map">
              <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.383687575582!2d10.1780044!3d36.9008422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd34cc25bd5aff%3A0x495e852ae57f3ff5!2sTEK-UP%20University!5e0!3m2!1sfr!2stn!4v1710445567890" 
    width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* Formulaire de Contact */}
          <div className="col-lg-6">
            <form className="contact-form">
              <div className="row">
                <div className="col-md-6 form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div className="col-md-6 form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Votre email"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  className="form-control"
                  placeholder="Sujet"
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  className="form-control"
                  rows="5"
                  placeholder="Votre message"
                  required
                ></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Envoyer un message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Styles CSS intégrés */}
      <style jsx>{`
        .contact {
          padding: 60px 0;
          background-color: #f8f9fa;
        }

        .section-title {
          text-align: center;
          margin-bottom: 40px;
        }

        .section-title h2 {
          font-size: 2.5rem;
          color: #333;
        }

        .section-title p {
          font-size: 1.2rem;
          color: #666;
        }

        .info-box {
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
          transition: transform 0.3s ease;
        }

        .info-box:hover {
          transform: translateY(-5px);
        }

        .info-box i {
          font-size: 1.5rem;
          color: #007bff;
          margin-bottom: 10px;
        }

        .info-box h3 {
          font-size: 1.2rem;
          color: #333;
          margin-bottom: 10px;
        }

        .info-box p {
          font-size: 1rem;
          color: #666;
          margin: 0;
        }

        .map {
          margin-top: 20px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .contact-form {
          background-color: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .contact-form .form-group {
          margin-bottom: 20px;
        }

        .contact-form input,
        .contact-form textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
        }

        .contact-form textarea {
          resize: vertical;
        }

        .contact-form .btn-primary {
          background-color: #007bff;
          border: none;
          padding: 10px 20px;
          font-size: 1rem;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }

        .contact-form .btn-primary:hover {
          background-color: #0056b3;
        }
      `}</style>
    </section>
  );
};

export default Contact;