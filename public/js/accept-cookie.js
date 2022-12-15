let buttonAccept = document.getElementById('button-accept');
let buttonNo = document.getElementById('button-no');
let messageCookie = document.getElementById('message-cookie');
const btnContainer = document.querySelector('.btn-container');

if(buttonAccept) {
    buttonAccept.addEventListener('click', async () => {
        let response = await fetch('/accept', {  
            method: 'POST'
        });

        if(response.ok) {
            messageCookie.remove();
        }
    });
}

// setting it initially
if (buttonAccept){
    btnContainer.style.flexDirection = 'row';
    buttonNo.addEventListener('mouseover', (e) => {
        const currentDir = btnContainer.style.flexDirection;
        if(currentDir === 'row') {
            btnContainer.style.flexDirection = 'row-reverse';
        } else {
            btnContainer.style.flexDirection = 'row';
        }
    })
}