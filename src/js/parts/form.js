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