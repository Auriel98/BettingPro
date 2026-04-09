export default function Footer() {
  return (
    <>
      <style>{styles}</style>

      <footer className="footer">
        <div className="footer-container">

          {/* COLONNE 1 */}
          <div className="footer-col">
            <h2 className="logo">
              <FootballIcon /> BettingPro
            </h2>
            <p className="desc">
              Plateforme de simulation de paris sportifs.
              Aucun argent réel n'est impliqué. Jouez pour apprendre et vous divertir.
            </p>
          </div>

          {/* COLONNE 2 */}
          <div className="footer-col">
            <h3 className="title">Navigation</h3>
            <ul>
              <li>Accueil</li>
              <li>Matchs</li>
              <li>Championnats</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* COLONNE 3 */}
          <div className="footer-col">
            <h3 className="title">Contact</h3>
            <ul>
              <li><MailIcon /> support@bettingpro.com</li>
              <li><LocationIcon /> Libreville, Gabon</li>
              <li><PhoneIcon /> +241 00 00 00 00</li>
            </ul>
          </div>

          {/* COLONNE 4 */}
          <div className="footer-col">
            <h3 className="title">Suivez-nous</h3>
            <div className="socials">
              <GlobeIcon />
              <FacebookIcon />
              <TwitterIcon />
              <InstagramIcon />
            </div>
          </div>

        </div>

        <div className="footer-bottom">
          <p>Projet de simulation (aucun argent réel)</p>
          <p>© 2026 BettingPro. Tous droits réservés.</p>
        </div>
      </footer>
    </>
  );
}

/* 🔥 SVG ICONS */
const FootballIcon = () => (
  <svg width="20" height="20" fill="#00c853" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="#00c853" strokeWidth="2" fill="none"/>
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" fill="#90a4ae" viewBox="0 0 24 24">
    <path d="M20 4H4v16h16V4zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="14" height="14" fill="#90a4ae" viewBox="0 0 24 24">
    <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg width="14" height="14" fill="#90a4ae" viewBox="0 0 24 24">
    <path d="M6.6 10.8c1.5 3 3.6 5.1 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.3 1 .3 2 .5 3 .5.7 0 1.2.5 1.2 1.2V20c0 .7-.5 1.2-1.2 1.2C10.1 21.2 2.8 13.9 2.8 4.8 2.8 4.1 3.3 3.6 4 3.6h3.4c.7 0 1.2.5 1.2 1.2 0 1 .2 2 .5 3 .1.4 0 .9-.3 1.2l-2.2 2.2z"/>
  </svg>
);

const GlobeIcon = () => (
  <svg width="20" height="20" fill="#90a4ae" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" stroke="#90a4ae" strokeWidth="2" fill="none"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" fill="#90a4ae" viewBox="0 0 24 24">
    <path d="M13 3h4v4h-3v3h3v4h-3v7h-4v-7H7v-4h3V7c0-2.2 1.8-4 4-4z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" fill="#90a4ae" viewBox="0 0 24 24">
    <path d="M22 5.8c-.7.3-1.5.5-2.3.6.8-.5 1.4-1.3 1.7-2.2-.8.5-1.7.8-2.6 1C18 4.4 17 4 16 4c-2.1 0-3.7 2-3.2 4C9.7 7.9 7.1 6.5 5.3 4.4c-.7 1.2-.3 2.7.9 3.4-.6 0-1.2-.2-1.7-.5 0 1.8 1.3 3.3 3.1 3.7-.5.1-1 .2-1.5.1.4 1.4 1.8 2.4 3.3 2.4-1.3 1-2.9 1.6-4.6 1.6H3c1.6 1 3.5 1.6 5.5 1.6 6.6 0 10.3-5.5 10.1-10.4.7-.5 1.3-1.2 1.8-2z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="20" height="20" fill="#90a4ae" viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" stroke="#90a4ae" strokeWidth="2" fill="none"/>
    <circle cx="12" cy="12" r="4"/>
  </svg>
);

/* 🔥 STYLE (inchangé + petits ajustements icônes) */
const styles = `
.footer {
  background: #0a0e14;
  border-top: 1px solid #1a2a40;
  color: #90a4ae;
  font-family: 'Segoe UI', sans-serif;
  margin-top: 40px;
}

.footer-container {
  max-width: 1100px;
  margin: auto;
  padding: 40px 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.footer-col {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #00c853;
  margin: 0;
}

.title {
  font-size: 14px;
  font-weight: 700;
  color: #cfd8dc;
}

.footer-col ul {
  list-style: none;
  padding: 0;
}

.footer-col li {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  margin-bottom: 6px;
}

.socials {
  display: flex;
  gap: 12px;
}

.socials svg {
  cursor: pointer;
  transition: transform 0.2s;
}

.socials svg:hover {
  transform: scale(1.2);
}

.footer-bottom {
  border-top: 1px solid #1a2a40;
  text-align: center;
  padding: 16px;
  font-size: 12px;
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 500px) {
  .footer-container {
    grid-template-columns: 1fr;
    text-align: center;
  }
}
`;