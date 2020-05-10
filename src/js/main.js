window.addEventListener('DOMContentLoaded', ()=>{
    'use strict';

    //tabs
    
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabcontent = document.querySelectorAll('.info-tabcontent');
    
    function hideTab(a){
        for (let i = a; i < tabcontent.length; i++){
            tabcontent[i].classList.remove('show');
            tabcontent[i].classList.add('hide');
        }
    }
    function showTab(a){
        if(tabcontent[a].classList.contains('hide')){
            tabcontent[a].classList.remove('hide');
            tabcontent[a].classList.add('show');
        }
    }

    hideTab(1); //в самом начале скрываем первый все, кроме 0

    info.addEventListener('click', (event)=>{
        let target = event.target;
        if(target && target.classList.contains('info-header-tab')){
            for(let i = 0; i < tab.length; i++){
                if(target == tab[i]){
                    hideTab(0); //скрываем все табы
                    showTab(i); //показываем нужный таб
                    break;
                }
            }
        }
    });

    // timer

    let deadLine = '2020-05-26';

    function getTimeRemaning(endTime){
        let t = Date.parse(endTime) - Date.now(),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60)%60),
            hours = Math.floor((t/(1000*60*60)));

        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endTime){
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000); //обновляем время каждую секунду

        function updateClock() {
            let t = getTimeRemaning(endTime);

            function addZero(digit)
            {
                if(digit <= 9) {
                    return '0' + digit;
                } else {return digit;}
            }

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if(t.total <= 0){
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    // Modal window
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        tabBtn = document.querySelectorAll('.description-btn');


    function showModalWindow(btn){
        overlay.style.display = 'block';
        btn.classList.add('more-splash');
        document.body.style.overflow = 'hidden'; 
    }

    function closeModalWindow(){
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    }

    more.addEventListener('click', function(){
        showModalWindow(this);
    });

    close.addEventListener('click', function(){
        closeModalWindow();
    });

    tabBtn.forEach( button => button.addEventListener('click', ()=>{
        showModalWindow(button);
    }));

    setClock('timer', deadLine);

    //form

    let message = {
        loading: 'Loading...',
        success: 'Thank you!',
        failure: 'Some wrong...('
    };

    let form = document.getElementsByClassName('main-form')[0],
        contactForm = document.getElementById('form'),
        statusMessage = document.createElement('div');
        statusMessage.classList.add('status');

    function sendForm(elem){
        elem.addEventListener('submit', function(event){
            event.preventDefault();
            elem.appendChild(statusMessage);
            let formData = new FormData(elem);

            function postData(data){

                return new Promise(function(resolve, reject){
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                    
                    let obj = {};
                    data.forEach(function(value, key){
                        obj[key] = value;
                    });
                    let json = JSON.stringify(obj);

                    request.onreadystatechange = function(){
                        if (request.readyState < 4){
                            resolve();
                        } else if (request.readyState === 4 && request.status == 200){
                            resolve();
                        } else{
                            reject();
                        }   
                    };
                    request.send(json);
                });
            }

            function clearInput(){
                let input = elem.getElementsByTagName('input');
                for(let i = 0; i< input.length; i++){
                    input[i].value = '';
                }
            }

            postData(formData)
                .then(()=> statusMessage.innerHTML = message.loading)
                .then(()=> {statusMessage.innerHTML = message.success;})
                .catch(()=> statusMessage.innerHTML = message.failure)
                .then(clearInput);
        });
    }

    sendForm(contactForm);
    sendForm(form);


    //slider

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

    //calculator
    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0; 

    totalValue.innerHTML = 0;

    function calculateRest(){
        persons.addEventListener('change', function(){
            personsSum = +this.value;

            if(persons.value == '' || daysSum === 0){
                totalValue.innerHTML = 0;
            }else{
                total = (daysSum + personsSum)*4000;
                totalValue.innerHTML = total;
            }
        });

        restDays.addEventListener('change', function(){
            daysSum = +this.value;

            if(restDays.value == '' || personsSum === 0){
                totalValue.innerHTML = 0;
            }else{
                total = (daysSum + personsSum)*4000;
                totalValue.innerHTML = total;
            }
        });

        place.addEventListener('change', function(){
            if(restDays.value == '' || persons.value == ''){
                totalValue.innerHTML = 0;
            } else {
                let a = total;
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }
        });
    }

    calculateRest();
});