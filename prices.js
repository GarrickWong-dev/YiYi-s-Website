const track = document.querySelector('.track'); 
const slides = document.querySelectorAll('.slide');
const slideWidth = slides[0].clientWidth;
const leftArrow = document.querySelector('.arrow.left');
const rightArrow = document.querySelector('.arrow.right');

let currentIndex = 0;

// Move the track
function updateSlidePosition() {
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updateArrows();
}

// Show/hide arrows based on current position
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
        updateSlidePosition();
    }
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlidePosition();
    }
}

// Event listeners
leftArrow.addEventListener('click', prevSlide);
rightArrow.addEventListener('click', nextSlide);

// Attach event listeners
leftArrow.addEventListener('click', prevSlide);
rightArrow.addEventListener('click', nextSlide);

let touchStartX = 0;
let touchEndX = 0;
const minSwipeDistance = 25;

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
updateSlidePosition();
