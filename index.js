// Map keys to sound files for the alien calling tune
const soundMap = {
    "a": "sounds/Alien/A.mp3",
    "b": "sounds/Alien/B.mp3",
    "c": "sounds/Alien/C.mp3",
    "d": "sounds/Alien/D.mp3",
    "e": "sounds/Alien/E.mp3"
};

// Function to play sound and trigger animation
function playSound(key) {
    if (soundMap[key]) {
        const audio = new Audio(soundMap[key]);
        audio.play();
        animateButton(key);
    }
}

// Animate button press effect
function animateButton(key) {
    const button = document.querySelector(`.${key}`);
    if (button) {
        button.classList.add("pressed");
        setTimeout(() => {
            button.classList.remove("pressed");
        }, 200); // Press effect duration
    }
}

// Click event for buttons
const buttons = document.querySelectorAll(".drum");
buttons.forEach(button => {
    button.addEventListener("click", function () {
        playSound(this.classList[0].toLowerCase());
    });
});

// Key press event
document.addEventListener("keydown", function (event) {
    playSound(event.key.toLowerCase());
});

// play/pause music
const playPauseButton = document.getElementById("playPauseButton");
const backgroundMusic = document.getElementById("backgroundMusic");
const progressBar = document.getElementById("progressBar");
const currentTimeDisplay = document.getElementById("currentTime");
const totalTimeDisplay = document.getElementById("totalTime");

backgroundMusic.volume = 0.1

// Play/Pause Button Functionality
playPauseButton.addEventListener("click", function () {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        playPauseButton.textContent = "⏸️ Pause";
    } else {
        backgroundMusic.pause();
        playPauseButton.textContent = "▶️ Play";
    }
});

// Update Progress Bar and Time
backgroundMusic.addEventListener("timeupdate", function () {
    const currentTime = backgroundMusic.currentTime;
    const duration = backgroundMusic.duration;
    progressBar.value = (currentTime / duration) * 100;

    currentTimeDisplay.textContent = formatTime(currentTime);
    totalTimeDisplay.textContent = formatTime(duration);
});

// Change Music Position When Progress Bar is Clicked
progressBar.addEventListener("input", function () {
    const duration = backgroundMusic.duration;
    backgroundMusic.currentTime = (progressBar.value / 100) * duration;
});

// Format Time Helper Function
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
