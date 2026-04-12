import { useState } from "react";

const isFootball = (match) => ["football", "Football"].includes(match.sport);
const isBasket = (match) => ["basket", "Basketball"].includes(match.sport);

export default function MatchCard({ match, onBet }) {
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("1x2");

  const handleBet = (type, label, odds) => {
    setSelected({ type, label });
    onBet(match, label, odds);
  };

  const isActive = (type, label) =>
    selected?.type === type && selected?.label === label;

  const tabs = isFootball(match)
    ? ["1x2", "Double Chance", "Buts", "BTTS", "Mi-Temps", "Score Exact", "1er But", "HT/FT", "Clean Sheet", "Handicap"]
    : isBasket(match)
    ? ["1x2", "Total Points", "Mi-Temps", "Handicap", "Race To"]
    : ["1x2"];

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

        {/* Onglets */}
        <div style={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                ...styles.tab,
                ...(activeTab === tab ? styles.tabActive : {}),
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Contenu selon onglet */}
        <div style={styles.odds}>

          {/* === 1X2 === */}
          {activeTab === "1x2" && (
            <>
              <OddButton
                label={match.teamA.name}
                sublabel="1"
                odds={match.oddsA}
                active={isActive("1x2", "1")}
                onClick={() => handleBet("1x2", "1", match.oddsA)}
              />
              {match.oddsN && (
                <OddButton
                  label="Nul"
                  sublabel="X"
                  odds={match.oddsN}
                  active={isActive("1x2", "X")}
                  onClick={() => handleBet("1x2", "X", match.oddsN)}
                />
              )}
              <OddButton
                label={match.teamB.name}
                sublabel="2"
                odds={match.oddsB}
                active={isActive("1x2", "2")}
                onClick={() => handleBet("1x2", "2", match.oddsB)}
              />
            </>
          )}

          {/* === DOUBLE CHANCE === */}
          {activeTab === "Double Chance" && (
            <>
              <OddButton
                label={`${match.teamA.name} ou Nul`}
                sublabel="1X"
                odds={match.oddsAorN}
                active={isActive("dc", "1X")}
                onClick={() => handleBet("dc", "1X", match.oddsAorN)}
              />
              <OddButton
                label={`${match.teamA.name} ou ${match.teamB.name}`}
                sublabel="12"
                odds={match.oddsAorB}
                active={isActive("dc", "12")}
                onClick={() => handleBet("dc", "12", match.oddsAorB)}
              />
              <OddButton
                label={`Nul ou ${match.teamB.name}`}
                sublabel="X2"
                odds={match.oddsNorB}
                active={isActive("dc", "X2")}
                onClick={() => handleBet("dc", "X2", match.oddsNorB)}
              />
            </>
          )}

          {/* === BUTS (match complet) === */}
          {activeTab === "Buts" && (
            <div style={styles.goalsGrid}>
              {[
                { label: "0.5", over: match.over05, under: match.under05 },
                { label: "1.5", over: match.over15, under: match.under15 },
                { label: "2.5", over: match.over25, under: match.under25 },
                { label: "3.5", over: match.over35, under: match.under35 },
                { label: "4.5", over: match.over45, under: match.under45 },
              ].map(({ label, over, under }) => (
                <div key={label} style={styles.goalRow}>
                  <span style={styles.goalLabel}>{label}</span>
                  <OddButton
                    label="Plus de"
                    sublabel={`+${label}`}
                    odds={over}
                    active={isActive("buts", `O${label}`)}
                    onClick={() => handleBet("buts", `O${label}`, over)}
                    compact
                  />
                  <OddButton
                    label="Moins de"
                    sublabel={`-${label}`}
                    odds={under}
                    active={isActive("buts", `U${label}`)}
                    onClick={() => handleBet("buts", `U${label}`, under)}
                    compact
                  />
                </div>
              ))}
            </div>
          )}

          {/* === BTTS === */}
          {activeTab === "BTTS" && (
            <>
              <OddButton
                label="Les deux marquent"
                sublabel="Oui"
                odds={match.btsYes}
                active={isActive("btts", "bts_oui")}
                onClick={() => handleBet("btts", "bts_oui", match.btsYes)}
              />
              <OddButton
                label="Les deux marquent"
                sublabel="Non"
                odds={match.btsNo}
                active={isActive("btts", "bts_non")}
                onClick={() => handleBet("btts", "bts_non", match.btsNo)}
              />
            </>
          )}

          {/* === MI-TEMPS (Football) === */}
          {activeTab === "Mi-Temps" && isFootball(match) && (
            <div style={styles.goalsGrid}>
              <SectionTitle>Buts à la mi-temps</SectionTitle>
              {[
                { label: "0.5", over: match.ht_over05, under: match.ht_under05 },
                { label: "1.5", over: match.ht_over15, under: match.ht_under15 },
              ].map(({ label, over, under }) => (
                <div key={label} style={styles.goalRow}>
                  <span style={styles.goalLabel}>{label}</span>
                  <OddButton
                    label="Plus de"
                    sublabel={`+${label}`}
                    odds={over}
                    active={isActive("ht_buts", `HTO${label}`)}
                    onClick={() => handleBet("ht_buts", `HTO${label}`, over)}
                    compact
                  />
                  <OddButton
                    label="Moins de"
                    sublabel={`-${label}`}
                    odds={under}
                    active={isActive("ht_buts", `HTU${label}`)}
                    onClick={() => handleBet("ht_buts", `HTU${label}`, under)}
                    compact
                  />
                </div>
              ))}

              {match.ht_exact && (
                <>
                  <SectionTitle style={{ marginTop: 10 }}>Score exact mi-temps</SectionTitle>
                  <div style={styles.scoreGrid}>
                    {Object.entries(match.ht_exact).map(([score, odds]) => (
                      <OddButton
                        key={score}
                        label={score === "autre" ? "Autre" : score}
                        sublabel="MT"
                        odds={odds}
                        active={isActive("ht_exact", score)}
                        onClick={() => handleBet("ht_exact", score, odds)}
                        compact
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* === MI-TEMPS (Basket) === */}
          {activeTab === "Mi-Temps" && isBasket(match) && (
            <div style={styles.goalsGrid}>
              <SectionTitle>Points à la mi-temps</SectionTitle>
              {[
                { label: "102.5", over: match.ht_over1025, under: match.ht_under1025 },
                { label: "107.5", over: match.ht_over1075, under: match.ht_under1075 },
              ].map(({ label, over, under }) => (
                <div key={label} style={styles.goalRow}>
                  <span style={styles.goalLabel}>{label}</span>
                  <OddButton
                    label="Plus de"
                    sublabel={`+${label}`}
                    odds={over}
                    active={isActive("ht_pts", `HTO${label}`)}
                    onClick={() => handleBet("ht_pts", `HTO${label}`, over)}
                    compact
                  />
                  <OddButton
                    label="Moins de"
                    sublabel={`-${label}`}
                    odds={under}
                    active={isActive("ht_pts", `HTU${label}`)}
                    onClick={() => handleBet("ht_pts", `HTU${label}`, under)}
                    compact
                  />
                </div>
              ))}
            </div>
          )}

          {/* === SCORE EXACT === */}
          {activeTab === "Score Exact" && match.exact_score && (
            <div style={{ width: "100%" }}>
              <SectionTitle>Score exact (match complet)</SectionTitle>
              <div style={styles.scoreGrid}>
                {Object.entries(match.exact_score).map(([score, odds]) => (
                  <OddButton
                    key={score}
                    label={score === "autre" ? "Autre" : score}
                    sublabel="Score"
                    odds={odds}
                    active={isActive("exact_score", score)}
                    onClick={() => handleBet("exact_score", score, odds)}
                    compact
                  />
                ))}
              </div>
            </div>
          )}

          {/* === 1ER BUT === */}
          {activeTab === "1er But" && match.first_goal && (
            <>
              <OddButton
                label={match.teamA.name}
                sublabel="1er"
                odds={match.first_goal.teamA}
                active={isActive("first_goal", "teamA")}
                onClick={() => handleBet("first_goal", "teamA", match.first_goal.teamA)}
              />
              <OddButton
                label={match.teamB.name}
                sublabel="1er"
                odds={match.first_goal.teamB}
                active={isActive("first_goal", "teamB")}
                onClick={() => handleBet("first_goal", "teamB", match.first_goal.teamB)}
              />
              <OddButton
                label="Aucun but"
                sublabel="0-0"
                odds={match.first_goal.noGoal}
                active={isActive("first_goal", "noGoal")}
                onClick={() => handleBet("first_goal", "noGoal", match.first_goal.noGoal)}
              />
            </>
          )}

          {/* === HT/FT (Mi-temps / Fin de match) === */}
          {activeTab === "HT/FT" && match.ht_ft && (
            <div style={{ width: "100%" }}>
              <SectionTitle>Mi-temps / Fin de match</SectionTitle>
              <div style={styles.htftGrid}>
                {Object.entries(match.ht_ft).map(([combo, odds]) => {
                  const [htPart, ftPart] = combo.split("/");
                  const htLabel = htPart === "1" ? match.teamA.name.split(" ")[0] : htPart === "2" ? match.teamB.name.split(" ")[0] : "Nul";
                  const ftLabel = ftPart === "1" ? match.teamA.name.split(" ")[0] : ftPart === "2" ? match.teamB.name.split(" ")[0] : "Nul";
                  return (
                    <OddButton
                      key={combo}
                      label={`${htLabel} / ${ftLabel}`}
                      sublabel={combo}
                      odds={odds}
                      active={isActive("ht_ft", combo)}
                      onClick={() => handleBet("ht_ft", combo, odds)}
                      compact
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* === CLEAN SHEET === */}
          {activeTab === "Clean Sheet" && match.cleanSheet && (
            <>
              <OddButton
                label={`${match.teamA.name} — 0 encaissé`}
                sublabel="CS1"
                odds={match.cleanSheet.teamA}
                active={isActive("cleanSheet", "teamA")}
                onClick={() => handleBet("cleanSheet", "teamA", match.cleanSheet.teamA)}
              />
              <OddButton
                label={`${match.teamB.name} — 0 encaissé`}
                sublabel="CS2"
                odds={match.cleanSheet.teamB}
                active={isActive("cleanSheet", "teamB")}
                onClick={() => handleBet("cleanSheet", "teamB", match.cleanSheet.teamB)}
              />
            </>
          )}

          {/* === HANDICAP === */}
          {activeTab === "Handicap" && match.handicap && (
            <div style={{ width: "100%" }}>
              <SectionTitle>Handicap asiatique</SectionTitle>
              <div style={styles.scoreGrid}>
                {Object.entries(match.handicap).map(([label, odds]) => (
                  <OddButton
                    key={label}
                    label={label}
                    sublabel="HCP"
                    odds={odds}
                    active={isActive("handicap", label)}
                    onClick={() => handleBet("handicap", label, odds)}
                    compact
                  />
                ))}
              </div>
            </div>
          )}

          {/* === TOTAL POINTS (Basket) === */}
          {activeTab === "Total Points" && isBasket(match) && (
            <div style={styles.goalsGrid}>
              {[
                { label: "205.5", over: match.over2055, under: match.under2055 },
                { label: "215.5", over: match.over2155, under: match.under2155 },
                { label: "225.5", over: match.over2255, under: match.under2255 },
              ].map(({ label, over, under }) => (
                <div key={label} style={styles.goalRow}>
                  <span style={styles.goalLabel}>{label}</span>
                  <OddButton
                    label="Plus de"
                    sublabel={`+${label}`}
                    odds={over}
                    active={isActive("pts", `O${label}`)}
                    onClick={() => handleBet("pts", `O${label}`, over)}
                    compact
                  />
                  <OddButton
                    label="Moins de"
                    sublabel={`-${label}`}
                    odds={under}
                    active={isActive("pts", `U${label}`)}
                    onClick={() => handleBet("pts", `U${label}`, under)}
                    compact
                  />
                </div>
              ))}
            </div>
          )}

          {/* === RACE TO (Basket) === */}
          {activeTab === "Race To" && isBasket(match) && match.raceTo && (
            <div style={{ width: "100%" }}>
              <SectionTitle>Premier à atteindre</SectionTitle>
              <div style={styles.scoreGrid}>
                {[
                  { label: `${match.teamA.name} — 10 pts`, sublabel: "Race 10", odds: match.raceTo.teamA_10, key: "teamA_10" },
                  { label: `${match.teamB.name} — 10 pts`, sublabel: "Race 10", odds: match.raceTo.teamB_10, key: "teamB_10" },
                  { label: `${match.teamA.name} — 20 pts`, sublabel: "Race 20", odds: match.raceTo.teamA_20, key: "teamA_20" },
                  { label: `${match.teamB.name} — 20 pts`, sublabel: "Race 20", odds: match.raceTo.teamB_20, key: "teamB_20" },
                ].map(({ label, sublabel, odds, key }) => (
                  <OddButton
                    key={key}
                    label={label}
                    sublabel={sublabel}
                    odds={odds}
                    active={isActive("raceTo", key)}
                    onClick={() => handleBet("raceTo", key, odds)}
                    compact
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// ─── Composant titre de section ───────────────────────────────────────────
function SectionTitle({ children }) {
  return (
    <p style={{
      fontSize: 10,
      fontWeight: 700,
      color: "#00c853",
      textTransform: "uppercase",
      letterSpacing: 1,
      margin: "4px 0 6px",
    }}>
      {children}
    </p>
  );
}

// ─── Bouton de cote ───────────────────────────────────────────────────────
function OddButton({ label, sublabel, odds, active, onClick, compact }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...styles.oddBtn,
        ...(compact ? styles.oddBtnCompact : {}),
        ...(hovered ? styles.oddBtnHover : {}),
        ...(active ? styles.oddBtnActive : {}),
      }}
    >
      <span style={styles.oddSublabel}>{sublabel}</span>
      <span style={{ ...styles.oddValue, ...(active ? styles.oddValueActive : {}) }}>
        {odds ?? "—"}
      </span>
      <span style={styles.oddLabel}>{label}</span>
    </button>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────
const styles = {
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
    gap: 12,
    width: "100%",
    maxWidth: 420,
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

  // Onglets
  tabs: {
    display: "flex",
    gap: 4,
    borderBottom: "1px solid #1a2a40",
    paddingBottom: 8,
    flexWrap: "wrap",
  },

  tab: {
    background: "transparent",
    border: "1px solid #1a2a40",
    borderRadius: 5,
    padding: "5px 10px",
    fontSize: 10,
    fontWeight: 600,
    color: "#546e7a",
    cursor: "pointer",
    letterSpacing: 0.5,
    transition: "all .2s",
  },

  tabActive: {
    background: "#0f2540",
    borderColor: "#00c853",
    color: "#00c853",
  },

  // Cotes
  odds: {
    display: "flex",
    gap: 8,
    paddingTop: 4,
    flexWrap: "wrap",
  },

  oddBtn: {
    flex: 1,
    minWidth: 70,
    background: "#0a0f1a",
    border: "1px solid #1a2a40",
    borderRadius: 6,
    padding: "8px 4px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    cursor: "pointer",
    transition: "background .2s, border-color .2s",
  },

  oddBtnCompact: {
    minWidth: 60,
    padding: "6px 4px",
  },

  oddBtnHover: {
    background: "#0f1e30",
    borderColor: "#1565c0",
  },

  oddBtnActive: {
    background: "#0f2540",
    borderColor: "#00c853",
  },

  oddSublabel: {
    fontSize: 9,
    fontWeight: 700,
    color: "#00c853",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  oddLabel: {
    fontSize: 9,
    color: "#546e7a",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: 90,
    textAlign: "center",
  },

  oddValue: {
    fontSize: 15,
    fontWeight: 700,
    color: "#42a5f5",
  },

  oddValueActive: {
    color: "#00e676",
  },

  // Grille buts / over-under
  goalsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    width: "100%",
  },

  goalRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  goalLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: "#78909c",
    minWidth: 36,
    textAlign: "center",
  },

  // Grille score exact / handicap / race to
  scoreGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: 6,
    width: "100%",
  },

  // Grille HT/FT (3 colonnes)
  htftGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 6,
    width: "100%",
  },
};