function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector("button[data-start]");
const stopBtn = document.querySelector("button[data-stop]");
const body = document.querySelector("body");


let intervalId;
let delay = 1000;

startBtn.addEventListener("click", (event) => {
    event.target.disabled = true;
    stopBtn.disabled = false;
    timerId = setInterval(() => {
        const color = getRandomHexColor();
        body.style.backgroundColor = color;
        return color;
      }, delay)
});
// * - Адская копипаста со стека 💩 - нет, не копипаста))))
stopBtn.disabled = true;
stopBtn.addEventListener("click", (event) => {
    event.target.disabled = true;
    startBtn.disabled = false;
    return clearInterval(timerId);
});

