const analyzeBtn = document.getElementById("analyzeBtn");
const userInput = document.getElementById("userInput");

const statusText = document.getElementById("status");
const score = document.getElementById("score");
const reason = document.getElementById("reason");

const urgencyWords = [
    "urgent",
    "immediately",
    "verify",
    "act now",
    "limited time",
    "within 24 hours"
];

const sensitiveWords = [
    "password",
    "otp",
    "pin",
    "cvv",
    "credit card",
    "bank account",
    "security code"
];

function containsURL(text) {
    const urlPattern = /(https?:\/\/|www\.)/i;
    return urlPattern.test(text);
}

function countMatches(text, words) {

    let count = 0;

    const lowerText = text.toLowerCase();

    words.forEach(word => {
        if (lowerText.includes(word)) {
            count++;
        }
    });

    return count;
}

analyzeBtn.addEventListener("click", function () {

    const input = userInput.value;

    if (input.trim() === "") {
        alert("Please enter an email or URL.");
        return;
    }
    
    let threatScore = 0;

    if (containsURL(input)) {
        threatScore += 30;
    }

    threatScore += countMatches(input, urgencyWords) * 15;
    threatScore += countMatches(input, sensitiveWords) * 20;

    if (threatScore > 100) {
        threatScore = 100;
    }

    score.textContent = threatScore;
    if (threatScore < 30) {
        statusText.textContent = "Safe";
    }

    else if (threatScore < 70) {
        statusText.textContent = "Suspicious";
    }

    else {
        statusText.textContent = "Dangerous";
    }

    let message = [];

    if (containsURL(input)) {
        message.push("Contains a URL.");
    }

    if (countMatches(input, urgencyWords) > 0) {
        message.push("Uses urgency-related words.");
    }

    if (countMatches(input, sensitiveWords) > 0) {
        message.push("Requests sensitive information.");
    }

    if (message.length === 0) {
        reason.textContent = "No suspicious patterns detected.";
    }
    else {
        reason.textContent = message.join(" ");
    }

});