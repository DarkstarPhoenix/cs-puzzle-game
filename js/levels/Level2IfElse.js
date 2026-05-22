// ── LEVEL 2 – IF/ELSE QUESTIONS GENERATOR───────────────
// ── LEVEL 2 – IF/ELSE QUESTION GENERATOR ───────────────
// ── LEVEL 2 – IF / ELSE + LOOPS QUESTION GENERATOR ───────────────
function randomFrom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function makeIfElseOutputQuestion({
  context,
  variableLine,
  condition,
  trueMessage,
  falseMessage,
  correctOutput,
  explanation,
}) {
  return {
    type: "if-else-output",
    tier: 1,
    context,
    code: [
      { text: variableLine, type: "normal" },
      { text: "", type: "blank-line" },
      { text: `if ${condition}:`, type: "normal" },
      { text: `  print("${trueMessage}")`, type: "normal" },
      { text: "else:", type: "normal" },
      { text: `  print("${falseMessage}")`, type: "normal" },
    ],
    options: shuffleArray([trueMessage, falseMessage]),
    correctAnswers: [correctOutput],
    explanation,
  };
}

function makeMissingConditionQuestion({
  context,
  variableLine,
  correctCondition,
  trueMessage,
  falseMessage,
  wrongOptions,
  explanation,
}) {
  return {
    type: "missing-condition",
    tier: 2,
    context,
    code: [
      { text: variableLine, type: "normal" },
      { text: "", type: "blank-line" },
      { text: "if _____:", type: "has-blank", blankIdx: 0 },
      { text: `  print("${trueMessage}")`, type: "normal" },
      { text: "else:", type: "normal" },
      { text: `  print("${falseMessage}")`, type: "normal" },
    ],
    options: shuffleArray([
      correctCondition,
      ...shuffleArray(wrongOptions).slice(0, 3),
    ]),
    correctAnswers: [correctCondition],
    explanation,
  };
}

function makeElifOutputQuestion({
  context,
  variableLine,
  ifCondition,
  elifCondition,
  ifMessage,
  elifMessage,
  elseMessage,
  correctOutput,
  explanation,
}) {
  return {
    type: "elif-output",
    tier: 3,
    context,
    code: [
      { text: variableLine, type: "normal" },
      { text: "", type: "blank-line" },
      { text: `if ${ifCondition}:`, type: "normal" },
      { text: `  print("${ifMessage}")`, type: "normal" },
      { text: `elif ${elifCondition}:`, type: "normal" },
      { text: `  print("${elifMessage}")`, type: "normal" },
      { text: "else:", type: "normal" },
      { text: `  print("${elseMessage}")`, type: "normal" },
    ],
    options: shuffleArray([ifMessage, elifMessage, elseMessage]),
    correctAnswers: [correctOutput],
    explanation,
  };
}

function makeLoopOutputQuestion({
  context,
  codeLines,
  options,
  correctOutput,
  explanation,
}) {
  return {
    type: "loop-output",
    tier: 4,
    context,
    code: codeLines.map((text) =>
      text === "" ? { text: "", type: "blank-line" } : { text, type: "normal" }
    ),
    options: shuffleArray(options),
    correctAnswers: [correctOutput],
    explanation,
  };
}

function makeBreakContinueQuestion({
  context,
  codeLines,
  options,
  correctOutput,
  explanation,
}) {
  return {
    type: "break-continue",
    tier: 5,
    context,
    code: codeLines.map((text) =>
      text === "" ? { text: "", type: "blank-line" } : { text, type: "normal" }
    ),
    options: shuffleArray(options),
    correctAnswers: [correctOutput],
    explanation,
  };
}

function generateTier1IfElseQuestions() {
  const questions = [];

  const age = Math.floor(Math.random() * 8) + 14;
  questions.push(
    makeIfElseOutputQuestion({
      context: "🗳️ Read the code. Which message will be printed?",
      variableLine: `age = ${age}`,
      condition: "age >= 18",
      trueMessage: "You can vote!",
      falseMessage: "Too young to vote.",
      correctOutput: age >= 18 ? "You can vote!" : "Too young to vote.",
      explanation: `age is ${age}. The condition age >= 18 is ${
        age >= 18 ? "TRUE, so the if branch runs." : "FALSE, so the else branch runs."
      }`,
    })
  );

  const score = Math.floor(Math.random() * 61) + 30;
  questions.push(
    makeIfElseOutputQuestion({
      context: "📝 Read the code. Which message will be printed?",
      variableLine: `score = ${score}`,
      condition: "score >= 50",
      trueMessage: "You passed!",
      falseMessage: "Try again.",
      correctOutput: score >= 50 ? "You passed!" : "Try again.",
      explanation: `score is ${score}. The condition score >= 50 is ${
        score >= 50 ? "TRUE, so the if branch runs." : "FALSE, so the else branch runs."
      }`,
    })
  );

  const temperature = Math.floor(Math.random() * 26) + 15;
  questions.push(
    makeIfElseOutputQuestion({
      context: "🌡️ Read the code. Which message will be printed?",
      variableLine: `temperature = ${temperature}`,
      condition: "temperature > 30",
      trueMessage: "It is hot outside!",
      falseMessage: "Nice weather.",
      correctOutput: temperature > 30 ? "It is hot outside!" : "Nice weather.",
      explanation: `temperature is ${temperature}. The condition temperature > 30 is ${
        temperature > 30 ? "TRUE, so the if branch runs." : "FALSE, so the else branch runs."
      }`,
    })
  );

  const lives = Math.floor(Math.random() * 4);
  questions.push(
    makeIfElseOutputQuestion({
      context: "🎮 Read the code. Which message will be printed?",
      variableLine: `lives = ${lives}`,
      condition: "lives == 0",
      trueMessage: "Game over!",
      falseMessage: "Keep playing!",
      correctOutput: lives === 0 ? "Game over!" : "Keep playing!",
      explanation: `lives is ${lives}. The condition lives == 0 is ${
        lives === 0 ? "TRUE, so the if branch runs." : "FALSE, so the else branch runs."
      }`,
    })
  );

  const battery = Math.floor(Math.random() * 101);
  questions.push(
    makeIfElseOutputQuestion({
      context: "🔋 Read the code. Which message will be printed?",
      variableLine: `battery = ${battery}`,
      condition: "battery < 20",
      trueMessage: "Low battery!",
      falseMessage: "Battery OK.",
      correctOutput: battery < 20 ? "Low battery!" : "Battery OK.",
      explanation: `battery is ${battery}. The condition battery < 20 is ${
        battery < 20 ? "TRUE, so the if branch runs." : "FALSE, so the else branch runs."
      }`,
    })
  );

  return shuffleArray(questions);
}

function generateTier2MissingConditionQuestions() {
  const questions = [];

  const score = Math.floor(Math.random() * 61) + 30;
  questions.push(
    makeMissingConditionQuestion({
      context: "📝 Choose the condition that passes the student when score is 50 or more.",
      variableLine: `score = ${score}`,
      correctCondition: "score >= 50",
      trueMessage: "You passed!",
      falseMessage: "Try again.",
      wrongOptions: ["score > 100", "score < 50", "score == 0", "score != 50"],
      explanation: "score >= 50 means the student passes with 50 or more.",
    })
  );

  const age = Math.floor(Math.random() * 8) + 14;
  questions.push(
    makeMissingConditionQuestion({
      context: "🗳️ Choose the condition that allows voting from age 18 upwards.",
      variableLine: `age = ${age}`,
      correctCondition: "age >= 18",
      trueMessage: "You can vote!",
      falseMessage: "Too young to vote.",
      wrongOptions: ["age > 18", "age < 18", "age == 16", "age != 18"],
      explanation: "age >= 18 includes 18 and every age above 18.",
    })
  );

  const temperature = Math.floor(Math.random() * 26) + 15;
  questions.push(
    makeMissingConditionQuestion({
      context: "🌡️ Choose the condition that detects hot weather above 30 degrees.",
      variableLine: `temperature = ${temperature}`,
      correctCondition: "temperature > 30",
      trueMessage: "It is hot outside!",
      falseMessage: "Nice weather.",
      wrongOptions: [
        "temperature < 30",
        "temperature == 30",
        "temperature > 100",
        "temperature != 30",
      ],
      explanation: "temperature > 30 is true only when the temperature is above 30.",
    })
  );

  const battery = Math.floor(Math.random() * 101);
  questions.push(
    makeMissingConditionQuestion({
      context: "🔋 Choose the condition that detects a low battery below 20%.",
      variableLine: `battery = ${battery}`,
      correctCondition: "battery < 20",
      trueMessage: "Low battery!",
      falseMessage: "Battery OK.",
      wrongOptions: ["battery > 20", "battery == 100", "battery >= 20", "battery != 20"],
      explanation: "battery < 20 means the warning appears only below 20%.",
    })
  );

  const lives = Math.floor(Math.random() * 4);
  questions.push(
    makeMissingConditionQuestion({
      context: "🎮 Choose the condition that triggers game over when the player has no lives.",
      variableLine: `lives = ${lives}`,
      correctCondition: "lives == 0",
      trueMessage: "Game over!",
      falseMessage: "Keep playing!",
      wrongOptions: ["lives > 0", "lives >= 1", "lives != 0", "lives < 0"],
      explanation: "lives == 0 checks whether the player has exactly zero lives.",
    })
  );

  return shuffleArray(questions);
}

function generateTier3ElifQuestions() {
  const questions = [];

  const score = Math.floor(Math.random() * 101);
  questions.push(
    makeElifOutputQuestion({
      context: "🏆 Read the if / elif / else chain. Which grade message is printed?",
      variableLine: `score = ${score}`,
      ifCondition: "score >= 70",
      elifCondition: "score >= 50",
      ifMessage: "Distinction",
      elifMessage: "Pass",
      elseMessage: "Fail",
      correctOutput:
        score >= 70 ? "Distinction" : score >= 50 ? "Pass" : "Fail",
      explanation: `score is ${score}. Python checks from top to bottom and stops at the first TRUE branch.`,
    })
  );

  const temperature = Math.floor(Math.random() * 41);
  questions.push(
    makeElifOutputQuestion({
      context: "🌡️ Read the if / elif / else chain. Which weather message is printed?",
      variableLine: `temperature = ${temperature}`,
      ifCondition: "temperature >= 30",
      elifCondition: "temperature <= 10",
      ifMessage: "Hot",
      elifMessage: "Cold",
      elseMessage: "Mild",
      correctOutput:
        temperature >= 30 ? "Hot" : temperature <= 10 ? "Cold" : "Mild",
      explanation: `temperature is ${temperature}. The first true branch is the one that prints.`,
    })
  );

  const battery = Math.floor(Math.random() * 101);
  questions.push(
    makeElifOutputQuestion({
      context: "🔋 Read the if / elif / else chain. Which battery warning is printed?",
      variableLine: `battery = ${battery}`,
      ifCondition: "battery < 10",
      elifCondition: "battery < 30",
      ifMessage: "Critical battery",
      elifMessage: "Low battery",
      elseMessage: "Battery OK",
      correctOutput:
        battery < 10 ? "Critical battery" : battery < 30 ? "Low battery" : "Battery OK",
      explanation: `battery is ${battery}. If the first condition is false, Python checks the elif next.`,
    })
  );

  return shuffleArray(questions);
}

function generateTier4LoopQuestions() {
  const questions = [];

  const limit = Math.floor(Math.random() * 3) + 3; // 3 to 5
  questions.push(
    makeLoopOutputQuestion({
      context: "🔁 Read the for loop. What is printed last?",
      codeLines: [
        `for i in range(${limit}):`,
        `  print(i)`,
      ],
      options: ["0", "1", String(limit - 1), String(limit)],
      correctOutput: String(limit - 1),
      explanation: `range(${limit}) starts at 0 and stops before ${limit}, so the last printed value is ${limit - 1}.`,
    })
  );

  const start = Math.floor(Math.random() * 3) + 1; // 1 to 3
  const end = start + 3;
  questions.push(
    makeLoopOutputQuestion({
      context: "🔁 Read the while loop. What is printed last?",
      codeLines: [
        `count = ${start}`,
        "",
        `while count < ${end}:`,
        `  print(count)`,
        `  count += 1`,
      ],
      options: [
        String(start),
        String(end - 1),
        String(end),
        String(start + 1),
      ],
      correctOutput: String(end - 1),
      explanation: `The loop runs while count is less than ${end}. It stops before ${end}, so the last printed value is ${end - 1}.`,
    })
  );

  const totalLimit = Math.floor(Math.random() * 3) + 3; // 3 to 5
  const total = Array.from({ length: totalLimit }, (_, i) => i).reduce(
    (sum, value) => sum + value,
    0
  );

  questions.push(
    makeLoopOutputQuestion({
      context: "➕ Read the loop. What value is printed after the loop finishes?",
      codeLines: [
        "total = 0",
        "",
        `for num in range(${totalLimit}):`,
        "  total += num",
        "",
        "print(total)",
      ],
      options: [
        String(total),
        String(totalLimit),
        String(totalLimit - 1),
        String(total + totalLimit),
      ],
      correctOutput: String(total),
      explanation: `range(${totalLimit}) gives 0 to ${totalLimit - 1}. Adding those values gives total = ${total}.`,
    })
  );

  return shuffleArray(questions);
}

function generateTier5BreakContinueQuestions() {
  const questions = [];

  const stopAt = Math.floor(Math.random() * 3) + 2; // 2 to 4

  questions.push(
    makeBreakContinueQuestion({
      context: "🛑 Read the loop. What is the last number printed before break stops the loop?",
      codeLines: [
        "for i in range(6):",
        `  if i == ${stopAt}:`,
        "    break",
        "  print(i)",
      ],
      options: [
        String(stopAt - 1),
        String(stopAt),
        "5",
        "6",
      ],
      correctOutput: String(stopAt - 1),
      explanation: `break stops the loop when i == ${stopAt}. Because print(i) comes after the break check, ${stopAt} is not printed. The last printed value is ${stopAt - 1}.`,
    })
  );

  const skipAt = Math.floor(Math.random() * 3) + 1; // 1 to 3

  questions.push(
    makeBreakContinueQuestion({
      context: "⏭️ Read the loop. Which number is skipped by continue?",
      codeLines: [
        "for i in range(5):",
        `  if i == ${skipAt}:`,
        "    continue",
        "  print(i)",
      ],
      options: [
        String(skipAt),
        String(skipAt - 1),
        "4",
        "5",
      ],
      correctOutput: String(skipAt),
      explanation: `continue skips the rest of the current loop cycle. When i == ${skipAt}, print(i) is skipped, so ${skipAt} is not printed.`,
    })
  );

  return shuffleArray(questions);
}

function takeQuestions(questionList, count) {
  return shuffleArray(questionList).slice(0, count);
}

function generateIfElseQuestions() {
  const tier1 = generateTier1IfElseQuestions();
  const tier2 = generateTier2MissingConditionQuestions();
  const tier3 = generateTier3ElifQuestions();
  const tier4 = generateTier4LoopQuestions();
  const tier5 = generateTier5BreakContinueQuestions();

  return [
    ...takeQuestions(tier1, 5),
    ...takeQuestions(tier2, 5),
    ...takeQuestions(tier3, 3),
    ...takeQuestions(tier4, 1),
    ...takeQuestions(tier5, 1),
  ];
}

// ── LEVEL 2 – IF/ELSE ─────────────────────────
function Level2({ onComplete, onBack, onAchievement }) {
  const [started, setStarted] = useState(false);
  const [tab, setTab] = useState("practice");
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

  if (!started) {
    return (
      <div className="screen">
        <div className="victory-card">
          <div className="victory-title">IF / ELSE</div>

          <div style={{ color: "var(--text-dim)", marginBottom: 16 }}>
            Read Python if/else statements and determine which output the program will produce.
          </div>

          <div className="info-box" style={{ textAlign: "left" }}>
            <strong>How it works:</strong>
            <br /><br />
            Read the scenario, inspect the Python code, then choose the message that will be printed.
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

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <button
          style={tabStyle(tab === "practice")}
          onClick={() => {
            playSound("click");
            setTab("practice");
          }}
        >
          Practice
        </button>

        <button
          style={tabStyle(tab === "challenge")}
          onClick={() => {
            playSound("click");
            setTab("challenge");
          }}
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

            <div className="level-tag">LEVEL 2 · PRACTICE</div>
            <div className="game-title">If / Else + Loops</div>
            <div className="score-display">Practice</div>
          </div>

          <div className="code-block">
            <div
              style={{
                fontSize: "0.65rem",
                color: "var(--accent)",
                letterSpacing: 3,
                marginBottom: 12,
                fontFamily: "'Orbitron', sans-serif",
              }}
            >
              PRACTICE MODE
            </div>

            <div style={{ color: "var(--text-dim)", lineHeight: 1.7 }}>
              Practice lessons will go here.
              <br /><br />
              We will add:
              <br />
              • if / else explanations
              <br />
              • comparison operators
              <br />
              • TRUE / FALSE evaluator
              <br />
              • AND / OR / NOT examples
              <br />
              • loops, break, and continue
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

            <div className="level-tag">LEVEL 2</div>
            <div className="game-title">If / Else + Loops</div>
            <div className="score-display">{score} pts</div>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="info-box">
            Question {qIdx + 1} of {questions.length} —{" "}
            {q.type === "missing-condition"
              ? "Choose the condition that completes the code"
              : q.type === "elif-output"
              ? "Read the if / elif / else chain and choose the output"
              : q.type === "loop-output"
              ? "Read the loop and choose the correct output"
              : q.type === "break-continue"
              ? "Read the loop and decide how break or continue changes the output"
              : "Read the code and choose the correct output"}
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
              if (line.type === "blank-line") {
                return <div key={i} style={{ height: 4 }} />;
              }

              if (line.type === "has-blank") {
                const parts = line.text.split("_____");

                return (
                  <div className="code-line" key={i}>
                    <span className="kw">{parts[0]}</span>
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
                          /(if|elif|else|while|for|break|continue|print|True|False|and|or|not|in|range)/g,
                          "<span class='kw'>$1</span>"
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
            💡
            {q.type === "missing-condition"
              ? " Choose the condition that makes the code behave correctly."
              : q.type === "elif-output"
              ? " Python checks conditions from top to bottom."
              : q.type === "loop-output"
              ? " Follow the loop carefully and track how values change."
              : q.type === "break-continue"
              ? " break stops the loop. continue skips part of the loop."
              : " Read the condition carefully and decide which branch runs."}
          </div>

          <div className="options-grid">
            {q.options.map((opt) => {
              let cls = "option-btn";

              if (answered) {
                if (q.correctAnswers.includes(opt)) cls += " correct";
                else if (opt === selected) cls += " wrong";
              }

              return (
                <button
                  key={opt}
                  className={cls}
                  onClick={() => choose(opt)}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {answered && (
            <div
              className={`feedback-box ${
                isCorrect ? "correct" : "wrong"
              }`}
            >
              <strong>
                {isCorrect ? "✅ Correct!" : "❌ Not quite!"}
              </strong>
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
              {qIdx + 1 >= questions.length
                ? "See Results →"
                : "Next →"}
            </button>
          )}
        </>
      )}
    </div>
  );
}