/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/parts/calc.js":
/*!******************************!*\
  !*** ./src/js/parts/calc.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

let calculator = function(){
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
};

module.exports = calculator;

/***/ }),

/***/ "./src/js/parts/form.js":
/*!******************************!*\
  !*** ./src/js/parts/form.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

let formWindow = function(){
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
};

module.exports = formWindow;

/***/ }),

/***/ "./src/js/parts/modal.js":
/*!*******************************!*\
  !*** ./src/js/parts/modal.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

let modalWindow = function(){
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
};

module.exports = modalWindow;

/***/ }),

/***/ "./src/js/parts/slider.js":
/*!********************************!*\
  !*** ./src/js/parts/slider.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

/***/ }),

/***/ "./src/js/parts/tabs.js":
/*!******************************!*\
  !*** ./src/js/parts/tabs.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

let tabs = function(){
        
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

};

module.exports = tabs;

/***/ }),

/***/ "./src/js/parts/timer.js":
/*!*******************************!*\
  !*** ./src/js/parts/timer.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

let timer = function(){
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

    setClock('timer', deadLine);
};

module.exports = timer;

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

window.addEventListener('DOMContentLoaded', function(){

    "use strict";

    let calc = __webpack_require__(/*! ./parts/calc.js */ "./src/js/parts/calc.js"),
        form = __webpack_require__(/*! ./parts/form.js */ "./src/js/parts/form.js"),
        slider = __webpack_require__(/*! ./parts/slider.js */ "./src/js/parts/slider.js"),
        tabs = __webpack_require__(/*! ./parts/tabs.js */ "./src/js/parts/tabs.js"),
        timer = __webpack_require__(/*! ./parts/timer.js */ "./src/js/parts/timer.js"),
        modal = __webpack_require__(/*! ./parts/modal.js */ "./src/js/parts/modal.js");

    calc();
    form();
    slider();
    tabs();
    timer();
    modal();
});

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map