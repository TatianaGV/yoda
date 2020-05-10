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