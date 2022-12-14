let cardButtons = document.querySelectorAll('#liste-card button');

// Fonction qui permet a l'utilisateur de s'inscrir a un hike
const inscrireServeur = async (event) => {
    event.preventDefault();
    let data = {
        id: event.currentTarget.id,
       
    }
    await fetch('/', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    window.location.reload();
}

// Fonction qui permet a l'utilisateur de se desinscrir a un hike
const desinscrireServeur = async (event) => {
    event.preventDefault();
    let data = {
        id: event.currentTarget.id
    }
    await fetch('/', {

        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    window.location.reload();
}

let source = new EventSource ('/stream');
source.addEventListener('inscrire-hike', (event) => {
    let data = JSON.parse(event.data);
  
    window.location.reload();
});
source.addEventListener('desinscrire-hike', (event) => {
    let data = JSON.parse(event.data);
  
    window.location.reload();
});

// Creation de event listener pour le bouton d'inscription/deinscription de chaque cartes hikes
for (let supButton of cardButtons) {
    // supButton.addEventListener('click', inscrireServeur);
    if (supButton.innerHTML === 'Subscribe') {
        supButton.addEventListener('click', inscrireServeur);
        supButton.addEventListener('click',()=>{
        supButton.innerHTML = 'Unsubscribe';
        supButton.className = 'btn btn-danger btn-lg btn-block';
        
        });
        

    } else {
        supButton.addEventListener('click', desinscrireServeur);
        supButton.addEventListener('click',()=>{
        supButton.innerHTML = 'Subscribe';
        supButton.className = 'btn btn-primary btn-lg btn-block';
       
        });
       
    }
}



