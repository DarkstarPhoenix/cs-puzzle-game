// ── LEVEL 1 - BINARY TO DECIMAL QUESTIONS ───────────────
function generateBinaryQuestions() {
  const questions = [];
  const used = new Set();

  function getUniqueNumber(min, max) {
    let num;

    do {
      num = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (used.has(num));

    used.add(num);
    return num;
  }

  function makeBinToDec(num) {
    const binary = num.toString(2);

    const explanationParts = binary
      .split("")
      .reverse()
      .map((bit, idx) => `${bit}×${2 ** idx}`)
      .reverse();

    return {
      type: "bin-to-dec",
      question: binary,
      answer: String(num),
      explanation: `${binary} = ${explanationParts.join(" + ")} = ${num}`,
    };
  }

  function makeDecToBin(num) {
    return {
      type: "dec-to-bin",
      question: String(num),
      answer: num.toString(2),
      explanation: `${num} in binary is ${num.toString(2)}`,
    };
  }

  // Questions 1–5: Beginner binary → decimal
  questions.push(makeBinToDec(getUniqueNumber(1, 3)));
  questions.push(makeBinToDec(getUniqueNumber(4, 7)));
  questions.push(makeBinToDec(getUniqueNumber(8, 15)));
  questions.push(makeBinToDec(getUniqueNumber(10, 20)));
  questions.push(makeBinToDec(getUniqueNumber(16, 31)));

  // Questions 6–10: Advanced binary → decimal
  questions.push(makeBinToDec(getUniqueNumber(32, 63)));
  questions.push(makeBinToDec(getUniqueNumber(64, 127)));
  questions.push(makeBinToDec(getUniqueNumber(128, 191)));
  questions.push(makeBinToDec(getUniqueNumber(192, 255)));
  questions.push(makeBinToDec(getUniqueNumber(256, 511))); // 9-bit max range

  // Questions 11–15: Decimal → binary
  questions.push(makeDecToBin(getUniqueNumber(5, 15)));
  questions.push(makeDecToBin(getUniqueNumber(16, 31)));
  questions.push(makeDecToBin(getUniqueNumber(32, 63)));
  questions.push(makeDecToBin(getUniqueNumber(64, 127)));
  questions.push(makeDecToBin(getUniqueNumber(128, 255)));

  return questions;
}
  
// ── LEVEL 1 – BINARY TO DECIMAL ───────────────
function Level1({ onComplete, onBack, onAchievement }) {
  const [started, setStarted] = useState(false);
  const [tab, setTab] = useState("practice");
  const [questions] = useState(() => generateBinaryQuestions());
  const [challengeBits, setChallengeBits] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [qIdx, setQIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [lastBonus, setLastBonus] = useState(null);
  const [showStreakBanner, setShowStreakBanner] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [done, setDone] = useState(false);
  const [firstCorrect, setFirstCorrect] = useState(false);
  const [practiceBits, setPracticeBits] = useState([0, 0, 0, 0]);
  const [practiceMode, setPracticeMode] = useState(4);
  const [practiceSection, setPracticeSection] = useState("sandbox");
  const [practiceTarget, setPracticeTarget] = useState(10);
  const [totalPulse, setTotalPulse] = useState(false);

  const inputRef = useRef(null);

  const q = questions[qIdx];
  const progress = (qIdx / questions.length) * 100;

  const difficultyTheme =
  qIdx < 5
    ? {
        border: "var(--accent)",
        glow: "rgba(0,245,255,0.35)",
        bg: "rgba(0,245,255,0.08)",
      }
    : qIdx < 10
    ? {
        border: "#b26cff",
        glow: "rgba(178,108,255,0.35)",
        bg: "rgba(178,108,255,0.08)",
      }
    : qIdx < 14
    ? {
        border: "#ff9f43",
        glow: "rgba(255,159,67,0.35)",
        bg: "rgba(255,159,67,0.08)",
      }
    : {
        border: "#ffd700",
        glow: "rgba(255,215,0,0.4)",
        bg: "rgba(255,215,0,0.1)",
      };

  const practicePlaceValues =
    practiceMode === 8
      ? [128, 64, 32, 16, 8, 4, 2, 1]
      : [8, 4, 2, 1];

  const practiceDecimal = practiceBits.reduce((total, bit, index) =>  {
    return total + bit * practicePlaceValues[index];
  }, 0);

  const practiceWorking = practiceBits
    .map((bit, index) => `${bit}x${practicePlaceValues[index]}`)
    .join(" + ");

  const practiceMatch = practiceDecimal === practiceTarget;

  const practiceTableLimit = practiceMode === 4 ? 16 : 16;

  const practiceTableRows = Array.from(
    { length: practiceTableLimit },
    (_, value) => ({
      decimal: value,
      binary: value.toString(2).padStart(practiceMode, "0"),
    })
    
  );

  useEffect(() => {
    setTotalPulse(true);

    const timer = setTimeout(() => {
      setTotalPulse(false);
    }, 220);

    return () => clearTimeout(timer);
  }, [practiceDecimal]);

  if (!started) {
    return (
      <div className="screen">
        <div className="victory-card">
          <div className="victory-title">BINARY → DECIMAL</div>

          <div style={{ color: "var(--text-dim)", marginBottom: 16 }}>
            Learn how computers convert binary numbers into decimal.
          </div>

          <div className="info-box" style={{ textAlign: "left" }}>
            <strong>How it works:</strong>
            <br /><br />
            Each position represents a power of 2:
            <br />
            <span style={{ color: "var(--accent)" }}>
              8 &nbsp;&nbsp; 4 &nbsp;&nbsp; 2 &nbsp;&nbsp; 1
            </span>
            <br /><br />
            Multiply each bit by its value, then add:
            <br /><br />
            <span style={{ color: "var(--accent3)" }}>
              1010 = 1×8 + 0×4 + 1×2 + 0×1 = 10
            </span>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => {
              playSound("click");
              setStarted(true);

              setTimeout(() => {
                inputRef.current?.focus();
              }, 0);
            }}
          >
            Start Level →
          </button>
        </div>
      </div>
    );
  }

  const tabStyle = (active) => ({
    flex: 1,
    padding: "10px 0",
    border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
    borderRadius: 6,
    background: active ? "rgba(0,245,255,0.08)" : "var(--surface)",
    color: active ? "var(--accent)" : "var(--text-dim)",
    fontFamily: "'Orbitron', sans-serif",
    fontSize: "0.7rem",
    letterSpacing: 2,
    cursor: "pointer",
    transition: "all 0.2s",
    textAlign: "center",
  });

  const practiceSectionStyle = (active) => ({
    flex: 1,
    padding: "8px 10px",
    border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
    borderRadius: 6,
    background: active ? "rgba(0,245,255,0.08)" : "var(--surface)",
    color: active ? "var(--accent)" : "var(--text-dim)",
    fontFamily: "monospace",
    fontSize: "0.75rem",
    cursor: "pointer",
  });

  function randomPracticeTarget(bits = practiceMode) {

    const max = bits === 8 ? 255 : 15;

    const value = Math.floor(Math.random() * (max + 1));

    setPracticeTarget(value);

    playSound("click");
  }

  function setPracticeBitMode(bits) {
    setPracticeMode(bits);

    if (bits === 8) {
      setPracticeBits([0, 0, 0, 0, 0, 0, 0, 0]);
    } else {
      setPracticeBits([0, 0, 0, 0]);
    }

    playSound("click");
    randomPracticeTarget(bits);
  }

  function togglePracticeBit(index) {
    setPracticeBits(bits =>
      bits.map((bit, i) => i === index ? (bit === 0 ? 1 : 0) : bit)
    );

    playSound("click");
  }

  function toggleChallengeBit(index) {
    setChallengeBits(bits =>
      bits.map((bit, i) => i === index ? (bit === 0 ? 1 : 0) : bit)
    );

    playSound("click");
  }

  function resetChallengeBits() {
    setChallengeBits([0, 0, 0, 0, 0, 0, 0, 0]);
  }

  function checkAnswer() {
    if (answered) return;

    const userValue =
      q.type === "dec-to-bin"
        ? challengeBits.join("").replace(/^0+/, "") || "0"
        : answer.trim();
    const correct =
      userValue.toLowerCase() === q.answer.toLowerCase();

    setAnswered(true);
    playSound(correct ? "correct" : "wrong");

    if (correct) {
      const nextStreak = streak + 1;

      setHighestStreak((best) => Math.max(best, nextStreak));

      let bonus = 0;

      if (nextStreak === 3) bonus = 50;
      if (nextStreak === 5) bonus = 100;
      if (nextStreak > 5) bonus = 25;

      setStreak(nextStreak);
      setScore(s => s + 100 + bonus);

      if (bonus > 0) {
        setLastBonus(`🔥 STREAK BONUS +${bonus}`);

        setShowStreakBanner(true);

        setTimeout(() => {
          setShowStreakBanner(false);
        }, 1400);
      } else {
        setLastBonus(null);
      }

      if (!firstCorrect) {
        setFirstCorrect(true);
        if (onAchievement) onAchievement("first_blood");
      }
    } else {
      setStreak(0);
      setLastBonus(null);
      setMistakes(m => m + 1);
    }
  }

  function next() {
    if (qIdx + 1 >= questions.length) {
      setDone(true);
    } else {
      setQIdx(i => i + 1);
      setAnswer("");
      resetChallengeBits();
      setAnswered(false);
      setLastBonus(null);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }

  if (done) {
    const stars = score >= 500 ? "⭐⭐⭐" : score >= 300 ? "⭐⭐" : "⭐";

    const accuracy = Math.round(
      ((questions.length - mistakes) / questions.length) * 100
    );

    const rank =
      score >= 1800
        ? {
            letter: "S",
            title: "Binary Master",
            color: "#ffd700",
          }
        : score >= 1500
        ? {
            letter: "A",
            title: "System Decoder",
            color: "var(--accent)",
          }
        : score >= 1200
        ? {
            letter: "B",
            title: "Data Technician",
            color: "#b26cff",
          }
        : score >= 800
        ? {
            letter: "C",
            title: "Binary Operator",
            color: "#ff9f43",
          }
        : {
            letter: "D",
            title: "Trainee",
            color: "var(--accent2)",
          };

    return (
      <div className="screen">
        <div className="victory-card">
          <div className="victory-title">LEVEL COMPLETE!</div>
          <div className="stars">{stars}</div>
          <div style={{ color: "var(--text-dim)", marginBottom: 8 }}>
            Binary conversion mastered
          </div>
          <div className="victory-score">{score} pts</div>

          <div
            style={{
              marginBottom: 18,
              padding: "16px",
              borderRadius: 12,
              border: `2px solid ${rank.color}`,
              background: `${rank.color}15`,
              boxShadow: `0 0 20px ${rank.color}40`,
            }}
          >
            <div
              style={{
                fontSize: "3rem",
                fontFamily: "'Orbitron', sans-serif",
                color: rank.color,
                textShadow: `0 0 18px ${rank.color}`,
                marginBottom: 6,
              }}
            >
              {rank.letter}
            </div>

            <div
              style={{
                color: rank.color,
                fontFamily: "'Orbitron', sans-serif",
                letterSpacing: 2,
                fontSize: "0.9rem",
              }}
            >
              {rank.title}
            </div>
          </div>

          <div
            style={{
              color: "var(--text-dim)",
              fontSize: "0.8rem",
              marginBottom: 24,
              lineHeight: 1.8,
            }}
          >
            Binary conversion mastered.
            <br />
            Accuracy: {accuracy}%
            <br />
            Mistakes: {mistakes}
            <br />
            Highest Streak: 🔥 {highestStreak}
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button 
              className="btn btn-ghost" 
              onClick={() => {
                playSound("click");
                onBack(score, mistakes, true);
              }}>
              ← Menu
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                playSound("click");
                onComplete(score, mistakes);
              }}
            >
              Next Level →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
  <div className="game-screen">
    <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
      <button 
        style={tabStyle(tab === "practice")} 
        onClick={() => {
          playSound("click");
          setTab("practice");
        }}>
        Practice
      </button>

      <button 
        style={tabStyle(tab === "challenge")} 
        onClick={() => {
          playSound("click");
          setTab("challenge");
        }}>
        Challenge
      </button>
    </div>

    {tab === "practice" ? (
      <>
        <div className="game-header">
          <button
            className="btn btn-ghost"
            style={{ 
              padding: "6px 12px", 
              fontSize: "0.7rem" 
            }}
            onClick={() => {
              playSound("click");
              onBack();
            }}
          >
            ← Back
          </button>

          <div className="level-tag">LEVEL 1</div>
          <div className="game-title">Binary Practice</div>
          <div className="score-display">Practice</div>
        </div>

        <div className="code-block" style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: "0.65rem",
              color: "var(--accent)",
              letterSpacing: 3,
              marginBottom: 12,
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            BINARY PRACTICE
          </div>

          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 20 }}>
            <button
              className="btn btn-ghost"
              onClick={() => setPracticeBitMode(4)}
              style={{ borderColor: practiceMode === 4 ? "var(--accent)" : "var(--border)" }}
            >
              4-BIT
            </button>

            <button
              className="btn btn-ghost"
              onClick={() => setPracticeBitMode(8)}
              style={{ borderColor: practiceMode === 8 ? "var(--accent)" : "var(--border)" }}
            >
              8-BIT
            </button>
          </div>

          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            <button
              style={practiceSectionStyle(practiceSection === "sandbox")}
              onClick={() => {
                playSound("click");
                setPracticeSection("sandbox");
              }}
            >
              Sandbox
            </button>

            <button
              style={practiceSectionStyle(practiceSection === "trainer")}
              onClick={() => {
                playSound("click");
                setPracticeSection("trainer");
              }}
            >
              Decimal Trainer
            </button>

            <button
              style={practiceSectionStyle(practiceSection === "table")}
              onClick={() => {
                playSound("click");
                setPracticeSection("table");
              }}
            >
              Counting Table
            </button>
          </div>

          {practiceSection === "sandbox" && (
            <>
              <div style={{ color: "var(--text-dim)", marginBottom: 24, lineHeight: 1.6 }}>
                Click each bit to toggle it between 0 and 1. Each position has a
                place value. Add the active values together to get the decimal number.
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${practiceBits.length}, 1fr)`,
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                {practiceBits.map((bit, index) => {
                  const value = practicePlaceValues[index];
                  const active = bit === 1;

                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          padding: "6px 0",
                          borderRadius: 8,
                          border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                          background: active ? "rgba(0,245,255,0.08)" : "transparent",
                          color: active ? "var(--accent)" : "var(--text-dim)",
                          fontFamily: "monospace",
                          fontSize: "1rem",
                          transition: "all 0.2s",
                        }}
                      >
                        {value}
                      </div>

                      <button
                        onClick={() => togglePracticeBit(index)}
                        style={{
                          width: "100%",
                          padding: "18px 0",
                          borderRadius: 10,
                          border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                          background: active ? "rgba(0,245,255,0.16)" : "var(--surface)",
                          color: active ? "var(--accent)" : "var(--text-dim)",
                          fontSize: "2rem",
                          fontFamily: "monospace",
                          cursor: "pointer",
                          boxShadow: active ? "0 0 18px rgba(0,245,255,0.45)" : "none",
                          transform: active ? "scale(1.04)" : "scale(1)",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {bit}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div
                className="feedback-box correct"
                style={{
                  transform: totalPulse ? "scale(1.03)" : "scale(1)",
                  boxShadow: totalPulse
                    ? "0 0 18px rgba(127,255,0,0.45)"
                    : "none",
                  transition: "all 0.22s ease",
                }}
              >
                <strong>{practiceBits.join("")}</strong>
                <br />
                {practiceWorking} = {practiceDecimal}
              </div>
            </>
          )}

          {practiceSection === "trainer" && (
            <>
              <div style={{ color: "var(--text-dim)", marginBottom: 24, lineHeight: 1.6 }}>
                Toggle the bits until the binary value matches the decimal target.
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${practiceBits.length}, 1fr)`,
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                {practiceBits.map((bit, index) => {
                  const value = practicePlaceValues[index];
                  const active = bit === 1;

                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          padding: "8px 0",
                          borderRadius: 8,
                          border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                          background: active ? "rgba(0,245,255,0.08)" : "transparent",
                          color: active ? "var(--accent)" : "var(--text-dim)",
                          fontFamily: "monospace",
                          transition: "all 0.2s",
                        }}
                      >
                        {value}
                      </div>

                      <button
                        onClick={() => togglePracticeBit(index)}
                        style={{
                          width: "100%",
                          padding: "18px 0",
                          borderRadius: 10,
                          border: `1px solid ${active ? "var(--accent)" : "var(--border)"}`,
                          background: active ? "rgba(0,245,255,0.16)" : "var(--surface)",
                          color: active ? "var(--accent)" : "var(--text-dim)",
                          fontSize: "2rem",
                          fontFamily: "monospace",
                          cursor: "pointer",
                          boxShadow: active ? "0 0 18px rgba(0,245,255,0.45)" : "none",
                          transform: active ? "scale(1.04)" : "scale(1)",
                          transition: "all 0.2s ease",
                        }}
                      >
                        {bit}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div
                style={{
                  marginTop: 24,
                  marginBottom: 20,
                  padding: 18,
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  background: "rgba(0,0,0,0.25)",
                }}
              >
                <div style={{ color: "var(--text-dim)", marginBottom: 10 }}>
                  Convert this decimal number into binary:
                </div>

                <div
                  style={{
                    fontSize: "2rem",
                    color: "var(--accent)",
                    fontFamily: "'Orbitron', sans-serif",
                    marginBottom: 16,
                  }}
                >
                  {practiceTarget}
                </div>

                <div
                  className={`feedback-box ${practiceMatch ? "correct" : "wrong"}`}
                  style={{ marginBottom: 12 }}
                >
                  <strong>{practiceMatch ? "✅ MATCH!" : "❌ NOT MATCHED YET"}</strong>
                </div>

                <button className="btn btn-primary" onClick={() => randomPracticeTarget()}>
                  New Number
                </button>
              </div>
            </>
          )}

          {practiceSection === "table" && (
            <div
              style={{
                marginTop: 24,
                padding: 18,
                border: "1px solid var(--border)",
                borderRadius: 12,
                background: "rgba(0,0,0,0.25)",
              }}
            >
              <div
                style={{
                  fontSize: "0.65rem",
                  color: "var(--accent)",
                  letterSpacing: 3,
                  marginBottom: 12,
                  fontFamily: "'Orbitron', sans-serif",
                }}
              >
                BINARY COUNTING TABLE
              </div>

              <div
                style={{
                  color: "var(--text-dim)",
                  fontSize: "0.8rem",
                  marginBottom: 14,
                  lineHeight: 1.5,
                }}
              >
                This shows how binary counts upward. Your current value is highlighted.
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                  fontFamily: "monospace",
                  fontSize: "0.85rem",
                }}
              >
                <div style={{ color: "var(--text-dim)" }}>Binary</div>
                <div style={{ color: "var(--text-dim)" }}>Decimal</div>

                {practiceTableRows.map((row) => {
                  const active = row.decimal === practiceDecimal;

                  return (
                    <React.Fragment key={row.decimal}>
                      <div
                        style={{
                          padding: "6px 8px",
                          borderRadius: 6,
                          background: active ? "rgba(0,245,255,0.12)" : "transparent",
                          color: active ? "var(--accent)" : "var(--text-dim)",
                        }}
                      >
                        {row.binary}
                      </div>

                      <div
                        style={{
                          padding: "6px 8px",
                          borderRadius: 6,
                          background: active ? "rgba(0,245,255,0.12)" : "transparent",
                          color: active ? "var(--accent)" : "var(--text-dim)",
                        }}
                      >
                        {row.decimal}
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          )}

          <div className="hint-text" style={{ marginTop: 16 }}>
            💡 Example: 1010 means 8 + 2 = 10.
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="game-header">
          <button
            className="btn btn-ghost"
            style={{ padding: "6px 12px", fontSize: "0.7rem" }}
            onClick={() => {
              playSound("click");
              onBack();
            }}
          >
            ← Back
          </button>

          <div className="level-tag">LEVEL 1</div>
          <div className="game-title">Binary to Decimal</div>
          <div className="score-display">
            {score} pts · 🔥 {streak}
          </div>
        </div>

        {showStreakBanner && (
          <div
            style={{
              position: "fixed",
              top: 90,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 999,
              padding: "16px 28px",
              borderRadius: 14,
              border: "2px solid var(--accent3)",
              background: "rgba(20,10,0,0.92)",
              color: "var(--accent3)",
              fontFamily: "'Orbitron', sans-serif",
              letterSpacing: 2,
              fontSize: "1rem",
              boxShadow: "0 0 28px rgba(127,255,0,0.45)",
              animation: "streakPop 1.4s ease",
              pointerEvents: "none",
            }}
          >
            🔥 COMBO BONUS<br />
            <span style={{ fontSize: "1.4rem" }}>{lastBonus}</span>
          </div>
        )}

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="info-box">

          <strong>
            {qIdx < 5
              ? "Beginner Conversion"
              : qIdx < 10
              ? "Advanced Conversion"
              : qIdx < 14
              ? "Decimal Reconstruction"
              : "High Capacity Binary"}
          </strong>

          <br />

          Question {qIdx + 1} of {questions.length} —{" "}
          {q.type === "dec-to-bin"
            ? "Convert this decimal number into binary."
            : "Convert this binary number into decimal."}

        </div>

        <div
          className="code-block"
          style={{
            textAlign: "center",
            borderColor: difficultyTheme.border,
            boxShadow: `0 0 18px ${difficultyTheme.glow}`,
            background: difficultyTheme.bg,
            transition: "all 0.3s ease",
          }}
        >
          <div style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginBottom: 12 }}>
            {q.type === "dec-to-bin" ? "Decimal" : "Binary"}
          </div>

          <div
            style={{
              fontSize: "3rem",
              color: difficultyTheme.border,
              letterSpacing: 8,
              textShadow: `0 0 12px ${difficultyTheme.glow}`,
              transition: "all 0.3s ease",
            }}
          >
            {q.question}
          </div>

          <div style={{ marginTop: 14, fontSize: "0.8rem", color: "var(--text-dim)" }}>
            Use place values to calculate the correct answer.
          </div>
        </div>

        <div className="hint-text">
          💡 Example: 1010 = 1×8 + 0×4 + 1×2 + 0×1 = 10
        </div>

        {q.type === "dec-to-bin" ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(8, 1fr)",
              gap: 10,
              marginBottom: 16,
            }}
          >
            {challengeBits.map((bit, index) => (
              <button
                key={index}
                onClick={() => toggleChallengeBit(index)}
                disabled={answered}
                style={{
                  padding: "16px 0",
                  borderRadius: 10,
                  border: `1px solid ${bit === 1 ? "var(--accent)" : "var(--border)"}`,
                  background: bit === 1 ? "rgba(0,245,255,0.16)" : "var(--surface)",
                  color: bit === 1 ? "var(--accent)" : "var(--text-dim)",
                  fontSize: "1.6rem",
                  fontFamily: "monospace",
                  cursor: answered ? "not-allowed" : "pointer",
                  boxShadow: bit === 1 ? "0 0 18px rgba(0,245,255,0.45)" : "none",
                  transform: bit === 1 ? "scale(1.04)" : "scale(1)",
                  transition: "all 0.2s ease",
                }}
              >
                {bit}
              </button>
            ))}
          </div>
        ) : (
          <div className="adventure-input-row">
            <span className="adventure-prompt">decimal&gt;</span>

            <input
              ref={inputRef}
              className="adventure-input"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && answer.trim() && !answered) {
                  checkAnswer();
                }
              }}
              placeholder="type decimal answer..."
              disabled={answered}
              autoFocus
            />
          </div>
        )}

        {!answered && (
          <button
            className="btn btn-primary"
            onClick={checkAnswer}
            style={{ alignSelf: "flex-start" }}
          >
            Check Answer
          </button>
        )}

        {answered && (
          <>
            <div
              className={`feedback-box ${
                (
                  q.type === "dec-to-bin"
                    ? (challengeBits.join("").replace(/^0+/, "") || "0")
                    : answer.trim()
                ).toLowerCase() === q.answer.toLowerCase()
                  ? "correct"
                  : "wrong"
              }`}
            >
              <strong>
                {(
                  q.type === "dec-to-bin"
                    ? (challengeBits.join("").replace(/^0+/, "") || "0")
                    : answer.trim()
                ).toLowerCase() === q.answer.toLowerCase()
                  ? "✅ Correct!"
                  : `❌ Not quite — answer was ${q.answer}`}
              </strong>

              <br />
              {q.explanation}

              {lastBonus && (
                <>
                  <br />
                  <br />
                  <strong style={{ color: "var(--accent3)" }}>
                    {lastBonus}
                  </strong>
                </>
              )}
            </div>

            <button
              className="btn btn-primary"
              onClick={() => {
                playSound("click");
                next();
              }}
              style={{ alignSelf: "flex-end" }}
            >
              {qIdx + 1 >= questions.length ? "See Results →" : "Next →"}
            </button>
          </>
        )}
      </>
    )}
  </div>
);
}