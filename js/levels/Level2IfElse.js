// ── LEVEL 2 – IF/ELSE QUESTIONS GENERATOR───────────────
// ── LEVEL 2 – IF/ELSE QUESTION GENERATOR ───────────────
function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function generateIfElseQuestions() {
  const questions = [];

  const age = Math.floor(Math.random() * 8) + 14;
  questions.push({
    tier: 1,
    context: `🗳️ You're building a voting app. The user entered age = ${age}. Check if they are old enough to vote.`,
    code: [
      { text: `age = ${age}`, type: "normal" },
      { text: "", type: "blank-line" },
      { text: "if _____ :", type: "has-blank", blankIdx: 0 },
      { text: '  print("You can vote!")', type: "normal" },
      { text: "else:", type: "normal" },
      { text: '  print("Too young to vote.")', type: "normal" },
    ],
    options: ["age > 18", "age >= 18", "age == 18", "age < 18"],
    correctAnswers: ["age >= 18"],
    explanation: "age >= 18 means 18 or older. This is the correct voting-age check.",
  });

  const score = Math.floor(Math.random() * 51) + 40;
  questions.push({
    tier: 1,
    context: `📝 A student scored ${score}. They need 50 or more to pass.`,
    code: [
      { text: `score = ${score}`, type: "normal" },
      { text: "", type: "blank-line" },
      { text: "if _____ :", type: "has-blank", blankIdx: 0 },
      { text: '  print("You passed!")', type: "normal" },
      { text: "else:", type: "normal" },
      { text: '  print("Try again.")', type: "normal" },
    ],
    options: ["score > 100", "score >= 50", "score == 0", "score < 50"],
    correctAnswers: ["score >= 50"],
    explanation: "score >= 50 checks whether the score is 50 or higher.",
  });

  const temperature = Math.floor(Math.random() * 21) + 20;
  questions.push({
    tier: 1,
    context: `🌡️ A weather app checks if temperature = ${temperature} is hot. The warning threshold is above 30.`,
    code: [
      { text: `temperature = ${temperature}`, type: "normal" },
      { text: "", type: "blank-line" },
      { text: "if _____ :", type: "has-blank", blankIdx: 0 },
      { text: '  print("It is hot outside!")', type: "normal" },
      { text: "else:", type: "normal" },
      { text: '  print("Nice weather.")', type: "normal" },
    ],
    options: ["temperature > 30", "temperature < 30", "temperature == 0", "temperature > 100"],
    correctAnswers: ["temperature > 30"],
    explanation: "temperature > 30 is true only when the value is above 30.",
  });

  const password = randomFrom(["abc123", "dragon", "admin42", "pizza"]);
  questions.push({
    tier: 2,
    context: "🔐 You're building a login system. Compare the user's input with the saved password.",
    code: [
      { text: `password = '${password}'`, type: "normal" },
      { text: `user_input = '${password}'`, type: "normal" },
      { text: "", type: "blank-line" },
      { text: "if _____ :", type: "has-blank", blankIdx: 0 },
      { text: '  print("Access granted!")', type: "normal" },
      { text: "else:", type: "normal" },
      { text: '  print("Wrong password.")', type: "normal" },
    ],
    options: ["user_input == password", "user_input = password", "user_input != password", "password < user_input"],
    correctAnswers: ["user_input == password"],
    explanation: "Use == to compare values. A single = is assignment, not comparison.",
  });

  const lives = Math.floor(Math.random() * 3);
  questions.push({
    tier: 2,
    context: `🎮 A game checks lives = ${lives}. Game over should happen only when lives is 0.`,
    code: [
      { text: `lives = ${lives}`, type: "normal" },
      { text: "", type: "blank-line" },
      { text: "if _____ :", type: "has-blank", blankIdx: 0 },
      { text: '  print("Game over!")', type: "normal" },
      { text: "else:", type: "normal" },
      { text: '  print("Keep playing!")', type: "normal" },
    ],
    options: ["lives == 0", "lives > 0", "lives >= 1", "lives != 0"],
    correctAnswers: ["lives == 0"],
    explanation: "lives == 0 checks whether the player has no lives left.",
  });

  const isRaining = Math.random() < 0.5;
  const hasUmbrella = Math.random() < 0.5;
  questions.push({
    tier: 3,
    context: "🌧️ A weather app warns users if it is raining and they do not have an umbrella.",
    code: [
      { text: `is_raining = ${isRaining ? "True" : "False"}`, type: "normal" },
      { text: `has_umbrella = ${hasUmbrella ? "True" : "False"}`, type: "normal" },
      { text: "", type: "blank-line" },
      { text: "if _____ :", type: "has-blank", blankIdx: 0 },
      { text: '  print("You will get wet!")', type: "normal" },
      { text: "else:", type: "normal" },
      { text: '  print("You are fine!")', type: "normal" },
    ],
    options: [
      "is_raining and not has_umbrella",
      "is_raining or has_umbrella",
      "not is_raining",
      "has_umbrella == True",
    ],
    correctAnswers: ["is_raining and not has_umbrella"],
    explanation: "This needs both parts: it is raining AND the user does not have an umbrella.",
  });

  return questions.sort(() => Math.random() - 0.5);
}

// ── LEVEL 2 – IF/ELSE ─────────────────────────
function Level2({ onComplete, onBack, onAchievement }) {
  const [started, setStarted] = useState(false);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [mistakes, setMistakes] = useState(0); // ── NEW
  const [firstCorrect, setFirstCorrect] = useState(false); // ── NEW

  const [questions] = useState(() => generateIfElseQuestions());

  const q = questions[qIdx];
  const progress = (qIdx / questions.length) * 100;

  function choose(opt) {
    if (answered) return;
    playSound(q.correctAnswers.includes(opt) ? "correct" : "wrong"); // ── NEW
    setSelected(opt);
    setAnswered(true);
    if (q.correctAnswers.includes(opt)) {
      setScore((s) => s + 100);
      // ── First Blood achievement ──
      if (!firstCorrect) {
        setFirstCorrect(true);
        onAchievement("first_blood");
      }
    } else {
      setMistakes((m) => m + 1); // ── NEW
    }
  }

  function next() {
    if (qIdx + 1 >= questions.length) {
      setDone(true);
    } else {
      setQIdx((i) => i + 1);
      setSelected(null);
      setAnswered(false);
    }
  }

  const isCorrect = answered && q.correctAnswers.includes(selected);

  if (!started) {
    return (
      <div className="screen">
        <div className="victory-card">
          <div className="victory-title">IF / ELSE</div>

          <div style={{ color: "var(--text-dim)", marginBottom: 16 }}>
            Complete Python if/else statements by choosing the condition that makes the code behave correctly.
          </div>

          <div className="info-box" style={{ textAlign: "left" }}>
            <strong>How it works:</strong>
            <br /><br />
            Read the scenario, inspect the Python code, then choose the missing condition.
            <br /><br />
            Example:
            <br />
            <span style={{ color: "var(--accent3)" }}>
              if age &gt;= 18:
            </span>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;print("You can vote!")
            <br />
            else:
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;print("Too young.")
          </div>

          <button className="btn btn-primary" onClick={() => setStarted(true)}>
            Start Level →
          </button>
        </div>
      </div>
    );
  }

  if (done) {
    const stars = score >= 300 ? "⭐⭐⭐" : score >= 200 ? "⭐⭐" : "⭐";
    return (
      <div className="screen">
        <div className="victory-card">
          <div className="victory-title">LEVEL COMPLETE!</div>
          <div className="stars">{stars}</div>
          <div style={{ color: "var(--text-dim)", marginBottom: 8 }}>
            If / Else mastered
          </div>
          <div className="victory-score">{score} pts</div>
          <div
            style={{
              color: "var(--text-dim)",
              fontSize: "0.8rem",
              marginBottom: 24,
            }}
          >
            You correctly matched boolean conditions to expected outputs 🎉
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
      <div className="game-header">
        <button
          className="btn btn-ghost"
          style={{ padding: "6px 12px", fontSize: "0.7rem" }}
          onClick={onBack}
        >
          ← Back
        </button>
        <div className="level-tag">LEVEL 2</div>
        <div className="game-title">If / Else</div>
        <div className="score-display">{score} pts</div>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="info-box">
        Question {qIdx + 1} of {questions.length} — Fill in the blank to
        make the code work correctly
      </div>

      <div className="code-block">
        <div style={{ height: 20 }} />
        <div
          style={{
            fontSize: "0.96rem",
            color: "var(--text-dim)",
            marginBottom: 16,
            paddingBottom: 12,
            borderBottom: "1px solid rgba(255,255,255,0.07)",
            lineHeight: 1.5,
          }}
        >
          {q.context}
        </div>
        {q.code.map((line, i) => {
          if (line.type === "blank-line")
            return <div key={i} style={{ height: 4 }} />;
          if (line.type === "has-blank") {
            const parts = line.text.split("_____");
            return (
              <div className="code-line" key={i}>
                <span className="kw">
                  {parts[0].includes("if") ? "if " : parts[0]}
                </span>
                <span className="blank">{selected || "?"}</span>
                <span>{parts[1]}</span>
              </div>
            );
          }
          return (
            <div className="code-line" key={i}>
              <span
                dangerouslySetInnerHTML={{
                  __html: line.text
                    .replace(
                      /(if|else|print|True|False|and|or|not)/g,
                      "<span class='kw'>$1</span>",
                    )
                    .replace(/(".*?")/g, "<span class='str'>$1</span>")
                    .replace(/(\d+)/g, "<span class='num'>$1</span>"),
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="hint-text">
        💡 Pick the condition that goes inside the{" "}
        <span style={{ color: "var(--accent)" }}>if</span> statement:
      </div>

      <div className="options-grid">
        {q.options.map((opt) => {
          let cls = "option-btn";
          if (answered) {
            if (q.correctAnswers.includes(opt)) cls += " correct";
            else if (opt === selected) cls += " wrong";
          }
          return (
            <button key={opt} className={cls} onClick={() => choose(opt)}>
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={`feedback-box ${isCorrect ? "correct" : "wrong"}`}>
          <strong>{isCorrect ? "✅ Correct!" : "❌ Not quite!"}</strong>
          <br />
          {q.explanation}
        </div>
      )}

      {answered && (
        <button
          className="btn btn-primary"
          onClick={next}
          style={{ alignSelf: "flex-end" }}
        >
          {qIdx + 1 >= questions.length ? "See Results →" : "Next →"}
        </button>
      )}
    </div>
  );
}