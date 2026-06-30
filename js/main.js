// =============================================
// CS PUZZLE GAME - Main React App
// Team: Valik, Simon, Fred
// =============================================

const { useState, useEffect, useRef } = React;
const TEST_MODE = true; // set to true to unlock all levels from the start

// ── SOUND ENGINE
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

const BACKGROUND_TRACKS = [
  "assets/background_music/bg1.mp3",
  "assets/background_music/bg2.mp3",
  "assets/background_music/bg3.mp3",
  "assets/background_music/bg4.mp3"
];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function getCtx() {
  if (!audioCtx) audioCtx = new AudioCtx();
  return audioCtx;
}

function playSound(type) {
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "correct") {
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.setValueAtTime(660, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } else if (type === "wrong") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(200, ctx.currentTime);
      osc.frequency.setValueAtTime(150, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === "achievement") {
      [523, 659, 784, 1047].forEach((freq, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        o.frequency.value = freq;
        g.gain.setValueAtTime(0.25, ctx.currentTime + i * 0.12);
        g.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + i * 0.12 + 0.3,
        );
        o.start(ctx.currentTime + i * 0.12);
        o.stop(ctx.currentTime + i * 0.12 + 0.3);
      });
    } else if (type === "click") {
      osc.frequency.value = 800;
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    }
  } catch (e) {}
}

// ── ACHIEVEMENTS ──────────────────────────────
const ACHIEVEMENTS = [
  {
    id: "first_blood",
    icon: "🩸",
    title: "First Blood",
    desc: "Got your first correct answer",
  },
  {
    id: "binary_master",
    icon: "🔢",
    title: "Binary Master",
    desc: "Completed Binary to Decimal with no mistakes",
  },
  {
    id: "no_mistakes_1",
    icon: "🎯",
    title: "Sharpshooter",
    desc: "Completed If/Else with no wrong answers",
  },
  {
    id: "no_mistakes_2",
    icon: "⚡",
    title: "Logic Lord",
    desc: "Completed Logic Gates with no mistakes",
  },
  {
    id: "escapee",
    icon: "🚀",
    title: "Escapee",
    desc: "Escaped the CS Dungeon",
  },
  {
    id: "all_levels",
    icon: "🏆",
    title: "CS Master",
    desc: "Completed all 4 levels",
  },
];

// ── LEVEL DATA ────────────────────────────────
const LEVELS = [
  {
    id: 1,
    name: "Binary to Decimal",
    icon: "🔢",
    desc: "Convert binary numbers to decimal values",
    color: "#00f5ff",
    difficulty: "Easy",
  },
  {
    id: 2,
    name: "If / Else",
    icon: "🧠",
    desc: "Fill in the missing condition to fix the code",
    color: "orange",
    difficulty: "Medium",
  },
  {
    id: 3,
    name: "Logic Gates",
    icon: "⚡",
    desc: "Pick the right gate so the output is 1",
    color: "#ff006e",
    difficulty: "Medium",
  },
  {
    id: 4,
    name: "Text Adventure",
    icon: "🗺️",
    desc: "Type commands to escape the maze",
    color: "#7fff00",
    difficulty: "Hard",
  },
  {
    id: "leaderboard",
    name: "Leaderboard",
    icon: "🏆",
    desc: "View the highest scores from all players",
    color: "#ffd700",
    difficulty: "Global",
  },
  {
    id: "settings",
    name: "Settings",
    icon: "⚙️",
    desc: "Configure audio and game options",
    color: "#8a8aff",
    difficulty: "System",
  },
];

// ══════════════════════════════════════════════
// COMPONENTS
// ══════════════════════════════════════════════

// ── ACHIEVEMENT TOAST ─────────────────────────
function AchievementToast({ achievement, onDone }) {
  useEffect(() => {
    playSound("achievement");
    const t = setTimeout(onDone, 3500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        background: "linear-gradient(135deg, #1a1a2e, #16213e)",
        border: "1px solid var(--accent3)",
        borderRadius: 12,
        padding: "14px 20px",
        boxShadow: "0 0 24px rgba(255,214,10,0.3)",
        display: "flex",
        alignItems: "center",
        gap: 14,
        animation: "slideIn 0.4s ease",
        maxWidth: 300,
      }}
    >
      <div style={{ fontSize: "2rem" }}>{achievement.icon}</div>
      <div>
        <div
          style={{
            fontSize: "0.65rem",
            color: "var(--accent3)",
            letterSpacing: 2,
            marginBottom: 2,
          }}
        >
          ACHIEVEMENT UNLOCKED
        </div>
        <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff" }}>
          {achievement.title}
        </div>
        <div style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>
          {achievement.desc}
        </div>
      </div>
    </div>
  );
}

// ── HOME SCREEN ───────────────────────────────
function HomeScreen({
  completedLevels,
  scores,
  onSelectLevel,
  onLeaderboard,
  onSettings,
  unlockedAchievements,
}) {

  const level4Unlocked =
    TEST_MODE ||
    (
      completedLevels.includes(1) &&
      completedLevels.includes(2) &&
      completedLevels.includes(3)
    );

  return (
    <div className="screen">
      <div style={{ marginBottom: 8 }}>
        <div className="home-subtitle" style={{ marginBottom: 4 }}>
          <span>TEAM SOFTWARE ENGINEERING</span> — University of Lincoln
        </div>
      </div>
      <div className="home-title">
        CS PUZZLE
        <br />
        GAME <span className="blinking-cursor" />
      </div>
      <div className="home-subtitle" style={{ marginBottom: 0 }}>
        Learn Computer Science by Playing
      </div>

      <div className="level-grid" style={{ marginTop: 36 }}>
        {LEVELS.map((lvl, i) => {
          const done = completedLevels.includes(lvl.id);
          const locked = lvl.id === 4 && !level4Unlocked;
          return (
            <div
              key={lvl.id}
              className={`level-card ${locked ? "locked" : ""}`}
              style={{ "--card-color": lvl.color }}
              onClick={() => {
                if (!locked) {
                  if (lvl.id === "leaderboard") {
                    onLeaderboard();
                  } else if (lvl.id === "settings") {
                    onSettings();
                  } else {
                    onSelectLevel(lvl.id);
                  }
                }
              }}
            >
              <div className="level-num">
                {lvl.id === "leaderboard"
                  ? "🏆 GLOBAL LEADERBOARD"
                  : lvl.id === "settings"
                    ? "⚙️ SETTINGS"
                    : (
                    <>
                      LEVEL {lvl.id} ·{" "}
                      {lvl.difficulty === "Easy"
                        ? "🟢 Easy"
                        : lvl.difficulty === "Medium"
                          ? "🟡 Medium"
                          : lvl.difficulty === "Hard"
                            ? "🔴 Hard"
                            : "🏆 Global"}
                    </>
                  )}
              </div>
              <div className="level-icon">{lvl.icon}</div>
              <div className="level-name">{lvl.name}</div>
              <div className="level-desc">{lvl.desc}</div>
              {locked && (
                <div
                  style={{
                    marginTop: 10,
                    fontSize: "0.7rem",
                    color: "#ff5555",
                    fontWeight: "bold",
                  }}
                >
                  🔒 Complete Levels 1–3 to unlock
                </div>
              )}
              {done && (
                <div className="level-badge" title="Completed!">
                  ✅
                </div>
              )}
              {scores[lvl.id] != null && (
                <div
                  style={{
                    marginTop: 10,
                    fontSize: "0.7rem",
                    color: lvl.color,
                  }}
                >
                  Best: {scores[lvl.id]} pts
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div
        style={{
          fontSize: "0.72rem",
          color: "var(--text-dim)",
          textAlign: "center",
        }}
      >
        Play any level — explore different Computer Science concepts 🚀
      </div>
      {/* ── ACHIEVEMENTS ── */}
      {unlockedAchievements.length > 0 && (
        <div style={{ marginTop: 32 }}>
          <div
            style={{
              fontSize: "0.7rem",
              color: "var(--text-dim)",
              letterSpacing: 2,
              marginBottom: 12,
              textAlign: "center",
            }}
          >
            YOUR ACHIEVEMENTS
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {ACHIEVEMENTS.map((a) => (
              <div
                key={a.id}
                title={a.desc}
                style={{
                  fontSize: "1.6rem",
                  opacity: unlockedAchievements.includes(a.id) ? 1 : 0.2,
                  filter: unlockedAchievements.includes(a.id)
                    ? "none"
                    : "grayscale(1)",
                  cursor: "default",
                  transition: "all 0.3s",
                }}
              >
                {a.icon}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function LeaderboardScreen({ onBack }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadScores() {
      try {
        const results = await window.CSLeaderboard.getTopScores(10);
        setScores(results);
      } catch (err) {
        console.error(err);
        setError("Unable to load leaderboard.");
      } finally {
        setLoading(false);
      }
    }

    loadScores();
  }, []);

  function rankLabel(index) {
    if (index === 0) return "🥇 1";
    if (index === 1) return "🥈 2";
    if (index === 2) return "🥉 3";
    return String(index + 1);
  }

  return (
    <div className="screen">
      <div className="victory-card">
        <div style={{ fontSize: "3rem", marginBottom: 12 }}>🏆</div>
        <div className="victory-title">GLOBAL LEADERBOARD</div>

        <div style={{ color: "var(--text-dim)", marginBottom: 24 }}>
          Top completed game scores
        </div>

        <div className="code-block" style={{ textAlign: "left" }}>
          {loading && <div style={{ textAlign: "center" }}>Loading leaderboard...</div>}

          {!loading && error && (
            <div style={{ color: "var(--accent2)", textAlign: "center" }}>
              {error}
            </div>
          )}

          {!loading && !error && scores.length === 0 && (
            <div style={{ textAlign: "center", color: "var(--text-dim)" }}>
              No scores have been submitted yet.

              Be the first to escape the CS Puzzle Game!
            </div>
          )}

          {!loading && !error && scores.length > 0 && (
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr 90px",
                  gap: 10,
                  padding: "0 0 10px 0",
                  color: "var(--text-dim)",
                  fontSize: "0.75rem",
                  letterSpacing: 1,
                  borderBottom: "1px solid var(--border)",
                  marginBottom: 8,
                }}
              >
                <div>Rank</div>
                <div>Player</div>
                <div style={{ textAlign: "right" }}>Score</div>
              </div>
              {scores.map((entry, index) => (
                <div
                  key={entry.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 1fr 90px",
                    gap: 10,
                    padding: "10px 0",
                    borderBottom: "1px solid var(--border)",
                    alignItems: "center",
                  }}
                >
                  <div style={{ color: "var(--accent4)" }}>
                    {rankLabel(index)}
                  </div>

                  <div style={{ color: "var(--text)" }}>
                    {entry.name}
                  </div>

                  <div style={{ color: "var(--accent)", textAlign: "right" }}>
                    {entry.score.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="btn btn-ghost" onClick={onBack}>
          ← Back
        </button>
      </div>
    </div>
  );
}

function SettingsScreen({ onBack }) {
  return (
    <div className="screen">
      <div className="victory-card">
        <div style={{ fontSize: "3rem", marginBottom: 12 }}>⚙️</div>
        <div className="victory-title">SETTINGS</div>

        <div style={{ color: "var(--text-dim)", marginBottom: 24 }}>
          Game options will appear here.
        </div>

        <div className="code-block" style={{ textAlign: "left" }}>
          Coming soon:
          <br />
          • Music toggle
          <br />
          • Sound effects toggle
          <br />
          • Reset local progress
        </div>

        <button className="btn btn-ghost" onClick={onBack}>
          ← Back
        </button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════
// APP ROOT
// ══════════════════════════════════════════════
function App() {
  const [screen, setScreen] = useState("start");
  const [completedLevels, setCompletedLevels] = useState([]);
  const [scores, setScores] = useState({});
  
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [toastQueue, setToastQueue] = useState([]);

  const [lastSubmittedScore, setLastSubmittedScore] = useState(null);

  // BACKGROUND MUSIC
  const musicRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);

  const shuffledTracks = useRef(
    shuffleArray(BACKGROUND_TRACKS)
  );

  // ── CREATE / SWITCH TRACKS ──────────────────
  useEffect(() => {
    const audio = new Audio(
      shuffledTracks.current[trackIndex]
    );

    musicRef.current = audio;

    audio.volume = 0.035;

    audio.play().catch(() => {
      console.log("Autoplay blocked until user interaction");
    });

    audio.onended = () => {
      setTrackIndex(
        (prev) => (prev + 1) % shuffledTracks.current.length
      );
    };

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [trackIndex]);


  // ── START MUSIC AFTER FIRST USER INTERACTION ──────────────────
  useEffect(() => {

    const startMusic = () => {

      if (musicRef.current) {
        musicRef.current.play().catch(() => {});
      }

      window.removeEventListener("click", startMusic);
      window.removeEventListener("keydown", startMusic);
    };

    window.addEventListener("click", startMusic);
    window.addEventListener("keydown", startMusic);

    return () => {
      window.removeEventListener("click", startMusic);
      window.removeEventListener("keydown", startMusic);
    };

  }, []);

  function handleSelectLevel(id) {
  setScreen(`level${id}`);
}

  function unlockAchievement(id) {
    if (unlockedAchievements.includes(id)) return;
    const achievement = ACHIEVEMENTS.find((a) => a.id === id);
    if (!achievement) return;
    setUnlockedAchievements((prev) => [...prev, id]);
    setToastQueue((prev) => [...prev, achievement]);
  }

  function dismissToast() {
    setToastQueue((prev) => prev.slice(1));
  }

  function completeLevel(levelId, pts, mistakes = 0) {
    setCompletedLevels((prev) =>
      prev.includes(levelId) ? prev : [...prev, levelId],
    );
    setScores((prev) => ({
      ...prev,
      [levelId]: Math.max(prev[levelId] || 0, pts),
    }));

    // ── ACHIEVEMENTS ON LEVEL COMPLETE ──
    if (mistakes === 0) {
      const ids = {
      1: "binary_master",
      2: "no_mistakes_1",
      3: "no_mistakes_2"
    };
      if (ids[levelId]) unlockAchievement(ids[levelId]);
    }
    if (levelId === 4) unlockAchievement("escapee");

    const newCompleted = completedLevels.includes(levelId)
      ? completedLevels
      : [...completedLevels, levelId];
    if (newCompleted.length >= 4) unlockAchievement("all_levels");

    const nextId = levelId + 1;
    if (nextId <= 4) setScreen(`level${nextId}`);
    else setScreen("home");
  }

  return (
    <>
      {screen === "start" && (
        <div className="screen">
          <div className="victory-card">
            <div className="home-subtitle">TEAM SOFTWARE ENGINEERING</div>

            <div className="home-title">
              CS PUZZLE
              <br />
              GAME <span className="blinking-cursor" />
            </div>

            <div style={{ color: "var(--text-dim)", marginBottom: 24 }}>
              Learn Computer Science by Playing
            </div>

            <button
              className="btn btn-primary"
              onClick={() => {
                if (musicRef.current) {
                  musicRef.current.volume = 0.05;
                  musicRef.current.muted = false;
                  musicRef.current.play()
                    .then(() => console.log("Music started"))
                    .catch(err => console.log("Music failed:", err));
                }

                setScreen("home");
              }}
            >
              Start Game →
            </button>
          </div>
        </div>
      )}
      {screen === "home" && (
        <HomeScreen
          completedLevels={completedLevels}
          scores={scores}
          unlockedAchievements={unlockedAchievements}
          onSelectLevel={(id) => setScreen(`level${id}`)}
          onLeaderboard={() => setScreen("leaderboard")}
          onSettings={() => setScreen("settings")}
        />
      )}
      {screen === "level1" && (
        <Level1
          onComplete={(pts, mistakes) => completeLevel(1, pts, mistakes)}
          onBack={() => setScreen("home")}
          onAchievement={unlockAchievement}
        />
      )}
      {screen === "level2" && (
        <Level2
          onComplete={(pts, mistakes) => completeLevel(2, pts, mistakes)}
          onBack={() => setScreen("home")}
          onAchievement={unlockAchievement}
        />
      )}

      {screen === "level3" && (
        <Level3Wrapper
          onComplete={(pts, mistakes) => completeLevel(3, pts, mistakes)}
          onBack={() => setScreen("home")}
          onAchievement={unlockAchievement}
        />
      )}
      {screen === "level4" && (
        <Level4
          onComplete={(pts) => completeLevel(4, pts)}
          onBack={() => setScreen("home")}
          onScoreSubmitted={(id, name, score) => {
            setLastSubmittedScore({
              id,
              name,
              score,
            });
            setScreen("leaderboard");
          }}
        />
      )}
      {screen === "leaderboard" && (
        <LeaderboardScreen onBack={() => setScreen("home")} />
      )}
      {screen === "settings" && (
        <SettingsScreen onBack={() => setScreen("home")} />
      )}
      {toastQueue.length > 0 && (
        <AchievementToast achievement={toastQueue[0]} onDone={dismissToast} />
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);