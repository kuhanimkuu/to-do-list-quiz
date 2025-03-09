const questions = [
    {
      question: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Madrid"],
      answer: 1
    },
    {
      question: "Which planet is known as the 'Red Planet'?",
      options: ["Jupiter", "Saturn", "Mars", "Venus"],
      answer: 2
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      answer: 3
    },
    {
        question: "Who invented calculus?",
        options: ["Isaac Newton", "Blaise Pascal", "Charles Babbage", "Alber Einstein"],
        answer: 4
      }
  ];

  let currentQuestion = 0;
  let score = 0;

  function displayQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");

    questionElement.textContent = questions[currentQuestion].question;

    optionsElement.innerHTML = "";
    questions[currentQuestion].options.forEach((option, index) => {
      const li = document.createElement("li");
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = index;
      checkbox.addEventListener("change", () => selectOption(index));
      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(option));
      li.appendChild(label);
      optionsElement.appendChild(li);
    });

    updateScore();
  }

  function selectOption(index) {
    const checkboxes = document.querySelectorAll("#options li input[type='checkbox']");
    const selectedIndex = Array.from(checkboxes).findIndex(cb => cb.checked && cb.value == index);

    if (selectedIndex === questions[currentQuestion].answer) {
      score++;
    }

    currentQuestion++;
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }

  function updateScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `Score: ${score} / ${currentQuestion}`;
  }

  function displayResult() {
    const resultElement = document.getElementById("result");
    const feedback = score === questions.length ? "Excellent!" : "Better luck next time!";
    resultElement.textContent = `Your final score is ${score} out of ${questions.length}. ${feedback}`;
  }

  displayQuestion();