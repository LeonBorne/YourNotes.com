function openFullscreen(img) {
    const overlay = document.getElementById('fullscreenOverlay');
    const fullscreenImage = document.getElementById('fullscreenImage');
    fullscreenImage.src = img.src;
    fullscreenImage.style.transform = 'scale(1)';  // Ensure the image is at its original scale
    overlay.style.display = 'flex';
}

function closeFullscreen(event) {
    event.stopPropagation();
    const overlay = document.getElementById('fullscreenOverlay');
    overlay.style.display = 'none';
}

function handleWheelZoom(event) {
    event.preventDefault();
    const img = event.target;
    let scale = parseFloat(img.style.transform.replace('scale(', '').replace(')', '')) || 1;
    scale += event.deltaY * -0.001;  // Adjust zoom speed by changing this multiplier
    scale = Math.min(Math.max(0.5, scale), 5);  // Restrict zoom level between 0.5x and 5x
    img.style.transform = `scale(${scale})`;
}

function handleTouchZoom(event) {
    if (event.touches.length == 2) {
        event.preventDefault();
        const img = event.target;
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];

        const distance = Math.hypot(
            touch2.clientX - touch1.clientX,
            touch2.clientY - touch1.clientY
        );

        if (img.lastTouchDistance) {
            const scaleChange = distance / img.lastTouchDistance;
            let scale = parseFloat(img.style.transform.replace('scale(', '').replace(')', '')) || 1;
            scale *= scaleChange;
            scale = Math.min(Math.max(0.5, scale), 5);  // Restrict zoom level between 0.5x and 5x
            img.style.transform = `scale(${scale})`;
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
});
