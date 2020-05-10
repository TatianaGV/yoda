let sliders = function(){
    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(indexSlide){

        if (indexSlide > slides.length){
            slideIndex = 1;
        }
        if (indexSlide < 1){
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none'); //скрыли все слайды
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function addSlideIndex(indexSlide){
        showSlides(slideIndex += indexSlide);
    }

    function currentSlide(indexSlide){
        showSlides(slideIndex = indexSlide);
    }

    prev.addEventListener('click', function() {
        addSlideIndex(-1);
    });

    next.addEventListener('click', function() {
        addSlideIndex(1);
    });

    dotsWrap.addEventListener('click', function(event){
        for(let i = 0; i < dots.length + 1; i++){
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]){
                currentSlide(i);
            }
        }
    });
};

module.exports = sliders;