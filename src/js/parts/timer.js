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