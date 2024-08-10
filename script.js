function openFullscreen(img) {
    const overlay = document.getElementById('fullscreenOverlay');
    const fullscreenImage = document.getElementById('fullscreenImage');
    fullscreenImage.src = img.src;
    fullscreenImage.style.transform = 'scale(1)'; // Reset to initial scale
    fullscreenImage.style.top = '0px'; // Reset top
    fullscreenImage.style.left = '0px'; // Reset left
    overlay.style.display = 'flex';
    overlay.scrollTop = 0; // Reset scroll
    overlay.scrollLeft = 0; // Reset scroll
}

function closeFullscreen(event) {
    event.stopPropagation();
    const overlay = document.getElementById('fullscreenOverlay');
    overlay.style.display = 'none';
}

function handleWheelZoom(event) {
    event.preventDefault();
    const img = event.target;
    const overlay = img.parentElement;
    const rect = img.getBoundingClientRect();

    let scale = parseFloat(img.style.transform.replace(/scale\(([^)]+)\)/, '$1')) || 1;
    const prevScale = scale;
    scale += event.deltaY * -0.001; // Adjust zoom speed by changing this multiplier
    scale = Math.min(Math.max(0.5, scale), 5); // Restrict zoom level between 0.5x and 5x

    // Calculate new image dimensions
    const newWidth = rect.width * (scale / prevScale);
    const newHeight = rect.height * (scale / prevScale);

    // Calculate new scroll position to keep image centered
    const centerX = (overlay.clientWidth / 2 + overlay.scrollLeft) / prevScale;
    const centerY = (overlay.clientHeight / 2 + overlay.scrollTop) / prevScale;

    const newScrollLeft = centerX * scale - overlay.clientWidth / 2;
    const newScrollTop = centerY * scale - overlay.clientHeight / 2;

    img.style.transform = `scale(${scale})`;
    overlay.scrollLeft = newScrollLeft;
    overlay.scrollTop = newScrollTop;

    // Ensure the image stays within bounds
    const maxScrollLeft = Math.max(0, newWidth - overlay.clientWidth);
    const maxScrollTop = Math.max(0, newHeight - overlay.clientHeight);

    if (newScrollLeft < 0) overlay.scrollLeft = 0;
    if (newScrollTop < 0) overlay.scrollTop = 0;
    if (newScrollLeft > maxScrollLeft) overlay.scrollLeft = maxScrollLeft;
    if (newScrollTop > maxScrollTop) overlay.scrollTop = maxScrollTop;
}

function handleTouchZoom(event) {
    if (event.touches.length == 2) {
        event.preventDefault();
        const img = event.target;
        const overlay = img.parentElement;
        const rect = img.getBoundingClientRect();
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];

        const distance = Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
        );

        if (img.lastTouchDistance) {
            const scaleChange = distance / img.lastTouchDistance;
            let scale = parseFloat(img.style.transform.replace(/scale\(([^)]+)\)/, '$1')) || 1;
            const prevScale = scale;
            scale *= scaleChange;
            scale = Math.min(Math.max(0.5, scale), 5); // Restrict zoom level between 0.5x and 5x

            // Calculate new image dimensions
            const newWidth = rect.width * (scale / prevScale);
            const newHeight = rect.height * (scale / prevScale);

            // Calculate new scroll position to keep image centered
            const centerX = (overlay.clientWidth / 2 + overlay.scrollLeft) / prevScale;
            const centerY = (overlay.clientHeight / 2 + overlay.scrollTop) / prevScale;

            const newScrollLeft = centerX * scale - overlay.clientWidth / 2;
            const newScrollTop = centerY * scale - overlay.clientHeight / 2;

            img.style.transform = `scale(${scale})`;
            overlay.scrollLeft = newScrollLeft;
            overlay.scrollTop = newScrollTop;

            // Ensure the image stays within bounds
            const maxScrollLeft = Math.max(0, newWidth - overlay.clientWidth);
            const maxScrollTop = Math.max(0, newHeight - overlay.clientHeight);

            if (newScrollLeft < 0) overlay.scrollLeft = 0;
            if (newScrollTop < 0) overlay.scrollTop = 0;
            if (newScrollLeft > maxScrollLeft) overlay.scrollLeft = maxScrollLeft;
            if (newScrollTop > maxScrollTop) overlay.scrollTop = maxScrollTop;
        }

        img.lastTouchDistance = distance;
    }
}

function resetTouchZoom(event) {
    if (event.touches.length < 2) {
        delete event.target.lastTouchDistance;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('fullscreenOverlay');
    const fullscreenImage = document.getElementById('fullscreenImage');
    const closeBtn = document.querySelector('.closebtn');

    closeBtn.addEventListener('click', function (event) {
        closeFullscreen(event);
    });

    overlay.addEventListener('click', function (event) {
        if (event.target === overlay) {
            closeFullscreen(event);
        }
    });

    fullscreenImage.addEventListener('wheel', handleWheelZoom);
    fullscreenImage.addEventListener('touchmove', handleTouchZoom);
    fullscreenImage.addEventListener('touchend', resetTouchZoom);

    // Allow the overlay to be scrollable
    overlay.style.overflow = 'scroll';
});






// Disable right-click
document.addEventListener('contextmenu', event => event.preventDefault());

let currentErrorIndex = 0;

// Function to handle login
function handleLogin() {
    const loginCodeInput = document.getElementById('login-code');
    const loginCode = loginCodeInput.value;
    const errorMessage = document.getElementById('error-message');

    const correctCode = '3535';
    const errorMessages = ["Incorrect value", "Try again", "Ghambare Ghambare"];

    if (loginCode === correctCode) {
        sessionStorage.setItem('loggedIn', 'true');
        window.location.href = 'home.html';  // Redirect to home page after successful login
    } else {
        errorMessage.textContent = errorMessages[currentErrorIndex];
        errorMessage.style.display = 'block';
        currentErrorIndex = (currentErrorIndex + 1) % errorMessages.length;
    }
}

// Check login status on every restricted page
function checkLoginStatus() {
    const loggedIn = sessionStorage.getItem('loggedIn');
    const loginPage = 'index.html';  // Redirect to index.html (login page) if not logged in

    if (!loggedIn && !window.location.pathname.endsWith('index.html')) {
        window.location.href = loginPage;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('login-button');
    if (loginButton) {
        loginButton.addEventListener('click', handleLogin);
    }

    checkLoginStatus();
});
