import { useState, useEffect, useRef } from "react";
import { BiChevronDown, BiMenu, BiX } from "react-icons/bi";
import { useNavigate, Link } from 'react-router-dom';
import './Header.css'; // Assuming you have a CSS file for styles

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const headerRef = useRef(null);
  const navRef = useRef(null);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        headerRef.current.classList.add('scrolled');
      } else {
        headerRef.current.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
        setDropdownOpen(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
    setDropdownOpen(null);
  };

  const navItems = [
    { id: 'home', label: 'Home', section: 'hero',route: '/Dashboard' },
    { id: 'about', label: 'About', section: 'about' },
    { id: 'offers', label: 'Offers', route: '/offers' },
    { id: 'swipe', label: 'Swipe', route: '/swipe' },
    { id: 'contact', label: 'Contact', section: 'contact' }
  ];

  const renderSubmenu = (items, level = 1) => {
    return (
      <ul className={`submenu level-${level}`}>
        {items.map((item) => (
          <li key={item.id}>
            {item.submenu ? (
              <>
                <button 
                  onClick={() => toggleDropdown(item.id)}
                  className="submenu-toggle"
                >
                  <span>{item.label}</span>
                  <BiChevronDown className={`icon ${dropdownOpen === item.id ? 'open' : ''}`} />
                </button>
                {dropdownOpen === item.id && renderSubmenu(item.submenu, level + 1)}
              </>
            ) : item.route ? (
              <Link 
                to={item.route}
                className="nav-link-button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDropdownOpen(null);
                }}
              >
                {item.label}
              </Link>
            ) : (
              <button 
                onClick={() => scrollToSection(item.section)} 
                className="nav-link-button"
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <header ref={headerRef} className="header">
      <div className="header-container container">
        {/* Logo - Using Link for proper navigation */}
        <Link to="/" className="logo">
          <span className="logo-text">MatchUp</span>
          <span className="logo-dot">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav ref={navRef} className={`navmenu ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="main-menu">
            {navItems.map((item) => (
              <li key={item.id}>
                {item.submenu ? (
                  <>
                    <button 
                      onClick={() => toggleDropdown(item.id)}
                      className="menu-toggle"
                    >
                      <span>{item.label}</span>
                      <BiChevronDown className={`icon ${dropdownOpen === item.id ? 'open' : ''}`} />
                    </button>
                    {dropdownOpen === item.id && renderSubmenu(item.submenu)}
                  </>
                ) : item.route ? (
                  <Link 
                    to={item.route}
                    className="nav-link-button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setDropdownOpen(null);
                    }}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button 
                    onClick={() => scrollToSection(item.section)}
                    className="nav-link-button"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Close Button */}
          <button 
            className="mobile-close-btn"
            onClick={() => setMobileMenuOpen(false)}
          >
            <BiX />
          </button>
        </nav>

        {/* CTA Button */}
        <div className="header-actions">
          <button 
            onClick={() => navigate('/register')} 
            className="btn-primary"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <BiX /> : <BiMenu />}
        </button>
      </div>
    </header>
  );
};





export default Header;