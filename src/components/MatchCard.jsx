import { useState } from "react";

export default function MatchCard({ match, onBet }) {
  const [selected, setSelected] = useState(null);

  const handleBet = (team, odds) => {
    setSelected(team);
    onBet(match, team, odds);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>

        {/* Ligue */}
        <p style={styles.league}>{match.league}</p>

        {/* Équipes */}
        <div style={styles.teams}>
          <div style={styles.team}>
            <div style={styles.logoWrap}>
              <img src={match.teamA.logo} alt={match.teamA.name} style={styles.logo} />
            </div>
            <p style={styles.teamName}>{match.teamA.name}</p>
          </div>

          <span style={styles.vs}>VS</span>

          <div style={styles.team}>
            <div style={styles.logoWrap}>
              <img src={match.teamB.logo} alt={match.teamB.name} style={styles.logo} />
            </div>
            <p style={styles.teamName}>{match.teamB.name}</p>
          </div>
        </div>

        {/* Cotes */}
        <div style={styles.odds}>
          <OddButton
            label={match.teamA.name}
            odds={match.oddsA}
            active={selected === match.teamA.name}
            onClick={() => handleBet(match.teamA.name, match.oddsA)}
          />

          {/* ✅ afficher NUL seulement si existe */}
          {match.oddsN && (
            <OddButton
              label="Nul"
              odds={match.oddsN}
              active={selected === "Nul"}
              onClick={() => handleBet("Nul", match.oddsN)}
            />
          )}

          <OddButton
            label={match.teamB.name}
            odds={match.oddsB}
            active={selected === match.teamB.name}
            onClick={() => handleBet(match.teamB.name, match.oddsB)}
          />
        </div>

      </div>
    </div>
  );
}

function OddButton({ label, odds, active, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.oddBtn,
        ...(hovered ? styles.oddBtnHover : {}),
        ...(active ? styles.oddBtnActive : {}),
      }}
    >
      <span style={styles.oddLabel}>{label}</span>
      <span style={{ ...styles.oddValue, ...(active ? styles.oddValueActive : {}) }}>
        {odds ?? "—"}
      </span>
    </button>
  );
}

const styles = {
  // ✅ centre la carte
  wrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },

  card: {
    background: "#0d1525",
    border: "1px solid #1a2a40",
    borderRadius: 10,
    padding: "16px",
    fontFamily: "'Segoe UI', sans-serif",
    display: "flex",
    flexDirection: "column",
    gap: 14,
    width: "100%",
    maxWidth: 400, // ✅ largeur propre
  },

  league: {
    fontSize: 11,
    fontWeight: 700,
    color: "#00c853",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    margin: 0,
    textAlign: "center",
  },

  teams: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },

  team: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },

  logoWrap: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "#0a0f1a",
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

  teamName: {
    fontSize: 12,
    fontWeight: 600,
    color: "#cfd8dc",
    textAlign: "center",
    margin: 0,
  },

  vs: {
    fontSize: 12,
    fontWeight: 700,
    color: "#37474f",
  },

  odds: {
    display: "flex",
    gap: 8,
    borderTop: "1px solid #1a2a40",
    paddingTop: 14,
  },

  oddBtn: {
    flex: 1,
    background: "#0a0f1a",
    border: "1px solid #1a2a40",
    borderRadius: 6,
    padding: "8px 4px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    cursor: "pointer",
    transition: "background .2s, border-color .2s",
  },

  oddBtnHover: {
    background: "#0f1e30",
    borderColor: "#1565c0",
  },

  oddBtnActive: {
    background: "#0f2540",
    borderColor: "#00c853",
  },

  oddLabel: {
    fontSize: 10,
    color: "#78909c",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: 70,
  },

  oddValue: {
    fontSize: 15,
    fontWeight: 700,
    color: "#42a5f5",
  },

  oddValueActive: {
    color: "#00e676",
  },
};