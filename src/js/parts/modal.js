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