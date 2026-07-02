// =============================================
// CS PUZZLE GAME - Main React App
// Team: Valik, Simon, Fred
// =============================================

const { useState, useEffect, useRef } = React;
const TEST_MODE = true; // set to true to unlock all levels from the start
const GAME_VERSION = "v1.1";

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

  if (!window.soundEnabled) return;

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
    if ((achievement.type || "achievement") === "achievement") {
      playSound("achievement");
    } else {
      playSound("click");
    }
    const t = setTimeout(onDone, 3500);
    return () => clearTimeout(t);
  }, []);

  const toastType = achievement.type || "achievement";

  const toastLabels = {
    achievement: "ACHIEVEMENT UNLOCKED",
    success: "SUCCESS",
    warning: "WARNING",
    error: "ERROR",
    info: "INFO",
  };

  const toastBorders = {
    achievement: "var(--accent3)",
    success: "var(--accent)",
    warning: "var(--accent4)",
    error: "var(--accent2)",
    info: "var(--accent)",
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 9999,
        background: "linear-gradient(135deg, #1a1a2e, #16213e)",
        border: `1px solid ${toastBorders[toastType]}`,
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
          {toastLabels[toastType]}
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

  const careerScore = Object.values(scores).reduce(
    (total, value) => total + Number(value || 0),
    0
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

      <div
        style={{
          marginTop: 18,
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "var(--text-dim)",
            fontSize: "0.65rem",
            letterSpacing: "0.2rem",
            marginBottom: 4,
          }}
        >
          CAREER SCORE
        </div>

        <div
          style={{
            color: "var(--accent)",
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "1.4rem",
            fontWeight: "bold",
            textShadow: "0 0 12px rgba(0,245,255,0.35)",
          }}
        >
          {careerScore > 0
            ? `${careerScore.toLocaleString()} pts`
            : "No score yet"}
        </div>
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
                  playSound("click");

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
        Learn each concept, complete Levels 1–3, then unlock the final Text Adventure 🚀
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

function LeaderboardScreen({ onBack, submittedEntry }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submittedRank, setSubmittedRank] = useState(null);

  useEffect(() => {
    async function loadScores() {
      try {
        const results = await window.CSLeaderboard.getTopScores(10);
        setScores(results);
        if (submittedEntry?.id) {
          const rankResult = await window.CSLeaderboard.getRankForEntry(submittedEntry.id);
          setSubmittedRank(rankResult);
        }
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

  function formatTime(seconds) {
    if (!Number.isFinite(Number(seconds))) return "—";

    const mins = Math.floor(seconds / 60);
    const secs = Number(seconds) % 60;

    return `${mins}:${String(secs).padStart(2, "0")}`;
  }

  function getRankMessage(rank) {
    if (rank === 11) {
      return "You're only one place away from the Top 10!";
    }

    if (rank <= 20) {
      return "Keep going — the Top 10 is within reach!";
    }

    if (rank <= 50) {
      return "Nice work! Keep practising to climb the leaderboard.";
    }

    if (rank <= 100) {
      return "Every run helps. See if you can beat your best score!";
    }

    return "Keep learning, keep improving, and climb the leaderboard!";
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
              <br />
              Be the first to escape the CS Puzzle Game!
            </div>
          )}

          {!loading && !error && scores.length > 0 && (
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr 1fr 1fr",
                  gap: 10,
                  padding: "0 8px 10px 8px",
                  color: "var(--text-dim)",
                  fontSize: "0.75rem",
                  letterSpacing: 1,
                  borderBottom: "1px solid var(--border)",
                  marginBottom: 8,
                }}
              >
                <div style={{ textAlign: "center" }}>Rank</div>
                <div style={{ textAlign: "center" }}>Player</div>
                <div style={{ textAlign: "center" }}>Score</div>
                <div style={{ textAlign: "center" }}>Time</div>
              </div>
              
              {scores.map((entry, index) => {
                const isSubmittedEntry = submittedEntry && entry.id === submittedEntry.id;

                return (
                <div
                  key={entry.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr 1fr 1fr",
                    alignItems: "center",
                    borderBottom: "1px solid var(--border)",
                    minHeight: 64,

                    background: isSubmittedEntry
                      ? "rgba(127,255,0,0.08)"
                      : "transparent",

                    boxShadow: isSubmittedEntry
                      ? "0 0 18px rgba(127,255,0,0.18)"
                      : "none",

                    borderRadius: isSubmittedEntry ? 8 : 0,

                    padding: "10px 8px",
                  }}
                >
                  <div
                    style={{
                      color: "var(--accent4)",
                      textAlign: "center",
                    }}
                  >
                    {rankLabel(index)}
                  </div>

                  <div
                    style={{
                      color: "var(--text)",
                      textAlign: "center",
                    }}
                  >
                    {entry.name}
                      {isSubmittedEntry && (
                        <span style={{ color: "var(--accent3)", marginLeft: 10, fontSize: "0.7rem" }}>
                          YOU
                        </span>
                      )}
                  </div>

                  <div
                    style={{
                      color: "var(--accent)",
                      textAlign: "center",
                    }}
                  >
                    {entry.score.toLocaleString()}
                  </div>
                  <div
                    style={{
                      color: "var(--text-dim)",
                      textAlign: "center",
                    }}
                  >
                    {formatTime(entry.completionTimeSeconds)}
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </div>

        {submittedRank &&
          !scores.some((entry) => entry.id === submittedRank.id) && (
            <div
              className="code-block"
              style={{
                textAlign: "left",
                borderColor: "var(--accent3)",
                boxShadow: "0 0 18px rgba(127,255,0,0.12)",
              }}
            >
              <div
                style={{
                  color: "var(--accent3)",
                  fontSize: "0.75rem",
                  letterSpacing: 2,
                  marginBottom: 12,
                }}
              >
                YOUR RANK
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 2fr 1fr 1fr",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    color: "var(--accent4)",
                    textAlign: "center",
                  }}
                >
                  #{submittedRank.rank}
                </div>

                <div style={{ textAlign: "center" }}>
                  {submittedRank.name}
                </div>

                <div
                  style={{
                    color: "var(--accent)",
                    textAlign: "center",
                  }}
                >
                  {Number(submittedRank.score).toLocaleString()}
                </div>

                <div
                  style={{
                    color: "var(--text-dim)",
                    textAlign: "center",
                  }}
                >
                  {formatTime(submittedRank.completionTimeSeconds)}
                </div>
              </div>

              <div
                style={{
                  marginTop: 18,
                  color: "var(--text-dim)",
                  textAlign: "center",
                  fontSize: "0.8rem",
                  lineHeight: 1.5,
                }}
              >
                {getRankMessage(submittedRank.rank)}
              </div>
            </div>
          )}

        <button
          className="btn btn-ghost"
          onClick={() => {
            playSound("click");
            onBack();
          }}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

function ToggleButton({ enabled, onClick }) {
  return (
    <button
      onClick={() => {
        playSound("click");
        onClick();
      }}
      className={enabled ? "btn btn-primary" : "btn btn-ghost"}
      style={{
        minWidth: 72,
        fontWeight: "bold",
        transition: "all 0.2s ease",
      }}
    >
      {enabled ? "ON" : "OFF"}
    </button>
  );
}

function SettingCard({
  icon,
  title,
  description,
  control,
}) {
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: 10,
        padding: "16px",
        marginBottom: 16,
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <span style={{ fontSize: "1.2rem" }}>
            {icon}
          </span>

          <strong>{title}</strong>
        </div>

        <div
          style={{
            minWidth: 90,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {control}
        </div>
      </div>

      <div
        style={{
          color: "var(--text-dim)",
          fontSize: "0.8rem",
        }}
      >
        {description}
      </div>
    </div>
  );
}

function SettingsScreen({
  onBack,
  musicEnabled,
  onToggleMusic,
  soundEnabled,
  onToggleSound,
  onRequestReset,
}) {
  return (
    <div className="screen">
      <div className="victory-card">
        <div style={{ fontSize: "3rem", marginBottom: 12 }}>⚙️</div>
        <div className="victory-title">SETTINGS</div>

        <div style={{ color: "var(--text-dim)", marginBottom: 24 }}>
          Configure game options
        </div>

        <div className="code-block" style={{ textAlign: "left" }}>
          <SettingCard
            icon="🎵"
            title="Music"
            description="Background music during gameplay."
            control={
              <ToggleButton
                enabled={musicEnabled}
                onClick={onToggleMusic}
              />
            }
          />

          <SettingCard
            icon="🔊"
            title="Sound Effects"
            description="Button clicks and puzzle sounds."
            control={
              <ToggleButton
                enabled={soundEnabled}
                onClick={onToggleSound}
              />
            }
          />

          <SettingCard
            icon="♻️"
            title="Reset Local Progress"
            description="Clears local progress only. Global leaderboard scores are not affected."
            control={
              <button
                className="btn btn-danger"
                onClick={() => {
                  playSound("click");
                  onRequestReset();
                }}
              >
                RESET
              </button>
            }
          />

          <SettingCard
            icon="ℹ️"
            title="Version"
            description="CS Puzzle Game release version."
            control={
              <span style={{ color: "var(--accent)" }}>
                {GAME_VERSION}
              </span>
            }
          />
        </div>

        <button
          className="btn btn-ghost"
          onClick={() => {
            playSound("click");
            onBack();
          }}
        >
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
  const [completedLevels, setCompletedLevels] = useState(() => {
    return JSON.parse(localStorage.getItem("completedLevels") || "[]");
  });

  const [scores, setScores] = useState(() => {
    return JSON.parse(localStorage.getItem("scores") || "{}");
  });

  const [unlockedAchievements, setUnlockedAchievements] = useState(() => {
    return JSON.parse(localStorage.getItem("unlockedAchievements") || "[]");
  });
  const [toastQueue, setToastQueue] = useState([]);

  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const [lastSubmittedScore, setLastSubmittedScore] = useState(null);

  // BACKGROUND MUSIC
  const musicRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [musicEnabled, setMusicEnabled] = useState(() => {
    return localStorage.getItem("musicEnabled") !== "false";
  });

  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem("soundEnabled") !== "false";
  });
  window.soundEnabled ??= true;

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
    audio.muted = !musicEnabled;

    if (musicEnabled) {
      audio.play().catch(() => {
        console.log("Autoplay blocked until user interaction");
      });
    }

    audio.onended = () => {
      setTrackIndex(
        (prev) => (prev + 1) % shuffledTracks.current.length
      );
    };

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [trackIndex, musicEnabled]);

  useEffect(() => {
    if (!musicRef.current) return;

    musicRef.current.muted = !musicEnabled;

    if (musicEnabled) {
      musicRef.current.play().catch(() => {});
    }
  }, [musicEnabled]);


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

  useEffect(() => {
    localStorage.setItem("musicEnabled", String(musicEnabled));
  }, [musicEnabled]);

  useEffect(() => {
    localStorage.setItem("soundEnabled", String(soundEnabled));
    window.soundEnabled = soundEnabled;
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem("completedLevels", JSON.stringify(completedLevels));
  }, [completedLevels]);

  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);

  useEffect(() => {
    localStorage.setItem(
      "unlockedAchievements",
      JSON.stringify(unlockedAchievements)
    );
  }, [unlockedAchievements]);

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

  function resetLocalProgress() {
    localStorage.removeItem("musicEnabled");
    localStorage.removeItem("soundEnabled");
    localStorage.removeItem("completedLevels");
    localStorage.removeItem("scores");
    localStorage.removeItem("unlockedAchievements");

    setCompletedLevels([]);
    setScores({});
    setUnlockedAchievements([]);
    setToastQueue([]);
    setLastSubmittedScore(null);

    setMusicEnabled(true);
    setSoundEnabled(true);
    window.soundEnabled = true;

    setShowResetConfirm(false);

    setToastQueue([
      {
        type: "success",
        icon: "✅",
        title: "Progress Reset",
        desc: "Local progress has been reset successfully.",
      },
    ]);

    setScreen("home");
  }

  function completeLevel(levelId, pts, mistakes = 0, goHome = false) {
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

    if (goHome) {
      setScreen("home");
      return;
    }

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
                  musicRef.current.muted = !musicEnabled;

                  if (musicEnabled) {
                    musicRef.current.play()
                      .then(() => console.log("Music started"))
                      .catch(err => console.log("Music failed:", err));
                  }
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
          onBack={(pts, mistakes, completed = false) => {
            if (completed) completeLevel(1, pts, mistakes, true);
            else setScreen("home");
          }}
          onAchievement={unlockAchievement}
        />
      )}
      {screen === "level2" && (
        <Level2
          onComplete={(pts, mistakes) => completeLevel(2, pts, mistakes)}
          onBack={(pts, mistakes, completed = false) => {
            if (completed) completeLevel(2, pts, mistakes, true);
            else setScreen("home");
          }}
          onAchievement={unlockAchievement}
        />
      )}

      {screen === "level3" && (
        <Level3Wrapper
          onComplete={(pts, mistakes) => completeLevel(3, pts, mistakes)}
          onBack={(pts, mistakes, completed = false) => {
            if (completed) completeLevel(3, pts, mistakes, true);
            else setScreen("home");
          }}
          onAchievement={unlockAchievement}
        />
      )}
      {screen === "level4" && (
        <Level4
          initialScore={Object.values(scores).reduce(
            (total, value) => total + Number(value || 0),
            0
          )}
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
        <LeaderboardScreen
          onBack={() => setScreen("home")}
          submittedEntry={lastSubmittedScore}
        />
      )}
      {screen === "settings" && (
        <SettingsScreen
          onBack={() => setScreen("home")}
          musicEnabled={musicEnabled}
          onToggleMusic={() => setMusicEnabled((prev) => !prev)}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled((prev) => !prev)}
          onRequestReset={() => setShowResetConfirm(true)}
        />
      )}
      {showResetConfirm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            background: "rgba(0,0,0,0.72)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
          }}
        >
          <div
            className="victory-card"
            style={{
              maxWidth: 600,
              width: "100%",
            }}
          >
            <div
              style={{
                color: "var(--accent4)",
                fontSize: "2rem",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 24,
              }}
            >
              ⚠ RESET LOCAL PROGRESS
            </div>

            <div
              style={{
                width: "fit-content",
                margin: "0 auto 32px auto",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  color: "var(--text)",
                  lineHeight: 1.8,
                  marginBottom: 12,
                }}
              >
                This will permanently reset:
              </div>

              <div
                style={{
                  color: "var(--text-dim)",
                  lineHeight: 1.8,
                  marginLeft: 34,
                  marginBottom: 20,
                }}
              >
                • Completed levels
                <br />
                • Best scores
                <br />
                • Achievements
                <br />
                • Saved settings
              </div>

              <div
                style={{
                  color: "var(--text)",
                  lineHeight: 1.8,
                  marginBottom: 10,
                }}
              >
                This{" "}
                <span style={{ color: "var(--accent3)" }}>
                  will NOT
                </span>{" "}
                remove:
              </div>

              <div
                style={{
                  color: "var(--text-dim)",
                  lineHeight: 1.8,
                  marginLeft: 34,
                }}
              >
                <span style={{ color: "var(--accent3)" }}>✓</span> Global leaderboard entries
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 18,
              }}
            >
              <button
                className="btn btn-ghost"
                onClick={() => {
                  playSound("click");
                  setShowResetConfirm(false);
                }}
              >
                Cancel
              </button>

              <button
                className="btn btn-danger"
                onClick={() => {
                  playSound("click");
                  resetLocalProgress();
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
      {toastQueue.length > 0 && (
        <AchievementToast achievement={toastQueue[0]} onDone={dismissToast} />
      )}
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);