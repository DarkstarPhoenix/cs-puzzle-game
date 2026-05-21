// ── LEVEL 1 - BINARY TO DECIMAL QUESTIONS ───────────────
function generateBinaryQuestions() {
  const questions = [];
  const used = new Set();

  // ── 10 BIN → DEC QUESTIONS ──────────────────
  for (let i = 0; i < 10; i++) {

    let num;

    // final binary question = 9 bit firewall prep
    if (i === 9) {
      num = Math.floor(Math.random() * 512);
    }

    // medium difficulty
    else if (i >= 5) {
      num = Math.floor(Math.random() * 256);
    }

    // easier opening questions
    else {
      num = Math.floor(Math.random() * 16);
    }

    while (used.has(`bin-${num}`)) {
      num++;
    }

    used.add(`bin-${num}`);

    const binary = num.toString(2);

    const bits = binary.split("").reverse();

    const explanationParts = bits.map((bit, idx) => {
      const value = 2 ** idx;
      return `${bit}×${value}`;
    });

    questions.push({
      type: "bin-to-dec",
      question: binary,
      answer: String(num),
      explanation:
        `${binary} = ` +
        `${explanationParts.reverse().join(" + ")} = ${num}`,
    });
  }

  // ── 5 DEC → BIN QUESTIONS ──────────────────
  for (let i = 0; i < 5; i++) {

    let num = Math.floor(Math.random() * 64) + 1;

    while (used.has(`dec-${num}`)) {
      num++;
    }

    used.add(`dec-${num}`);

    questions.push({
      type: "dec-to-bin",
      question: String(num),
      answer: num.toString(2),
      explanation:
        `${num} in binary is ${num.toString(2)}`,
    });
  }

  return questions;
}
  
// ── LEVEL 1 – BINARY TO DECIMAL ───────────────
function Level1({ onComplete, onBack, onAchievement }) {
  const [started, setStarted] = useState(false);
  const [tab, setTab] = useState("practice");
  const [questions] = useState(() => generateBinaryQuestions());
  const [qIdx, setQIdx] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [done, setDone] = useState(false);
  const [firstCorrect, setFirstCorrect] = useState(false);
  const [practiceBits, setPracticeBits] = useState([0, 0, 0, 0]);
  const [practiceMode, setPracticeMode] = useState(4);

  const inputRef = useRef(null);

  const q = questions[qIdx];
  const progress = (qIdx / questions.length) * 100;

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

  function setPracticeBitMode(bits) {
    setPracticeMode(bits);

    if (bits === 8) {
      setPracticeBits([0, 0, 0, 0, 0, 0, 0, 0]);
    } else {
      setPracticeBits([0, 0, 0, 0]);
    }

    playSound("click");
  }

  function togglePracticeBit(index) {
    setPracticeBits(bits =>
      bits.map((bit, i) => i === index ? (bit === 0 ? 1 : 0) : bit)
    );

    playSound("click");
  }

  function checkAnswer() {
    if (answered) return;

    const userValue = answer.trim();
    const correct =
      userValue.toLowerCase() === q.answer.toLowerCase();

    setAnswered(true);
    playSound(correct ? "correct" : "wrong");

    if (correct) {
      setScore(s => s + 100);

      if (!firstCorrect) {
        setFirstCorrect(true);
        if (onAchievement) onAchievement("first_blood");
      }
    } else {
      setMistakes(m => m + 1);
    }
  }

  function next() {
    if (qIdx + 1 >= questions.length) {
      setDone(true);
    } else {
      setQIdx(i => i + 1);
      setAnswer("");
      setAnswered(false);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }

  if (done) {
    const stars = score >= 500 ? "⭐⭐⭐" : score >= 300 ? "⭐⭐" : "⭐";

    return (
      <div className="screen">
        <div className="victory-card">
          <div className="victory-title">LEVEL COMPLETE!</div>
          <div className="stars">{stars}</div>
          <div style={{ color: "var(--text-dim)", marginBottom: 8 }}>
            Binary conversion mastered
          </div>
          <div className="victory-score">{score} pts</div>
          <div style={{ color: "var(--text-dim)", fontSize: "0.8rem", marginBottom: 24 }}>
            You converted binary values into decimal numbers.
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button className="btn btn-ghost" onClick={onBack}>
              ← Menu
            </button>
            <button
              className="btn btn-primary"
              onClick={() => onComplete(score, mistakes)}
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
        onClick={() => setTab("practice")}
      >
        Practice
      </button>

      <button
        style={tabStyle(tab === "challenge")}
        onClick={() => setTab("challenge")}
      >
        Challenge
      </button>
    </div>

    {tab === "practice" ? (

      <>
          <div className="game-header">

            <button
              className="btn btn-ghost"
              style={{ padding: "6px 12px", fontSize: "0.7rem" }}
              onClick={onBack}
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

        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <button
            className="btn btn-ghost"
            onClick={() => setPracticeBitMode(4)}
            style={{
              borderColor:
                practiceMode === 4
                  ? "var(--accent)"
                  : "var(--border)",
            }}
          >
            4-BIT
          </button>

          <button
            className="btn btn-ghost"
            onClick={() => setPracticeBitMode(8)}
            style={{
              borderColor:
                practiceMode === 8
                  ? "var(--accent)"
                  : "var(--border)",
            }}
          >
            8-BIT
          </button>
        </div>

        <div
          style={{
            color: "var(--text-dim)",
            marginBottom: 24,
            lineHeight: 1.6,
          }}
        >
          Click each bit to toggle it between 0 and 1. Each position has a
          place value. Add the active values together to get the decimal
          number.
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            marginBottom: 16,
          }}
        >
          {practiceBits.map((bit, index) => (
            <button
              key={index}
              onClick={() => togglePracticeBit(index)}
              style={{
                padding: "18px 0",
                borderRadius: 10,
                border: `1px solid ${
                  bit === 1 ? "var(--accent)" : "var(--border)"
                }`,
                background:
                  bit === 1
                    ? "rgba(0,245,255,0.12)"
                    : "var(--surface)",
                color:
                  bit === 1
                    ? "var(--accent)"
                    : "var(--text-dim)",
                fontSize: "2rem",
                fontFamily: "monospace",
                cursor: "pointer",
              }}
            >
              {bit}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            marginBottom: 24,
            color: "var(--text-dim)",
            fontFamily: "monospace",
          }}
        >
          {practicePlaceValues.map((value) => (
            <div key={value}>value {value}</div>
          ))}
        </div>

        <div className="feedback-box correct">
          <strong>{practiceBits.join("")}</strong>
          <br />
          {practiceWorking} = {practiceDecimal}
        </div>

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
            onClick={onBack}
          >
            ← Back
          </button>

          <div className="level-tag">LEVEL 1</div>
          <div className="game-title">Binary to Decimal</div>
          <div className="score-display">{score} pts</div>

        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="info-box">
          Question {qIdx + 1} of {questions.length} — {
            q.type === "dec-to-bin"
              ? "Convert this decimal number into binary."
              : "Convert this binary number into decimal."
          }
        </div>

        <div className="code-block" style={{ textAlign: "center" }}>

          <div
            style={{
              fontSize: "0.75rem",
              color: "var(--text-dim)",
              marginBottom: 12,
            }}
          >
            {q.type === "dec-to-bin" ? "Decimal" : "Binary"}
          </div>

          <div
            style={{
              fontSize: "3rem",
              color: "var(--accent)",
              letterSpacing: 8,
            }}
          >
            {q.question}
          </div>

          <div
            style={{
              marginTop: 14,
              fontSize: "0.8rem",
              color: "var(--text-dim)",
            }}
          >
            Use place values: 8, 4, 2, 1 for 4-bit numbers.
          </div>

        </div>

        <div className="hint-text">
          💡 Example: 1010 = 1×8 + 0×4 + 1×2 + 0×1 = 10
        </div>

        <div className="adventure-input-row">

          <span className="adventure-prompt">
            {q.type === "dec-to-bin" ? "binary>" : "decimal>"}
          </span>

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
            placeholder={
              q.type === "dec-to-bin"
                ? "type binary answer..."
                : "type decimal answer..."
            }
            disabled={answered}
            autoFocus
          />

        </div>

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
                answer.trim().toLowerCase() ===
                q.answer.toLowerCase()
                  ? "correct"
                  : "wrong"
              }`}
            >
              <strong>
                {
                  answer.trim().toLowerCase() ===
                  q.answer.toLowerCase()
                    ? "✅ Correct!"
                    : `❌ Not quite — answer was ${q.answer}`
                }
              </strong>

              <br />

              {q.explanation}
            </div>

            <button
              className="btn btn-primary"
              onClick={next}
              style={{ alignSelf: "flex-end" }}
            >
              {qIdx + 1 >= questions.length
                ? "See Results →"
                : "Next →"}
            </button>
          </>

        )}

      </>

    )}

  </div>
);
}