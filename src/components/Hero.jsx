const styles = `
  .hero-wrap {
    background: #0a0f1e;
    min-height: 480px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 24px;
    text-align: center;
    position: relative;
    overflow: hidden;
    font-family: 'Segoe UI', sans-serif;
  }

  /* 🔥 IMAGE BACKGROUND FLOUE */
  .hero-wrap::before {
    content: "";
    position: absolute;
    inset: 0;
    background: url('/images/background.png') center/cover no-repeat;
    filter: blur(8px);
    transform: scale(1.1); /* évite les bords flous */
    opacity: 0.75;
    z-index: 0;
  }

  /* 🔥 OVERLAY SOMBRE POUR LIRE LE TEXTE */
  .hero-wrap::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(49, 52, 63, 0.75);
    z-index: 0;
  }

  /* IMPORTANT : tout le contenu au-dessus */
  .hero-wrap > * {
    position: relative;
    z-index: 1;
  }

  

  .hero-accent {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 600px;
    height: 3px;
    background: #00c853;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #00361a;
    border: 1px solid #00c853;
    border-radius: 20px;
    padding: 5px 16px;
    font-size: 12px;
    color: #00c853;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 28px;
  }

  .hero-badge .pulse {
    width: 7px;
    height: 7px;
    background: #00c853;
    border-radius: 50%;
  }

  .hero-title {
    font-size: 52px;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.1;
    margin-bottom: 16px;
    letter-spacing: -1px;
  }

  .hero-title .green {
    color: #00c853;
  }

  .hero-title .blue {
    color: #1e88e5;
  }

  .hero-sub {
    font-size: 17px;
    color: #7a90ab;
    max-width: 460px;
    line-height: 1.6;
    margin-bottom: 36px;
  }

  .hero-sub strong {
    color: #a8bdd4;
    font-weight: 500;
  }

  .hero-actions {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .btn-primary {
    background: #00c853;
    color: #0a0f1e;
    border: none;
    font-size: 14px;
    font-weight: 700;
    padding: 13px 32px;
    border-radius: 8px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.2s;
  }

  .btn-primary:hover {
    background: #00e676;
    transform: translateY(-1px);
  }

  .btn-secondary {
    background: transparent;
    color: #9db0c8;
    border: 1px solid #2a3f5c;
    font-size: 14px;
    font-weight: 600;
    padding: 13px 28px;
    border-radius: 8px;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.2s;
  }

  .btn-secondary:hover {
    border-color: #00c853;
    color: #00c853;
  }

  .hero-stats {
    display: flex;
    gap: 32px;
    margin-top: 52px;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .stat {
    text-align: center;
  }

  .stat-num {
    font-size: 24px;
    font-weight: 800;
    color: #ffffff;
  }

  .stat-num span {
    color: #00c853;
  }

  .stat-label {
    font-size: 11px;
    color: #4f6880;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 2px;
  }

  .stat-divider {
    width: 1px;
    height: 36px;
    background: #162035;
  }

  .sport-icons {
    display: flex;
    gap: 10px;
    margin-bottom: 32px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .sport-tag {
    display: flex;
    align-items: center;
    gap: 6px;
    background: #111d30;
    border: 1px solid #1e3a5a;
    border-radius: 8px;
    padding: 6px 14px;
    font-size: 12px;
    color: #7a90ab;
  }

  @media (max-width: 600px) {
    .hero-title {
      font-size: 36px;
    }

    .hero-sub {
      font-size: 15px;
    }

    .hero-accent {
      width: 100%;
    }

    .stat-divider {
      display: none;
    }
  }
`;

const SportIcon = ({ sport }) => {
  const icons = {
    Football: <span>⚽</span>,
    Basketball: <span>🏀</span>,
  };
  return icons[sport] || null;
};

export default function Hero({ onStart, onNav }) {
  const stats = [
    { num: "12", suffix: "K+", label: "Utilisateurs" },
    { num: "98", suffix: "%",  label: "Satisfaction" },
    { num: "500", suffix: "+", label: "Matchs / semaine" },
  ];

  return (
    <>
      <style>{styles}</style>

      <div className="hero-wrap">
        <div className="hero-grid" />
        <div className="hero-accent" />

        <div className="hero-badge">
          <div className="pulse" />
          Simulation 100% gratuite
        </div>

        <div className="sport-icons">
          {["Football", "Basketball"].map((s) => (
            <div className="sport-tag" key={s}>
              <SportIcon sport={s} />
              {s}
            </div>
          ))}
        </div>

        <h1 className="hero-title">
          Parie.<br />
          <span className="green">Analyse.</span>{" "}
          <span className="blue">Gagne.</span>
        </h1>

        <div className="hero-actions">
          <button className="btn-primary" onClick={onStart}>
            Commencer à parier
          </button>
          <button className="btn-secondary" onClick={() => onNav?.("matches")}>
            Voir les matchs
          </button>
        </div>

        <div className="hero-stats">
          {stats.map((s, i) => (
            <>
              {i > 0 && <div className="stat-divider" key={i} />}
              <div className="stat" key={s.label}>
                <div className="stat-num">
                  {s.num}<span>{s.suffix}</span>
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}