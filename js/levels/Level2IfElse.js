// ── LEVEL 2 – IF/ELSE QUESTIONS GENERATOR───────────────
// ── LEVEL 2 – IF/ELSE QUESTION GENERATOR ───────────────
function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function makeComparisonQuestion({
  contextIcon,
  contextText,
  variableName,
  value,
  threshold,
  trueMessage,
  falseMessage,
  operator,
}) {
  const correctCondition = `${variableName} ${operator} ${threshold}`;

  const wrongOptions = [
    `${variableName} > ${threshold}`,
    `${variableName} >= ${threshold}`,
    `${variableName} < ${threshold}`,
    `${variableName} <= ${threshold}`,
    `${variableName} == ${threshold}`,
    `${variableName} != ${threshold}`,
  ].filter((option) => option !== correctCondition);

  return {
    context: `${contextIcon} ${contextText}`,
    code: [
      { text: `${variableName} = ${value}`, type: "normal" },
      { text: "", type: "blank-line" },
      { text: "if _____ :", type: "has-blank", blankIdx: 0 },
      { text: `  print("${trueMessage}")`, type: "normal" },
      { text: "else:", type: "normal" },
      { text: `  print("${falseMessage}")`, type: "normal" },
    ],
    options: shuffleArray([
      correctCondition,
      ...shuffleArray(wrongOptions).slice(0, 3),
    ]),
    correctAnswers: [correctCondition],
    explanation: `${correctCondition} is the condition needed for this scenario.`,
  };
}

function generateIfElseQuestions() {
  const templates = [
    () => {
      const threshold = 18;
      const value = Math.floor(Math.random() * 10) + 14;
      const operator = randomFrom([">=", ">"]);
      return makeComparisonQuestion({
        contextIcon: "🗳️",
        contextText: `Voting app: age is ${value}. Choose the condition for being old enough to vote.`,
        variableName: "age",
        value,
        threshold,
        operator,
        trueMessage: "You can vote!",
        falseMessage: "Too young to vote.",
      });
    },

    () => {
      const threshold = randomFrom([40, 50, 60]);
      const value = Math.floor(Math.random() * 61) + 30;
      const operator = randomFrom([">=", ">"]);
      return makeComparisonQuestion({
        contextIcon: "📝",
        contextText: `Exam system: score is ${value}. Choose the condition for passing the test.`,
        variableName: "score",
        value,
        threshold,
        operator,
        trueMessage: "You passed!",
        falseMessage: "Try again.",
      });
    },

    () => {
      const threshold = randomFrom([25, 30, 35]);
      const value = Math.floor(Math.random() * 26) + 15;
      const operator = randomFrom([">", ">="]);
      return makeComparisonQuestion({
        contextIcon: "🌡️",
        contextText: `Weather app: temperature is ${value}. Choose the condition for hot weather.`,
        variableName: "temperature",
        value,
        threshold,
        operator,
        trueMessage: "It is hot outside!",
        falseMessage: "Nice weather.",
      });
    },

    () => {
      const lives = Math.floor(Math.random() * 4);
      const correctCondition = randomFrom(["lives == 0", "lives <= 0"]);
      return {
        context: `🎮 Game system: lives is ${lives}. Choose the condition for game over.`,
        code: [
          { text: `lives = ${lives}`, type: "normal" },
          { text: "", type: "blank-line" },
          { text: "if _____ :", type: "has-blank", blankIdx: 0 },
          { text: '  print("Game over!")', type: "normal" },
          { text: "else:", type: "normal" },
          { text: '  print("Keep playing!")', type: "normal" },
        ],
        options: shuffleArray([
          correctCondition,
          "lives > 0",
          "lives >= 1",
          "lives != 0",
        ]),
        correctAnswers: [correctCondition],
        explanation: `${correctCondition} checks whether the player has run out of lives.`,
      };
    },

    () => {
      const password = randomFrom(["abc123", "dragon", "admin42", "pizza"]);
      const userInput = Math.random() < 0.5 ? password : randomFrom(["wrong", "guest", "test"]);
      const correctCondition = randomFrom([
        "user_input == password",
        "password == user_input",
      ]);

      return {
        context: "🔐 Login system: choose the condition that checks whether the password is correct.",
        code: [
          { text: `password = '${password}'`, type: "normal" },
          { text: `user_input = '${userInput}'`, type: "normal" },
          { text: "", type: "blank-line" },
          { text: "if _____ :", type: "has-blank", blankIdx: 0 },
          { text: '  print("Access granted!")', type: "normal" },
          { text: "else:", type: "normal" },
          { text: '  print("Wrong password.")', type: "normal" },
        ],
        options: shuffleArray([
          correctCondition,
          "user_input = password",
          "user_input != password",
          "password < user_input",
        ]),
        correctAnswers: [correctCondition],
        explanation: "Use == to compare values. A single = assigns a value and would be a bug.",
      };
    },

    () => {
      const isRaining = Math.random() < 0.5;
      const hasUmbrella = Math.random() < 0.5;

      return {
        context: "🌧️ Weather app: warn the user if it is raining and they do not have an umbrella.",
        code: [
          { text: `is_raining = ${isRaining ? "True" : "False"}`, type: "normal" },
          { text: `has_umbrella = ${hasUmbrella ? "True" : "False"}`, type: "normal" },
          { text: "", type: "blank-line" },
          { text: "if _____ :", type: "has-blank", blankIdx: 0 },
          { text: '  print("You will get wet!")', type: "normal" },
          { text: "else:", type: "normal" },
          { text: '  print("You are fine!")', type: "normal" },
        ],
        options: shuffleArray([
          "is_raining and not has_umbrella",
          "is_raining or has_umbrella",
          "not is_raining",
          "has_umbrella == True",
        ]),
        correctAnswers: ["is_raining and not has_umbrella"],
        explanation: "This needs both parts: it is raining AND the user does not have an umbrella.",
      };
    },
  ];

  return shuffleArray(templates).map((makeQuestion) => makeQuestion());
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