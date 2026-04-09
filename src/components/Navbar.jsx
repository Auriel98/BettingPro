import { useState } from "react";

const styles = `
  * { box-sizing: border-box; }

  .navbar {
    background: #0a0f1e;
    border-bottom: 2px solid #00c853;
    padding: 0 24px;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-family: 'Segoe UI', sans-serif;
    position: relative;
    z-index: 1000;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .brand-icon {
    width: 28px;
    height: 28px;
    background: #00c853;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .brand h2 {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 1px;
    color: #ffffff;
    text-transform: uppercase;
    margin: 0;
  }

  .brand h2 span {
    color: #00c853;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .nav-links button {
    background: transparent;
    border: none;
    color: #9db0c8;
    font-size: 13px;
    font-weight: 500;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all 0.2s;
    white-space: nowrap;
  }

  .nav-links button:hover {
    background: #162035;
    color: #00c853;
  }

  .nav-links button.active {
    background: #00c853;
    color: #0a0f1e;
    font-weight: 700;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
  }

  .user-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #162035;
    border: 1px solid #1e3a5a;
    border-radius: 20px;
    padding: 5px 12px;
  }

  .user-badge .icon {
    width: 18px;
    height: 18px;
    background: #1565c0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: #fff;
    font-weight: 600;
    flex-shrink: 0;
  }

  .user-badge .name {
    font-size: 13px;
    color: #cdd8e3;
    font-weight: 500;
  }

  .balance-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #00361a;
    border: 1px solid #00c853;
    border-radius: 20px;
    padding: 5px 14px;
  }

  .balance-badge .dot {
    width: 6px;
    height: 6px;
    background: #00c853;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .balance-badge .amount {
    font-size: 13px;
    color: #00c853;
    font-weight: 700;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  .deposit-btn {
    background: #1565c0;
    color: #fff;
    border: none;
    font-size: 12px;
    font-weight: 600;
    padding: 7px 14px;
    border-radius: 6px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: background 0.2s;
    white-space: nowrap;
  }

  .deposit-btn:hover {
    background: #1976d2;
  }

  /* BURGER */
  .burger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 6px;
    border-radius: 6px;
    transition: background 0.2s;
  }

  .burger:hover { background: #162035; }

  .burger span {
    display: block;
    width: 22px;
    height: 2px;
    background: #00c853;
    border-radius: 2px;
    transition: all 0.3s;
  }

  .burger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .burger.open span:nth-child(2) { opacity: 0; }
  .burger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* MOBILE MENU */
  .mobile-menu {
    display: none;
    position: absolute;
    top: 58px;
    left: 0;
    right: 0;
    background: #0a0f1e;
    border-bottom: 2px solid #00c853;
    border-top: 1px solid #162035;
    padding: 12px 16px 16px;
    flex-direction: column;
    gap: 6px;
    z-index: 999;
    font-family: 'Segoe UI', sans-serif;
  }

  .mobile-menu.open { display: flex; }

  .mobile-menu .nav-btn {
    background: transparent;
    border: none;
    color: #9db0c8;
    font-size: 14px;
    font-weight: 500;
    padding: 10px 14px;
    border-radius: 6px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    text-align: left;
    transition: all 0.2s;
    width: 100%;
  }

  .mobile-menu .nav-btn:hover { background: #162035; color: #00c853; }
  .mobile-menu .nav-btn.active { background: #00c853; color: #0a0f1e; font-weight: 700; }

  .mobile-divider {
    height: 1px;
    background: #162035;
    margin: 4px 0;
  }

  .mobile-user {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .mobile-user .user-badge { flex: 1; min-width: 0; }
  .mobile-user .user-badge .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mobile-deposit {
    background: #1565c0;
    color: #fff;
    border: none;
    font-size: 13px;
    font-weight: 600;
    padding: 10px 16px;
    border-radius: 6px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: background 0.2s;
    width: 100%;
    margin-top: 4px;
  }

  .mobile-deposit:hover { background: #1976d2; }

  /* BREAKPOINTS */
  @media (max-width: 768px) {
    .nav-links,
    .nav-right { display: none; }
    .burger { display: flex; }
  }

  @media (max-width: 400px) {
    .navbar { padding: 0 14px; }
    .brand h2 { font-size: 15px; }
  }
`;

export default function Navbar({ onNav, user, balance, activeTab = "home" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { key: "home",    label: "Home" },
    { key: "matches", label: "Matches" },
    { key: "wallet",  label: "Solde" },
    { key: "history", label: "Historique" },  // ← AJOUTER CETTE LIGNE
    { key: "contact", label: "Contact" },
  ];

  const initial = user ? user.charAt(0).toUpperCase() : "U";

  const handleNav = (key) => {
    onNav(key);
    setMenuOpen(false);
  };

  return (
    <>
      <style>{styles}</style>

      <nav className="navbar">

        {/* Logo */}
        <div className="brand">
          <div className="brand-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="#0a0f1e">
              <path d="M8 1L10 6H15L11 9.5L12.5 15L8 12L3.5 15L5 9.5L1 6H6Z" />
            </svg>
          </div>
          <h2>Betting<span>Pro</span></h2>
        </div>

        {/* Desktop — liens */}
        <div className="nav-links">
          {navItems.map(({ key, label }) => (
            <button
              key={key}
              className={activeTab === key ? "active" : ""}
              onClick={() => handleNav(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Desktop — user + solde */}
        <div className="nav-right">
          <div className="user-badge">
            <div className="icon">{initial}</div>
            <span className="name">{user}</span>
          </div>
          <div className="balance-badge">
            <div className="dot" />
            <span className="amount">{balance}</span>
          </div>
          <button className="deposit-btn" onClick={() => handleNav("wallet")}>
            + Dépôt
          </button>
        </div>

        {/* Burger (mobile only) */}
        <button
          className={`burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Ouvrir le menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Menu mobile déroulant */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>

        {navItems.map(({ key, label }) => (
          <button
            key={key}
            className={`nav-btn ${activeTab === key ? "active" : ""}`}
            onClick={() => handleNav(key)}
          >
            {label}
          </button>
        ))}

        <div className="mobile-divider" />

        <div className="mobile-user">
          <div className="user-badge">
            <div className="icon">{initial}</div>
            <span className="name">{user}</span>
          </div>
          <div className="balance-badge">
            <div className="dot" />
            <span className="amount">{balance}</span>
          </div>
        </div>

        <button className="mobile-deposit" onClick={() => handleNav("wallet")}>
          + Dépôt
        </button>
      </div>
    </>
  );
}