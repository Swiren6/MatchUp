import { useState, useEffect, useRef } from "react";
import { BiChevronDown, BiMenu, BiX } from "react-icons/bi";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const headerRef = useRef(null);
  const navRef = useRef(null);

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

  const navItems = [
    { id: "home", label: "Home", href: "#hero" },
    { id: "about", label: "About", href: "#about" },
    { id: "services", label: "Services", href: "#services" },
    { id: "features", label: "Features", href: "#features" },
    { id: "testimonials", label: "Testimonials", href: "#testimonials" },
    { id: "pricing", label: "Pricing", href: "#pricing" },
    { id: "contact", label: "Contact", href: "#contact" },
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
            ) : (
              <a href={item.href} onClick={() => setMobileMenuOpen(false)}>
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <header ref={headerRef} className="header">
      <div className="header-container container">
        {/* Logo */}
        <a href="/" className="logo">
          <span className="logo-text">MatchUp</span>
          <span className="logo-dot">.</span>
        </a>

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
                ) : (
                  <a 
                    href={item.href} 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setDropdownOpen(null);
                    }}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile Close Button */}
          <div className="header-actions">
  <a href="/register" className="btn-primary">  {/* Changed from #about to /register */}
    Get Started
  </a>
</div>

{/* Mobile Toggle Button */}
<button 
  className="mobile-toggle"
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
>
  {mobileMenuOpen ? <BiX /> : <BiMenu />}
</button>
        </nav>

        

        
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 999;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .header.scrolled {
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
          padding: 0 20px;
        }

        .logo {
          display: flex;
          align-items: center;
          font-size: 1.8rem;
          font-weight: 700;
          text-decoration: none;
          color: #2c3e50;
          z-index: 1001;
        }

        .logo-dot {
          color: #3a7bd5;
        }

        .navmenu {
          display: flex;
          flex: 1;
          justify-content: center;
        }

        .main-menu {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .main-menu > li {
          position: relative;
          margin: 0 15px;
        }

        .main-menu > li > a,
        .menu-toggle {
          display: flex;
          align-items: center;
          padding: 10px 15px;
          font-size: 1rem;
          font-weight: 500;
          color: #2c3e50;
          text-decoration: none;
          transition: all 0.3s ease;
          background: none;
          border: none;
          cursor: pointer;
        }

        .main-menu > li > a:hover,
        .menu-toggle:hover {
          color: #3a7bd5;
        }

        .main-menu > li > a.active {
          color: #3a7bd5;
          font-weight: 600;
        }

        .icon {
          margin-left: 5px;
          transition: transform 0.3s ease;
        }

        .icon.open {
          transform: rotate(180deg);
        }

        .submenu {
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 220px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          list-style: none;
          padding: 10px 0;
          margin: 0;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.3s ease;
          z-index: 1000;
        }

        .submenu.level-2 {
          left: 100%;
          top: 0;
        }

        .submenu-toggle {
          width: 100%;
          text-align: left;
          padding: 8px 20px;
          background: none;
          border: none;
          color: #475569;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .submenu li a,
        .submenu-toggle {
          padding: 8px 20px;
          font-size: 0.95rem;
          color: #475569;
          text-decoration: none;
          transition: all 0.2s ease;
          display: block;
        }

        .submenu li a:hover,
        .submenu-toggle:hover {
          color: #3a7bd5;
          background: #f8fafc;
        }

        .main-menu > li:hover .submenu,
        .submenu li:hover .submenu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .header-actions {
          margin-left: 20px;
        }

        .btn-primary {
          display: inline-block;
          padding: 10px 20px;
          background: linear-gradient(to right, #3a7bd5, #00d2ff);
          color: white;
          border-radius: 8px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(58, 123, 213, 0.3);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(58, 123, 213, 0.4);
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          font-size: 1.8rem;
          color: #2c3e50;
          cursor: pointer;
          z-index: 1001;
        }

        .mobile-close-btn {
          display: none;
          position: absolute;
          top: 25px;
          right: 25px;
          background: none;
          border: none;
          font-size: 1.8rem;
          color: #2c3e50;
          cursor: pointer;
        }

        @media (max-width: 1024px) {
          .navmenu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            max-width: 400px;
            height: 100vh;
            background: white;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding: 80px 40px;
            box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
            transition: right 0.3s ease;
            z-index: 1000;
          }

          .navmenu.open {
            right: 0;
          }

          .main-menu {
            flex-direction: column;
            width: 100%;
          }

          .main-menu > li {
            margin: 10px 0;
          }

          .main-menu > li > a,
          .menu-toggle {
            padding: 12px 0;
            font-size: 1.1rem;
          }

          .submenu {
            position: static;
            box-shadow: none;
            opacity: 1;
            visibility: visible;
            transform: none;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            padding: 0;
          }

          .submenu.level-2 {
            left: 0;
            padding-left: 20px;
          }

          .submenu-toggle {
            padding: 8px 0;
          }

          .submenu li a {
            padding: 8px 0;
          }

          .main-menu > li:hover .submenu,
          .submenu li:hover .submenu {
            transform: none;
          }

          .mobile-toggle {
            display: block;
          }

          .mobile-close-btn {
            display: block;
          }

          .header-actions {
            margin-left: auto;
            margin-right: 15px;
          }
        }

        @media (max-width: 576px) {
          .header-container {
            height: 70px;
          }

          .logo {
            font-size: 1.5rem;
          }

          .btn-primary {
            padding: 8px 15px;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;