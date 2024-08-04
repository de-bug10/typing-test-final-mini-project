const typingText = document.querySelector(".sample-text p"),
  inpField = document.querySelector(".main-box .input-field"),
  timeTag = document.querySelector(".time span b"),
  mistakeTag = document.querySelector(".mistake span"),
  wpmTag = document.querySelector(".wpm span"),
  cpmTag = document.querySelector(".cpm span"),
  tryAgainBtn= document.querySelector("button");
  


let timer,
  maxTime = 30,
  timeLeft = maxTime,
  charIndex = (mistakes = isTyping = 0);

function randomParagraph() {
  let randIndex = Math.floor(Math.random() * paragraphs2.length);
   typingText.innerHTML = "";


  paragraphs2[randIndex].split("").forEach((span) => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });
  document.addEventListener("keydown", () => inpField.focus());
  typingText.addEventListener("click", () => inpField.focus());
}
function initTyping() {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inpField.value.split("")[charIndex];
 if (charIndex < characters.length - 1 && timeLeft > 0) {
   if (!isTyping) {
     timer = setInterval(initTimer, 1000);
     isTyping = true;
   }
   if (typedChar == null) {
     charIndex--;
     if (characters[charIndex].classList.contains("incorrect")) {
       mistakes--;
     }
     characters[charIndex].classList.remove("correct", "incorrect");
   } else {
     if (characters[charIndex].innerText === typedChar) {
       characters[charIndex].classList.add("correct");
     } else {
       mistakes++;
       characters[charIndex].classList.add("incorrect");
     }
     charIndex++;
   }

   characters.forEach((span) => span.classList.remove("active"));
   characters[charIndex].classList.add("active");
   let wpm = Math.round(
     ((charIndex - mistakes) / 7 / (maxTime - timeLeft)) * 60
   );
   wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
   mistakeTag.innerText = mistakes;
   wpmTag.innerText = wpm;
   cpmTag.innerText = charIndex - mistakes;
 } else {
    clearInterval(timer);
    inpField.value = "";
 }
}
function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    timeTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
  }
}
function resetGame()
{
  randomParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  charIndex = mistakes = isTyping = 0;
  inpField.value = "";
  timeTag.innerText = timeLeft;
  wpmTag.innerText = 0;
  mistakeTag.innerText = 0;
  cpmTag.innerText = 0;
}
randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click",resetGame);
