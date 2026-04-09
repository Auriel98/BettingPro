import { useState, useRef } from "react";
import { matches } from "./data/matches";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MatchCard from "./components/MatchCard";
import LeagueList from "./components/LeagueList";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import "./index.css";

// ── MODAL ────────────────────────────────────────────────────
function Modal({ modal, onClose }) {
  if (!modal) return null;
  const isWin = modal.type === "win";
  const isLoss = modal.type === "loss";
  const accentColor = isWin ? "#00c853" : isLoss ? "#ff5555" : modal.type === "error" ? "#ff5555" : "#00c853";

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 9999, padding: "1rem",
      }}
    >
      <div style={{
        background: "#111820", border: `1px solid ${accentColor}`,
        borderRadius: "8px", width: "100%", maxWidth: "420px",
        overflow: "hidden", boxShadow: `0 0 40px ${accentColor}33`,
        animation: "modalIn 0.2s ease",
      }}>
        <style>{`@keyframes modalIn { from { transform: scale(0.92); opacity: 0; } to { transform: scale(1); opacity: 1; } }`}</style>

        {/* Header */}
        <div style={{ background: "#0d1520", borderBottom: `2px solid ${accentColor}`, padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "34px", height: "34px", background: accentColor, borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", flexShrink: 0 }}>
            {isWin ? "🏆" : isLoss ? "💔" : modal.type === "error" ? "⚠️" : "ℹ️"}
          </div>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "20px", fontWeight: 700, color: "#fff", letterSpacing: "1px", textTransform: "uppercase" }}>
            {modal.title}
          </span>
        </div>

        {/* Body */}
        <div style={{ padding: "1.25rem" }}>
          <p style={{ color: "#a0b8c8", fontSize: "14px", margin: "0 0 1rem", lineHeight: 1.6 }}>
            {modal.message}
          </p>

          {/* Résultat win/loss */}
          {(isWin || isLoss) && (
            <div style={{
              padding: "16px", textAlign: "center",
              background: isWin ? "rgba(0,200,83,0.08)" : "rgba(255,85,85,0.08)",
              border: `0.5px solid ${accentColor}`, borderRadius: "4px",
            }}>
              <div style={{ fontSize: "12px", color: accentColor, letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px" }}>
                {isWin ? "Gains" : "Pertes"}
              </div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "36px", fontWeight: 700, color: accentColor, letterSpacing: "1px" }}>
                {modal.result}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "0 1.25rem 1.25rem" }}>
          <button onClick={onClose} style={{
            width: "100%", padding: "12px",
            background: accentColor, color: isWin ? "#0a0e14" : "#fff",
            border: "none", borderRadius: "4px", cursor: "pointer",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: "15px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase",
          }}>
            {isWin ? "Super ! Continuer →" : isLoss ? "Retenter sa chance →" : "Fermer"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── TICKET DE PARIS ─────────────────────────────────────────
function BetTicket({ ticket, onRemove, onClear, onConfirm, stakeInput, setStakeInput, balance }) {
  if (ticket.length === 0) return null;

  const totalOdds = ticket.reduce((acc, b) => acc * b.odds, 1);
  const stake = Number(stakeInput);
  const potentialGain = stake > 0 ? Math.round(stake * totalOdds) : 0;

  return (
    <div style={{
      position: "fixed", bottom: "1.5rem", right: "1.5rem",
      width: "320px", background: "#111820",
      border: "1px solid #00c853", borderRadius: "8px",
      boxShadow: "0 8px 40px rgba(0,200,83,0.15)",
      zIndex: 1000, overflow: "hidden",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(90deg, #0d2b1a, #0d2240)",
        borderBottom: "2px solid #00c853",
        padding: "0.75rem 1rem",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "16px" }}>🎫</span>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "16px", fontWeight: 700, color: "#fff", letterSpacing: "1px", textTransform: "uppercase" }}>
            Ticket ({ticket.length} pari{ticket.length > 1 ? "s" : ""})
          </span>
        </div>
        <button onClick={onClear} style={{ background: "transparent", border: "none", color: "#ff5555", cursor: "pointer", fontSize: "12px", fontWeight: 700, letterSpacing: "0.5px" }}>
          VIDER
        </button>
      </div>

      {/* Liste des paris */}
      <div style={{ maxHeight: "200px", overflowY: "auto", padding: "0.5rem" }}>
        {ticket.map((b) => (
          <div key={b.id} style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            padding: "8px 10px", marginBottom: "4px",
            background: "#0a0e14", border: "0.5px solid #1a3a2a", borderRadius: "4px",
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "12px", color: "#e0e8f0", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {b.team}
              </div>
              <div style={{ fontSize: "11px", color: "#4a8a6a", marginTop: "2px" }}>
                {b.matchLabel}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "8px", flexShrink: 0 }}>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "15px", fontWeight: 700, color: "#00c853" }}>
                ×{b.odds}
              </span>
              <button onClick={() => onRemove(b.id)} style={{ background: "transparent", border: "none", color: "#ff5555", cursor: "pointer", fontSize: "16px", lineHeight: 1, padding: "0 2px" }}>
                ×
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cote totale */}
      <div style={{ padding: "0.5rem 1rem", borderTop: "0.5px solid #1a3a2a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "12px", color: "#4a8a6a", letterSpacing: "0.5px", textTransform: "uppercase" }}>Cote totale</span>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "18px", fontWeight: 700, color: "#00c853" }}>
          ×{totalOdds.toFixed(2)}
        </span>
      </div>

      {/* Mise */}
      <div style={{ padding: "0.5rem 1rem", borderTop: "0.5px solid #1a3a2a" }}>
        <div style={{ fontSize: "11px", color: "#4a8a6a", letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: "6px" }}>
          Mise (FCFA) — Solde : {balance.toLocaleString()}
        </div>
        <input
          type="number"
          value={stakeInput}
          onChange={(e) => setStakeInput(e.target.value)}
          placeholder="Ex : 1000"
          style={{
            width: "100%", background: "#0a0e14", border: "0.5px solid #1e3a50",
            borderRadius: "4px", color: "#e0e8f0", fontSize: "15px",
            padding: "8px 10px", outline: "none", boxSizing: "border-box",
          }}
        />
        <div style={{ display: "flex", gap: "4px", marginTop: "6px", flexWrap: "wrap" }}>
          {[500, 1000, 2000, 5000].map((v) => (
            <button key={v} onClick={() => setStakeInput(String(v))}
              style={{ padding: "4px 8px", fontSize: "11px", background: "#0a0e14", color: "#4a8a6a", border: "0.5px solid #1e3a50", borderRadius: "3px", cursor: "pointer" }}>
              {v.toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* Gain potentiel */}
      {potentialGain > 0 && (
        <div style={{ padding: "0.5rem 1rem", borderTop: "0.5px solid #1a3a2a", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(0,200,83,0.05)" }}>
          <span style={{ fontSize: "12px", color: "#4a8a6a", textTransform: "uppercase", letterSpacing: "0.5px" }}>Gain potentiel</span>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "20px", fontWeight: 700, color: "#00c853" }}>
            {potentialGain.toLocaleString()} FCFA
          </span>
        </div>
      )}

      {/* Bouton confirmer */}
      <div style={{ padding: "0.75rem 1rem" }}>
        <button onClick={onConfirm} style={{
          width: "100%", padding: "12px",
          background: "#00c853", color: "#0a0e14",
          border: "none", borderRadius: "4px", cursor: "pointer",
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "15px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase",
        }}>
          Valider le ticket →
        </button>
      </div>
    </div>
  );
}

// ── APP ──────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState("Guest");
  const [balance, setBalance] = useState(1000);
  const [transactions, setTransactions] = useState([]);

  // Wallet
  const [walletModal, setWalletModal] = useState(null);
  const [walletAmount, setWalletAmount] = useState("");
  const [walletMsg, setWalletMsg] = useState(null);

  // Modale résultat
  const [modal, setModal] = useState(null);

  // Ticket de paris multiples
  const [ticket, setTicket] = useState([]);
  const [stakeInput, setStakeInput] = useState("");

  // Refs scroll
  const matchesRef = useRef(null);
  const contactRef = useRef(null);

  const scrollTo = (ref) => ref.current?.scrollIntoView({ behavior: "smooth" });

  const handleNav = (target) => {
    if (target === "matches") { setPage("home"); setTimeout(() => scrollTo(matchesRef), 100); }
    else if (target === "contact") { setPage("home"); setTimeout(() => scrollTo(contactRef), 100); }
    else setPage(target);
  };

  // Ajouter un pari au ticket (un seul pari par match)
  const placeBet = (match, team, odds) => {
    setTicket((prev) => {
      const alreadyExists = prev.find((b) => b.matchId === match.id);
      if (alreadyExists) {
        // Remplacer le pari sur ce match
        return prev.map((b) =>
          b.matchId === match.id
            ? { ...b, team, odds, matchLabel: `${match.home} vs ${match.away}` }
            : b
        );
      }
      return [...prev, {
        id: `${match.id}-${Date.now()}`,
        matchId: match.id,
        team,
        odds,
        matchLabel: `${match.home} vs ${match.away}`,
      }];
    });
  };

  const removeFromTicket = (id) => setTicket((prev) => prev.filter((b) => b.id !== id));
  const clearTicket = () => { setTicket([]); setStakeInput(""); };

  // Valider le ticket combiné
  const confirmTicket = () => {
    const stake = Number(stakeInput);
    if (!stake || stake <= 0) {
      setModal({ type: "error", title: "Mise invalide", message: "Veuillez entrer un montant de mise valide." });
      return;
    }
    if (stake > balance) {
      setModal({ type: "error", title: "Solde insuffisant", message: `Votre solde est de ${balance.toLocaleString()} FCFA. Déposez des fonds pour continuer.` });
      return;
    }

    const totalOdds = ticket.reduce((acc, b) => acc * b.odds, 1);
    const win = Math.random() > 0.45;
    const gain = win ? Math.round(stake * totalOdds) : 0;

    setBalance((b) => b - stake);
    if (win) setBalance((b) => b + gain);

    setTransactions((prev) => [{
      id: Date.now(),
      type: "bet",
      label: ticket.length === 1
        ? `${ticket[0].matchLabel} — ${ticket[0].team}`
        : `Combiné ${ticket.length} matchs`,
      amount: win ? `+${gain}` : `-${stake}`,
      win,
      date: new Date().toLocaleTimeString(),
    }, ...prev]);

    clearTicket();

    setModal(win
      ? {
          type: "win",
          title: "🎉 Ticket gagnant !",
          message: ticket.length > 1
            ? `Tous vos ${ticket.length} pronostics sont corrects !`
            : `Votre pronostic est correct !`,
          result: `+${gain.toLocaleString()} FCFA`,
        }
      : {
          type: "loss",
          title: "Ticket perdu",
          message: ticket.length > 1
            ? `L'un de vos pronostics était incorrect. Meilleure chance la prochaine fois !`
            : `Votre pronostic était incorrect. Meilleure chance la prochaine fois !`,
          result: `-${stake.toLocaleString()} FCFA`,
        }
    );
  };

  // Wallet
  const handleWallet = (type) => {
    const amount = Number(walletAmount);
    if (!amount || amount <= 0) { setWalletMsg({ type: "error", text: "Montant invalide" }); return; }
    if (type === "withdraw" && amount > balance) { setWalletMsg({ type: "error", text: "Solde insuffisant" }); return; }
    if (type === "deposit") {
      setBalance((b) => b + amount);
      setTransactions((prev) => [{ id: Date.now(), type: "deposit", label: "Dépôt Mobile Money", amount: `+${amount}`, win: true, date: new Date().toLocaleTimeString() }, ...prev]);
      setWalletMsg({ type: "success", text: `+${amount} FCFA crédités !` });
    } else {
      setBalance((b) => b - amount);
      setTransactions((prev) => [{ id: Date.now(), type: "withdraw", label: "Retrait Mobile Money", amount: `-${amount}`, win: false, date: new Date().toLocaleTimeString() }, ...prev]);
      setWalletMsg({ type: "success", text: `${amount} FCFA retirés !` });
    }
    setWalletAmount("");
    setTimeout(() => setWalletMsg(null), 3000);
  };

  const sectionTitle = (label, count) => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.5rem", borderBottom: "1px solid #1a3a2a", paddingBottom: "1rem" }}>
      <span style={{ width: "4px", height: "24px", background: "#00c853", borderRadius: "2px", display: "inline-block" }} />
      <h2 style={{ margin: 0, fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", color: "#fff" }}>
        {label}
      </h2>
      {count !== undefined && (
        <span style={{ marginLeft: "auto", background: "#00c853", color: "#0a0e14", fontSize: "11px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", padding: "3px 10px", borderRadius: "2px" }}>
          {count} en direct
        </span>
      )}
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0a0e14", color: "#e0e8f0", fontFamily: "'Barlow', sans-serif" }}>

      {/* Modales */}
      <Modal modal={modal} onClose={() => setModal(null)} />

      {/* Ticket flottant */}
      <BetTicket
        ticket={ticket}
        onRemove={removeFromTicket}
        onClear={clearTicket}
        onConfirm={confirmTicket}
        stakeInput={stakeInput}
        setStakeInput={setStakeInput}
        balance={balance}
      />

      <Navbar onNav={handleNav} user={user} balance={balance} />

      {/* ── HOME ── */}
      {page === "home" && (
        <>
          <Hero onStart={() => setTimeout(() => scrollTo(matchesRef), 50)} />
          <LeagueList />
          <div ref={matchesRef} style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem 2rem" }}>
            {sectionTitle("Matchs du moment", matches.length)}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
              {matches.map((m) => <MatchCard key={m.id} match={m} onBet={placeBet} />)}
            </div>
          </div>
          <div ref={contactRef} style={{ padding: "2rem 0 0" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem 1rem" }}>
              {sectionTitle("Nous contacter")}
            </div>
            <Contact />
          </div>
        </>
      )}

      {/* ── MATCHES ── */}
      {page === "matches" && (
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem" }}>
          {sectionTitle("Matchs du moment", matches.length)}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
            {matches.map((m) => <MatchCard key={m.id} match={m} onBet={placeBet} />)}
          </div>
        </div>
      )}

      {/* ── WALLET ── */}
      {page === "wallet" && (
        <div style={{ maxWidth: "560px", margin: "3rem auto", padding: "0 1rem" }}>
          <div style={{ background: "#111820", border: "0.5px solid #1a3a2a", borderRadius: "4px", overflow: "hidden" }}>
            <div style={{ background: "linear-gradient(90deg, #0d2b1a 0%, #0d2240 100%)", borderBottom: "2px solid #00c853", padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "36px", height: "36px", background: "#00c853", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>💰</div>
              <div>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: 700, color: "#fff", letterSpacing: "1px", textTransform: "uppercase", margin: 0 }}>Mon Solde</p>
                <p style={{ fontSize: "12px", color: "#00c853", margin: "2px 0 0", letterSpacing: "0.5px", textTransform: "uppercase" }}>Compte actif</p>
              </div>
            </div>
            <div style={{ padding: "2rem 1.5rem 1rem", textAlign: "center" }}>
              <p style={{ fontSize: "12px", color: "#4a8a6a", letterSpacing: "1px", textTransform: "uppercase", margin: "0 0 8px" }}>Solde disponible</p>
              <p style={{ fontSize: "42px", fontWeight: 700, fontFamily: "'Barlow Condensed', sans-serif", color: "#00c853", margin: 0, letterSpacing: "1px" }}>
                {balance.toLocaleString()} <span style={{ fontSize: "20px", color: "#4a8a6a" }}>FCFA</span>
              </p>
            </div>
            <div style={{ borderTop: "0.5px solid #1a3a2a", margin: "0 1.5rem" }} />
            <div style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", gap: "8px", marginBottom: "1rem" }}>
                {["deposit", "withdraw"].map((t) => (
                  <button key={t} onClick={() => { setWalletModal(t); setWalletMsg(null); setWalletAmount(""); }}
                    style={{ flex: 1, padding: "10px", background: walletModal === t ? "#00c853" : "transparent", color: walletModal === t ? "#0a0e14" : "#00c853", border: "0.5px solid #00c853", borderRadius: "2px", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "14px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", cursor: "pointer", transition: "all 0.15s" }}>
                    {t === "deposit" ? "💳 Déposer" : "📤 Retirer"}
                  </button>
                ))}
              </div>
              {walletModal && (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <label style={{ fontSize: "11px", color: "#4a8a6a", letterSpacing: "1px", textTransform: "uppercase" }}>Montant (FCFA)</label>
                  <input type="number" value={walletAmount} onChange={(e) => setWalletAmount(e.target.value)} placeholder="Ex: 5000"
                    style={{ background: "#0a0e14", border: "0.5px solid #1e3a50", borderRadius: "2px", color: "#e0e8f0", fontSize: "16px", padding: "10px 12px", outline: "none", fontFamily: "'Barlow', sans-serif" }} />
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {[1000, 2000, 5000, 10000].map((v) => (
                      <button key={v} onClick={() => setWalletAmount(v)}
                        style={{ padding: "5px 10px", fontSize: "12px", background: "#0a0e14", color: "#4a8a6a", border: "0.5px solid #1e3a50", borderRadius: "2px", cursor: "pointer", fontFamily: "'Barlow', sans-serif" }}>
                        {v.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => handleWallet(walletModal)}
                    style={{ background: "#00c853", color: "#0a0e14", border: "none", borderRadius: "2px", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "16px", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", padding: "12px", cursor: "pointer", marginTop: "4px" }}>
                    {walletModal === "deposit" ? "Confirmer le dépôt →" : "Confirmer le retrait →"}
                  </button>
                  {walletMsg && (
                    <div style={{ padding: "10px 12px", borderRadius: "2px", fontSize: "13px", fontWeight: 500, background: walletMsg.type === "success" ? "rgba(0,200,83,0.1)" : "rgba(220,50,50,0.1)", color: walletMsg.type === "success" ? "#00c853" : "#ff5555", border: `0.5px solid ${walletMsg.type === "success" ? "#00c853" : "#ff5555"}`, textAlign: "center" }}>
                      {walletMsg.type === "success" ? "✅ " : "❌ "}{walletMsg.text}
                    </div>
                  )}
                </div>
              )}
            </div>
            {transactions.length > 0 && (
              <>
                <div style={{ borderTop: "0.5px solid #1a3a2a", margin: "0 1.5rem" }} />
                <div style={{ padding: "1.25rem 1.5rem" }}>
                  <p style={{ fontSize: "11px", color: "#4a8a6a", letterSpacing: "1px", textTransform: "uppercase", margin: "0 0 12px" }}>Historique</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "220px", overflowY: "auto" }}>
                    {transactions.map((tx) => (
                      <div key={tx.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", background: "#0a0e14", border: "0.5px solid #1a3a2a", borderRadius: "2px", fontSize: "13px" }}>
                        <div>
                          <span style={{ color: "#e0e8f0" }}>{tx.label}</span>
                          <span style={{ color: "#2e5a40", fontSize: "11px", marginLeft: "8px" }}>{tx.date}</span>
                        </div>
                        <span style={{ fontWeight: 700, color: tx.win ? "#00c853" : "#ff5555", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "15px" }}>
                          {tx.amount} FCFA
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            <div style={{ padding: "0.75rem 1.5rem", background: "#0d1520", borderTop: "0.5px solid #1a3a2a", display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#00c853" }} />
              <span style={{ fontSize: "11px", color: "#2e5a40", fontWeight: 500, letterSpacing: "0.5px" }}>
                Transactions sécurisées — Mobile Money disponible
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── HISTORY ── */}
{page === "history" && (
  <div style={{ maxWidth: "700px", margin: "3rem auto", padding: "0 1rem" }}>
    <div style={{ background: "#111820", border: "0.5px solid #1a3a2a", borderRadius: "4px", overflow: "hidden" }}>

      {/* Header */}
      <div style={{ background: "linear-gradient(90deg, #0d2b1a, #0d2240)", borderBottom: "2px solid #00c853", padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{ width: "36px", height: "36px", background: "#00c853", borderRadius: "2px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px" }}>📋</div>
        <div>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: 700, color: "#fff", letterSpacing: "1px", textTransform: "uppercase", margin: 0 }}>
            Historique des tickets
          </p>
          <p style={{ fontSize: "12px", color: "#00c853", margin: "2px 0 0", letterSpacing: "0.5px", textTransform: "uppercase" }}>
            {transactions.filter(t => t.type === "bet").length} paris joués
          </p>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: "20px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "11px", color: "#4a8a6a", textTransform: "uppercase", letterSpacing: "0.5px" }}>Gagnés</div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: 700, color: "#00c853" }}>
              {transactions.filter(t => t.type === "bet" && t.win).length}
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "11px", color: "#4a8a6a", textTransform: "uppercase", letterSpacing: "0.5px" }}>Perdus</div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "22px", fontWeight: 700, color: "#ff5555" }}>
              {transactions.filter(t => t.type === "bet" && !t.win).length}
            </div>
          </div>
        </div>
      </div>

      {/* Contenu vide */}
      {transactions.filter(t => t.type === "bet").length === 0 ? (
        <div style={{ padding: "3rem", textAlign: "center", color: "#4a8a6a" }}>
          <div style={{ fontSize: "40px", marginBottom: "12px" }}>🎫</div>
          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "18px", letterSpacing: "1px" }}>
            Aucun ticket joué pour l'instant
          </p>
        </div>
      ) : (
        <div style={{ padding: "1rem 1.5rem", display: "flex", flexDirection: "column", gap: "10px" }}>
          {transactions
            .filter(t => t.type === "bet")
            .map((tx) => (
              <div key={tx.id} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "14px 16px",
                background: tx.win ? "rgba(0,200,83,0.06)" : "rgba(255,85,85,0.06)",
                border: `0.5px solid ${tx.win ? "#1a4a2a" : "#4a1a1a"}`,
                borderLeft: `3px solid ${tx.win ? "#00c853" : "#ff5555"}`,
                borderRadius: "4px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "20px" }}>{tx.win ? "🏆" : "💔"}</span>
                  <div>
                    <div style={{ fontSize: "14px", color: "#e0e8f0", fontWeight: 600 }}>{tx.label}</div>
                    <div style={{ fontSize: "11px", color: "#4a8a6a", marginTop: "3px" }}>{tx.date}</div>
                  </div>
                </div>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: "20px", fontWeight: 700,
                  color: tx.win ? "#00c853" : "#ff5555",
                }}>
                  {tx.amount} FCFA
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Footer */}
      {transactions.filter(t => t.type === "bet").length > 0 && (
        <div style={{ padding: "0.75rem 1.5rem", background: "#0d1520", borderTop: "0.5px solid #1a3a2a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "11px", color: "#2e5a40", letterSpacing: "0.5px" }}>
            Taux de réussite : {Math.round(transactions.filter(t => t.type === "bet" && t.win).length / transactions.filter(t => t.type === "bet").length * 100)}%
          </span>
          <button
            onClick={() => setTransactions(prev => prev.filter(t => t.type !== "bet"))}
            style={{ background: "transparent", border: "none", color: "#ff5555", cursor: "pointer", fontSize: "12px", fontWeight: 700, letterSpacing: "0.5px" }}>
            EFFACER L'HISTORIQUE
          </button>
        </div>
      )}
    </div>
  </div>
)}






      {/* ── CONTACT ── */}
      {page === "contact" && <Contact />}

      <Footer />
    </div>
  );
}