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

    let deadLine = '2020-04-24';

    function getTimeRemaning(endTime){
        let t = Date.parse(endTime) - Date.parse(new Date()),
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
});