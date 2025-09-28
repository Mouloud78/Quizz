import quizData from "./quizData.js";
// console.log(quizData);

const form = document.querySelector(".quiz-form");
const fromSubmitBtn = document.querySelector(".quiz__submit-button");

function addQuizContent(questions) {
  const fragment = document.createDocumentFragment();

  questions.forEach((currentQuestion) => {
    const questionBlock = document.createElement("div");
    questionBlock.className = "quiz__question-block";
    questionBlock.id = currentQuestion.id;
    const questionText = document.createElement("p");
    questionText.className = "quiz__question";
    questionText.textContent = currentQuestion.question;
    questionBlock.appendChild(questionText);

    currentQuestion.options.forEach((option, index) => {
      const inputGroup = document.createElement("div");
      inputGroup.className = "quiz__input-group";

      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.className = "quiz__radio-input";
      radioInput.id = `
      ${currentQuestion.id}-${option.value}
      `;
      radioInput.name = currentQuestion.id;
      radioInput.value = option.value;
      radioInput.checked = index === 0;

      const label = document.createElement("label");
      label.className = "quiz-label";
      label.htmlFor = radioInput.id;
      label.textContent = option.label;

      inputGroup.appendChild(radioInput);
      inputGroup.appendChild(label);
      questionBlock.appendChild(inputGroup);
    });

    fragment.appendChild(questionBlock);
  });

  form.insertBefore(fragment, fromSubmitBtn);
}

addQuizContent(quizData.questions);

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  getResult();
}

function getResult() {
  const checkedRadioButton = [
    ...document.querySelectorAll("input[type='radio]:checked"),
  ];

  const results = checkedRadioButton.map((radioButton) => {
    const response = quizData.responses.find(
      (response) => response.id === radioButton.name
    );
    return {
      id: radioButton.name,
      correct: response.answer === radioButton.value,
    };
  });
}
