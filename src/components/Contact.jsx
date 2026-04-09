import { useState } from "react";

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700&family=Barlow:wght@400;500&display=swap');

.contact-wrapper {
  min-height: 420px;
  background: #0a0e14;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  font-family: 'Barlow', sans-serif;
}

/* 🔥 LAYOUT 2 COLONNES */
.contact-container {
  width: 100%;
  max-width: 1100px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

/* 🔥 TEXTE A GAUCHE */
.contact-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
}

.info-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
}

.info-text {
  color: #90a4ae;
  font-size: 15px;
  line-height: 1.6;
}

.info-highlight {
  color: #00c853;
  font-weight: 600;
}

.info-box {
  background: #111820;
  border: 1px solid #1a3a2a;
  padding: 12px;
  border-radius: 4px;
}

/* 🔥 CARD FORM */
.contact-card {
  width: 100%;
  background: #111820;
  border: 0.5px solid #1a3a2a;
  border-radius: 4px;
  overflow: hidden;
}

.contact-header {
  background: linear-gradient(90deg, #0d2b1a 0%, #0d2240 100%);
  border-bottom: 2px solid #00c853;
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 12px;
}

.contact-icon {
  width: 36px; height: 36px;
  background: #00c853;
  border-radius: 2px;
  display: flex; align-items: center; justify-content: center;
}

.contact-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 22px; font-weight: 700;
  color: #fff; letter-spacing: 1px;
  text-transform: uppercase; margin: 0;
}

.contact-subtitle {
  font-size: 12px; color: #00c853;
  font-weight: 500; letter-spacing: 0.5px;
  text-transform: uppercase; margin: 2px 0 0;
}

.contact-body {
  padding: 1.5rem;
  display: flex; flex-direction: column; gap: 14px;
}

.field-label {
  display: block; font-size: 11px; font-weight: 600;
  color: #4a8a6a; letter-spacing: 1px;
  text-transform: uppercase; margin-bottom: 5px;
}

.contact-input, .contact-textarea {
  width: 100%; background: #0a0e14;
  border: 0.5px solid #1e3a50; border-radius: 2px;
  color: #e0e8f0;
  font-size: 14px; padding: 10px 12px;
  outline: none;
}

.contact-textarea { height: 100px; resize: none; }

.row-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

.contact-btn {
  width: 100%; background: #00c853; color: #0a0e14;
  border: none;
  font-family: 'Barlow Condensed', sans-serif;
  font-size: 16px; font-weight: 700;
  padding: 13px; cursor: pointer;
}

.contact-footer {
  padding: 0.75rem 1.5rem; background: #0d1520;
  border-top: 0.5px solid #1a3a2a;
  display: flex; align-items: center; gap: 6px;
}

.dot { width: 6px; height: 6px; border-radius: 50%; background: #00c853; }

.footer-text { font-size: 11px; color: #2e5a40; }

/* 🔥 RESPONSIVE MOBILE */
@media (max-width: 768px) {
  .contact-container {
    grid-template-columns: 1fr;
  }
}
`;

export default function Contact() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => {
    console.log("Formulaire envoyé :", form);
  };

  return (
    <>
      <style>{styles}</style>

      <div className="contact-wrapper">
        <div className="contact-container">

          {/* 🔥 TEXTE A GAUCHE */}
          <div className="contact-info">
            <h2 className="info-title">Contactez-nous</h2>

            <p className="info-text">
              Une question, un problème ou une suggestion ?
              Notre équipe est disponible <span className="info-highlight">24h/24</span> pour vous aider.
            </p>

            <div className="info-box">
              <p className="info-text">
                ⚡ Support rapide et professionnel<br />
                🔒 Données sécurisées<br />
                📞 Assistance personnalisée
              </p>
            </div>
          </div>

          {/* 🔥 FORMULAIRE */}
          <div className="contact-card">
            <div className="contact-header">
              <div className="contact-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#0a0e14">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z"/>
                </svg>
              </div>
              <div>
                <p className="contact-title">Nous contacter</p>
                <p className="contact-subtitle">Support 24h</p>
              </div>
            </div>

            <div className="contact-body">
              <div className="row-2col">
                <input className="contact-input" name="nom" placeholder="Nom" onChange={handleChange} />
                <input className="contact-input" name="prenom" placeholder="Prénom" onChange={handleChange} />
              </div>

              <input className="contact-input" name="email" placeholder="Email" onChange={handleChange} />

              <textarea className="contact-textarea" name="message" placeholder="Votre message..." onChange={handleChange} />

              <button className="contact-btn" onClick={handleSubmit}>
                Envoyer →
              </button>
            </div>

            <div className="contact-footer">
              <div className="dot" />
              <span className="footer-text">Réponse sous 24h</span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}