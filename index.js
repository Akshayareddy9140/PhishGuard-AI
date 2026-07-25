const analyzeBtn = document.getElementById("analyzeBtn");
const userInput = document.getElementById("userInput");

const statusText = document.getElementById("status");
const score = document.getElementById("score");
const reason = document.getElementById("reason");

analyzeBtn.addEventListener("click", function () {

    const input = userInput.value;

    if (input.trim() === "") {
        alert("Please enter an email or URL.");
        return;
    }

    statusText.textContent = "Analyzed";
    score.textContent = "100";
    reason.textContent =
        "Input received successfully. Analysis engine will process this in the next phase.";

});