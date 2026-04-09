import { useState } from "react";
import { leagues } from "../data/leagues";

export default function LeagueList() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.icon}>🏆</span>
          <h2 style={styles.title}>Championnats populaires</h2>
        </div>

        <div style={styles.grid}>
          {leagues.map((l, i) => (
            <LeagueCard key={i} league={l} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LeagueCard({ league }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ ...styles.card, ...(hovered ? styles.cardHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={styles.logoWrap}>
        <img src={league.logo} alt={league.name} style={styles.logo} />
      </div>
      <p style={{ ...styles.name, ...(hovered ? styles.nameHover : {}) }}>
        {league.name}
      </p>
    </div>
  );
}

const styles = {
  // ✅ centre toute la section
  wrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: 20,
  },

  container: {
    background: "#0d1525",
    borderRadius: 10,
    border: "1px solid #1a2a40",
    padding: "20px 16px",
    width: "100%",
    maxWidth: 1150, // ✅ limite largeur et centre visuellement
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
    paddingBottom: 14,
    borderBottom: "1px solid #1a2a40",
  },

  icon: { fontSize: 18 },

  title: {
    fontSize: 14,
    fontWeight: 700,
    color: "#90a4ae",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    margin: 0,
    fontFamily: "'Segoe UI', sans-serif",
  },

  // ✅ grille centrée
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
    gap: 12,
    justifyItems: "center", // centre les cartes
  },

  card: {
    background: "#0a0f1a",
    border: "1px solid #1a2a40",
    borderRadius: 8,
    padding: "14px 10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    transition: "border-color .2s, background .2s, transform .15s",
    fontFamily: "'Segoe UI', sans-serif",
    width: 150, // ✅ taille fixe pour bon alignement
  },

  cardHover: {
    borderColor: "#00c853",
    background: "#0f1e30",
    transform: "translateY(-2px)",
  },

  logoWrap: {
    width: 100,
    height: 100,
    borderRadius: "50%",
    background: "#e5e7ec",
    border: "2px solid #1a2a40",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  logo: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },

  name: {
    fontSize: 14,
    fontWeight: 700,
    color: "#cfd8dc",
    textAlign: "center",
    lineHeight: 1.4,
    margin: 0,
    transition: "color .2s",
  },

  nameHover: {
    color: "#00e676",
  },
};