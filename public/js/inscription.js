
let formAuth=document.getElementById('form-auth');
let inputNom =document.getElementById('input-nom');
let inputPrenom =document.getElementById('input-prenom');
let inputCourriel =document.getElementById('input-email');
let inputNomUtilisateur =document.getElementById('input-nom-utilisateur');
let inputMotDepasse=document.getElementById('input-mot-de-passe');

formAuth.addEventListener('submit', async (event)=>{
    event.preventDefault();
    let data={
        nomUtilisateur: inputNomUtilisateur.value,
        motDePasse:inputMotDepasse.value,
        courriel:inputCourriel.value,
        nom:inputNom.value,
        prenom:inputPrenom.value
    }
    let response = await fetch('/inscription',{
    method:'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(data)
    });
    if(response.ok){
        window.location.replace('/connexion');
    }else if(response.status===409){
        ///afficher erreur dans linterface graphic et suprimer le console.log
        console.log('le nom utilisateur est deja utiliser');
    }
})