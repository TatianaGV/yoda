window.addEventListener('DOMContentLoaded', ()=>{
    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabcontent = document.querySelectorAll('.info-tabcontent');
    
    function hideTab(a){
        for (let i = a; i < tabcontent.length; i++){
            tabcontent[i].classList.remove('show');
            tabcontent[i].classList.add('hide');
        }
    }

    hideTab(1); //в самом начале скрываем первый все, кроме 0

    function showTab(a){
        if(tabcontent[a].classList.contains('hide')){
            tabcontent[a].classList.remove('hide');
            tabcontent[a].classList.add('show');
        }
    }

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
});