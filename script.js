const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const mainCard = document.getElementById('mainCard');
const successContainer = document.getElementById('successContainer');

// "Yes" button interaction
yesBtn.addEventListener('click', () => {
    mainCard.classList.add('hidden');
    successContainer.classList.remove('hidden');
    // Ensure "No" button is hidden even if it was moved to body
    noBtn.style.display = 'none';
    createEmojiBurst();
});

// "No" button interaction
// Track mouse movement globally for the "chasing" effect
document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const btnRect = noBtn.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    // Calculate distance between mouse and button center
    const distance = Math.sqrt(Math.pow(x - btnCenterX, 2) + Math.pow(y - btnCenterY, 2));

    // If mouse gets within 100px (proximity radius), move the button
    // This creates the "chasing" effect even if you don't touch it
    if (distance < 150) {
        moveButton();
    }
});

// Also keep direct interactions just in case
noBtn.addEventListener('mouseenter', moveButton);
noBtn.addEventListener('touchstart', moveButton);
noBtn.addEventListener('click', moveButton);

function moveButton() {
    // Fix for "disappearing" issue:
    // If the button is inside .card, and .card has transforms/filters,
    // position: fixed might be relative to the card, not the viewport.
    // We move the button to document.body to ensure it moves relative to the screen.
    if (noBtn.parentNode !== document.body) {
        document.body.appendChild(noBtn);
    }

    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Get button dimensions
    const btnRect = noBtn.getBoundingClientRect();
    const btnWidth = btnRect.width;
    const btnHeight = btnRect.height;

    // Calculate safe random position
    // Ensure it doesn't go off screen
    const maxLeft = viewportWidth - btnWidth;
    const maxTop = viewportHeight - btnHeight;

    const newLeft = Math.random() * maxLeft;
    const newTop = Math.random() * maxTop;

    // Apply new position
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${newLeft}px`;
    noBtn.style.top = `${newTop}px`;
    noBtn.style.zIndex = '1000'; // Ensure it stays on top


    // Optional: add a slight rotation for fun
    const randomRotation = (Math.random() - 0.5) * 20;
    noBtn.style.transform = `rotate(${randomRotation}deg)`;
}

// Emoji Burst Animation
function createEmojiBurst() {
    const emojis = ['💖', '💕', '🥰', '😍', '💘', '💝', '💓'];
    const container = document.body;

    for (let i = 0; i < 50; i++) {
        const emoji = document.createElement('div');
        emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.classList.add('floating-emoji');

        // Random start position
        emoji.style.left = Math.random() * 100 + 'vw';
        emoji.style.top = '100vh'; // Start from bottom

        // Random transition duration and delay
        const duration = Math.random() * 3 + 2; // 2-5s
        emoji.style.animationDuration = `${duration}s`;

        container.appendChild(emoji);

        // Cleanup after animation
        setTimeout(() => {
            emoji.remove();
        }, duration * 1000);
    }
}
