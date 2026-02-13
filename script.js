// Funny quotes for the No button
const funnyQuotes = [
    "Please nooo 🥺",
    "Don't break my heart 💔",
    "Say yes, pretty please 💕",
    "No is not an option 😌",
    "Think about it again! 💭",
    "You're breaking my heart! 😢",
    "Choose love! ❤️",
    "Wrong button! 😅",
    "Are you really sure? 🥹",
    "Give us a chance! 💫",
    "I believe in us! ✨",
    "My heart says yes! 💖",
    "Let love win! 🌹",
    "Pretty please? 🙏💕",
    "You know you want to! 😊"
];

let yesClickCount = 0;
let noButtonMoveCount = 0;

// Get elements
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const funnyQuoteEl = document.getElementById('funnyQuote');
const warningMessage = document.getElementById('warningMessage');
const proposalScreen = document.getElementById('proposalScreen');
const finalScreen = document.getElementById('finalScreen');
const heartsContainer = document.getElementById('heartsContainer');

// Create floating hearts
function createFloatingHearts() {
    const heartSymbols = ['💕', '💖', '💗', '💝', '💘', '❤️', '💓', '💞'];

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 15 + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heartsContainer.appendChild(heart);
    }
}

// Show random funny quote
function showFunnyQuote() {
    const randomQuote = funnyQuotes[Math.floor(Math.random() * funnyQuotes.length)];
    funnyQuoteEl.textContent = randomQuote;
    funnyQuoteEl.classList.add('show');

    setTimeout(() => {
        funnyQuoteEl.classList.remove('show');
    }, 2000);
}

// Move No button to random position
function moveNoButton() {
    const container = document.querySelector('.buttons-container');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate safe boundaries (keep button within container but visible)
    const maxX = containerRect.width - btnRect.width - 40;
    const maxY = containerRect.height - btnRect.height - 40;

    // Generate random position (more dramatic movement)
    const randomX = (Math.random() - 0.5) * maxX;
    const randomY = (Math.random() - 0.5) * maxY;

    // Apply transform with smooth transition
    noBtn.style.transition = 'transform 0.3s ease';
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;

    // Increase Yes button size slightly to make it more attractive
    noButtonMoveCount++;
    if (noButtonMoveCount > 3) {
        const scale = 1 + Math.min(noButtonMoveCount * 0.05, 0.3);
        yesBtn.style.transform = `scale(${scale})`;
        yesBtn.style.transition = 'transform 0.3s ease';
    }

    showFunnyQuote();
}

// Handle No button interactions - mouse hover
noBtn.addEventListener('mouseenter', moveNoButton);

// Prevent clicking the No button
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Handle touch for mobile
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Make No button move when mouse gets close (detection zone)
document.addEventListener('mousemove', (e) => {
    if (yesClickCount >= 1) return; // Stop after Yes is clicked

    const noBtnRect = noBtn.getBoundingClientRect();
    const detectionZone = 80; // pixels

    const isNear = (
        e.clientX >= noBtnRect.left - detectionZone &&
        e.clientX <= noBtnRect.right + detectionZone &&
        e.clientY >= noBtnRect.top - detectionZone &&
        e.clientY <= noBtnRect.bottom + detectionZone
    );

    if (isNear) {
        moveNoButton();
    }
});

// Handle Yes button click
yesBtn.addEventListener('click', () => {
    yesClickCount++;

    if (yesClickCount === 1) {
        // Show romantic transition message
        warningMessage.textContent = 'You just made me the happiest person alive ❤️';
        warningMessage.style.display = 'block';
        warningMessage.style.fontSize = '1.3rem';
        warningMessage.style.fontWeight = '600';

        // Disable button temporarily
        yesBtn.disabled = true;
        yesBtn.style.opacity = '0.7';

        // Show final screen after 2.5 seconds
        setTimeout(() => {
            showCelebration();
        }, 2500);
    }
});

// Show final celebration screen
function showCelebration() {
    // Hide proposal screen
    proposalScreen.classList.remove('active');

    // Show final screen after a brief delay
    setTimeout(() => {
        finalScreen.classList.add('active');
        createConfetti();
        createMoreHearts();
    }, 300);
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff6b9d', '#c06c84', '#f67280', '#ff8fab', '#ffd1dc', '#ffb6c1'];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = -10 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        document.body.appendChild(confetti);

        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 6000);
    }
}

// Create more hearts for celebration
function createMoreHearts() {
    const heartSymbols = ['💕', '💖', '💗', '💝', '💘', '❤️', '💓', '💞', '💟'];

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.animationDuration = (Math.random() * 5 + 3) + 's';
            heartsContainer.appendChild(heart);
        }, i * 100);
    }
}

// Initialize floating hearts on page load
createFloatingHearts();

// Add touch event listeners for better mobile experience
document.addEventListener('touchmove', (e) => {
    if (yesClickCount >= 1) return; // Stop after Yes is clicked

    // Check if touch is near No button
    const touch = e.touches[0];
    const noBtnRect = noBtn.getBoundingClientRect();

    // Smaller detection zone for touch to prevent frustration
    const detectionZone = 60;

    const isNear = (
        touch.clientX >= noBtnRect.left - detectionZone &&
        touch.clientX <= noBtnRect.right + detectionZone &&
        touch.clientY >= noBtnRect.top - detectionZone &&
        touch.clientY <= noBtnRect.bottom + detectionZone
    );

    if (isNear) {
        moveNoButton();
    }
});
