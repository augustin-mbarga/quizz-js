const responses = ["c", "a", "b", "a", "c"];
const emojis = ["✔️", "✨", "👀", "😭", "👎"];

const form = document.querySelector(".quiz-form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let results = [];
  let score = 0;
  const radioButtons = document.querySelectorAll("input[type=radio]:checked");
  radioButtons.forEach((radioButton, index) => {
    if (radioButton.value === responses[index]) {
      results = [...results, true];
      score++;
    } else {
      results = [...results, false];
    }
  });
  showResults(results, score);
  addColor(results);
}

const titleResult = document.querySelector(".results h2");
const markResult = document.querySelector(".mark");
const helpResult = document.querySelector(".help");

function showResults(results, score) {
  const errorsNumber = results.filter((el) => el === false).length;
  const total = results.length;
  let obj = {
    title: "",
    message: "",
    mark: `Score : <span>${score} / ${total}</span>`,
    displayType: "block",
  };

  switch (errorsNumber) {
    case 0:
      obj = {
        ...obj,
        title: `✔️ Bravo, c'est un sans faute ! ✔️`,
        message: "Quelle culture ...",
      };
      displayFooter(obj);
      break;
    case 1:
      obj = {
        ...obj,
        title: `✨ Vous y êtes presque ! ✨`,
        message:
          "Retentez une autre réponse dans la case rouge, puis re-validez !",
      };
      displayFooter(obj);
      break;
    case 2:
      obj = {
        ...obj,
        title: `✨ Encore un effort ... 👀`,
        message:
          "Retentez une autre réponse dans les cases rouges, puis re-validez !",
      };
      displayFooter(obj);
      break;
    case 3:
      obj = {
        ...obj,
        title: `👀 Il reste quelques erreurs. 😭`,
        message:
          "Retentez une autre réponse dans les cases rouges, puis re-validez !",
      };
      displayFooter(obj);
      break;
    case 4:
      obj = {
        ...obj,
        title: `😭 Peut mieux faire ! 😭`,
        message:
          "Retentez une autre réponse dans les cases rouges, puis re-validez !",
      };
      displayFooter(obj);
      break;
    case 5:
      obj = {
        ...obj,
        title: `👎 Peut mieux faire ! 👎`,
        message:
          "Retentez une autre réponse dans les cases rouges, puis re-validez !",
      };
      displayFooter(obj);
      break;

    default:
      titleResult.textContent = "Wops, cas innatendu.";
  }
}

function displayFooter(obj) {
  titleResult.textContent = obj.title;
  helpResult.textContent = obj.message;
  helpResult.style.display = obj.displayType;
  markResult.innerHTML = obj.mark;
  markResult.style.display = obj.displayType;
}

const questions = document.querySelectorAll(".question-block");

function addColor(results) {
  results.forEach((_, index) => {
    results[index]
      ? (questions[index].style.backgroundImage =
          "linear-gradient(to right, #a8ff78, #78ffd6)")
      : (questions[index].style.backgroundImage =
          "linear-gradient(to right, #f5567b, #fd674c)");
  });
}

const radioInputs = document.querySelectorAll("input[type='radio']");

radioInputs.forEach((radioInput) =>
  radioInput.addEventListener("input", resetColor)
);

function resetColor(event) {
  const index = event.target.getAttribute("name").slice(1) - 1; // for instance q3 -> 3
  const parentQuestionBlock = questions[index];

  parentQuestionBlock.style.backgroundColor = "#f1f1f1";
  parentQuestionBlock.style.backgroundImage = "none";
}
