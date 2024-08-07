var currentScale = 1; // Keep track of the current zoom scale

        function openFullscreen(img) {
            var overlay = document.getElementById('fullscreenOverlay');
            var fullscreenImage = document.getElementById('fullscreenImage');
            fullscreenImage.src = img.src;
            currentScale = 1; // Reset scale when opening new image
            updateZoom();
            overlay.style.display = 'flex';
        }

        function closeFullscreen(event) {
            // Stop the event from propagating
            event.stopPropagation();
            var overlay = document.getElementById('fullscreenOverlay');
            overlay.style.display = 'none';
        }

        function zoomIn() {
            currentScale += 0.1; // Increase scale by 0.1
            updateZoom();
        }

        function zoomOut() {
            if (currentScale > 0.1) { // Prevent scale from going below 0.1
                currentScale -= 0.1; // Decrease scale by 0.1
                updateZoom();
            }
        }

        function updateZoom() {
            var fullscreenImage = document.getElementById('fullscreenImage');
            fullscreenImage.style.transform = 'scale(' + currentScale + ')';
        }

        document.addEventListener('DOMContentLoaded', function () {
            var overlay = document.getElementById('fullscreenOverlay');
            var closeBtn = document.querySelector('.closebtn');

            // Close fullscreen mode if close button is clicked
            closeBtn.addEventListener('click', function (event) {
                closeFullscreen(event);
            });

            // Close fullscreen mode if clicking outside of the image
            overlay.addEventListener('click', function (event) {
                if (event.target === overlay) {
                    closeFullscreen(event);
                }
            });
        });