const picsContainers = document.querySelectorAll('.pics');
for (let i = 0; i < picsContainers.length; i++) {
    const picsContainer = picsContainers[i];
    const track = picsContainer.querySelector('.track');
    const slides = track.querySelectorAll('.slide');
    const leftArrow = picsContainer.querySelector('.arrow.left');
    const rightArrow = picsContainer.querySelector('.arrow.right');
    const slideWidth = slides[0].clientWidth;
    let currentIndex = 0;

    function updateSlide() {
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        updateArrows();
    }

    function updateArrows() {
        if (currentIndex ===0){
            leftArrow.style.display = "none";
        }else {
            leftArrow.style.display = "block";
        }
        if (currentIndex === slides.length-1){
            rightArrow.style.display = "none";
        }else {
            rightArrow.style.display = "block";
        }
    }

    function nextSlide() {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateSlide();
        }
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlide();
        }
    }

    // Attach event listeners
    leftArrow.addEventListener('click', prevSlide);
    rightArrow.addEventListener('click', nextSlide);

    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 20;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    });

    function handleSwipeGesture() {
        const distance = touchEndX - touchStartX;
        if (Math.abs(distance) > minSwipeDistance) {
            if (distance > 0) {
                // Swipe right → previous slide
                prevSlide();
            } else {
                // Swipe left → next slide
                nextSlide();
            }
        }
    }

    // Initialize
    updateSlide();
}