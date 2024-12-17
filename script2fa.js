let flee = true;
const fleeDiv = document.getElementById("no");
const resetDiv = document.getElementById("yes");
const newDiv = document.getElementById("mfa_inquire");
const textArea = document.getElementById('email');
const confirmMessage = document.getElementById("confirmMessage");
const codeContainer = document.getElementById("code-container");
const inputs = document.querySelectorAll('.code-input');
const submitButton = document.getElementById('submitCode');
const wrongCode = document.getElementById('wrong_code');
const riddles = [
    {
      question: "Multiply me by myself, you’ll see, A perfect square is what I’ll be. My first and last are primes that rhyme, Solve me now in record time!",
      solution: "2025"
    },
    {
      question: "My first is the number of days in May, My last is a week in play. My middle two double the start of the year, Guess my four digits loud and clear!",
      solution: "3107"
    },
    {
      question: "My digits are a countdown, neat and clear, Flip me around, and my order won’t veer. I’m often used to mark a fun new year, Tell me my digits, don’t you fear!",
      solution: "3210"
    },
    {
      question: "I am the year when humans first flew, In a machine that the Wright brothers knew. Subtract 500 from me to find my start, What four numbers am I at heart?",
      solution: "1903"
    },
    {
      question: "My first digit is a pair of swans, My last is the start of dawn. My middle pair matches the swan’s grace, Together, I’m an elegant place.",
      solution: "2220"
    },
    {
        question: "The meaning of the universe, existance and everything else repeated twice",
        solution: "4242"
    }
];
const chosen_riddle = riddles[Math.floor(Math.random()*riddles.length)]
fleeDiv.addEventListener("mouseover", () => {
  if (flee) {
  const maxX = window.innerWidth - fleeDiv.offsetWidth;
  const maxY = window.innerHeight - fleeDiv.offsetHeight;
  // Generate random new position
  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;
  fleeDiv.style.left = `${randomX}px`;
  fleeDiv.style.top = `${randomY}px`;
}});
// Reset and show newDiv on click
resetDiv.addEventListener("click", () => {
  // Reset fleeing div to original position
  flee = false
  fleeDiv.style.left = `450px`;
  fleeDiv.style.top = `455px`;
  fleeDiv.style.border = "0px solid gray"
  fleeDiv.style.backgroundColor = "gray"
  fleeDiv.style.cursor = "none"
  // Show the new div
  newDiv.style.display = "block";
});
function sendEmail() {
    let mail = textArea.value;
    const chosen_q = chosen_riddle.question
    console.log(mail)
    sendEmailJS(chosen_q, mail)
    textArea.value = "";
    confirmMessage.style.display = "block";
    codeContainer.style.display = "block";
}
function getCode() {
    let code = '';
    inputs.forEach(input => {
        code += input.value; // Combine values of all inputs
    });
    return code;
}
function checkCode() {
    if (chosen_riddle.solution != getCode()) {
        wrongCode.style.display = "block";
    } else {
        wrongCode.style.display = "none";
        window.location.replace("https://youtu.be/dQw4w9WgXcQ?si=RI7aCMAH6ntI4stm")
    }
}
