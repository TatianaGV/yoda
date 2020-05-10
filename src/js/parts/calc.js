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