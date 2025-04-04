import React from "react";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Top Section */}
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-logo">MatchUp</h3>
            <p className="footer-tagline">
              Connecter les talents, réaliser des projets extraordinaires.
            </p>
            <div className="social-links">
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="GitHub"><FaGithub /></a>
            </div>
          </div>

          <div className="footer-links">
            <div className="links-column">
              <h4>Navigation</h4>
              <ul>
                <li><a href="#hero">Accueil</a></li>
                <li><a href="#about">À propos</a></li>
                <li><a href="#features">Fonctionnalités</a></li>
                <li><a href="#pricing">Tarifs</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="links-column">
              <h4>Légal</h4>
              <ul>
                <li><a href="#">Conditions d'utilisation</a></li>
                <li><a href="#">Politique de confidentialité</a></li>
                <li><a href="#">Cookies</a></li>
                <li><a href="#">Mentions légales</a></li>
              </ul>
            </div>

            <div className="links-column">
              <h4>Ressources</h4>
              <ul>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Support</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-contact">
            <h4>Contactez-nous</h4>
            <ul className="contact-info">
              <li>
                <MdLocationOn className="contact-icon" />
                <span>123 Rue Collaboratrice, Tunis, Tunisie</span>
              </li>
              <li>
                <MdEmail className="contact-icon" />
                <a href="mailto:contact@matchup.com">contact@matchup.com</a>
              </li>
              <li>
                <MdPhone className="contact-icon" />
                <a href="tel:+21612345678">+216 12 345 678</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom">
          <div className="copyright">
            &copy; {currentYear} MatchUp. Tous droits réservés.
          </div>
          <div className="footer-cta">
            <a href="#pricing" className="cta-button">
              Essayer gratuitement
            </a>
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .site-footer {
          background: linear-gradient(135deg, #2c3e50 0%, #1a2530 100%);
          color: #ffffff;
          padding: 60px 0 20px;
          font-size: 1rem;
          line-height: 1.6;
        }

        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .footer-top {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          margin-bottom: 40px;
        }

        .footer-brand {
          margin-bottom: 30px;
        }

        .footer-logo {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 15px;
          background: linear-gradient(to right, #3a7bd5, #00d2ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .footer-tagline {
          color: #b0bec5;
          margin-bottom: 20px;
        }

        .social-links {
          display: flex;
          gap: 15px;
        }

        .social-links a {
          color: #ffffff;
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }

        .social-links a:hover {
          color: #3a7bd5;
          transform: translateY(-3px);
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 30px;
        }

        .links-column h4 {
          font-size: 1.2rem;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 10px;
        }

        .links-column h4::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 40px;
          height: 2px;
          background: linear-gradient(to right, #3a7bd5, #00d2ff);
        }

        .links-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .links-column li {
          margin-bottom: 10px;
        }

        .links-column a {
          color: #b0bec5;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .links-column a:hover {
          color: #ffffff;
          padding-left: 5px;
        }

        .footer-contact h4 {
          font-size: 1.2rem;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 10px;
        }

        .footer-contact h4::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 40px;
          height: 2px;
          background: linear-gradient(to right, #3a7bd5, #00d2ff);
        }

        .contact-info {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .contact-info li {
          display: flex;
          align-items: flex-start;
          margin-bottom: 15px;
        }

        .contact-icon {
          margin-right: 10px;
          color: #3a7bd5;
          font-size: 1.2rem;
          margin-top: 3px;
        }

        .contact-info a {
          color: #b0bec5;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .contact-info a:hover {
          color: #ffffff;
        }

        .footer-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .copyright {
          color: #b0bec5;
          font-size: 0.9rem;
          margin-bottom: 20px;
          text-align: center;
        }

        .cta-button {
          display: inline-block;
          padding: 12px 30px;
          background: linear-gradient(to right, #3a7bd5, #00d2ff);
          color: white;
          border-radius: 30px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(58, 123, 213, 0.3);
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(58, 123, 213, 0.4);
        }

        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row;
          }

          .copyright {
            margin-bottom: 0;
          }
        }

        @media (max-width: 576px) {
          .footer-top {
            grid-template-columns: 1fr;
          }

          .footer-links {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;