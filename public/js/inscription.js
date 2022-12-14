
let formAuth=document.getElementById('form-auth');
let inputNom =document.getElementById('input-nom');
let erreurinputNom =document.getElementById('error-name');
let inputPrenom =document.getElementById('input-prenom');
let erreurinputprenom =document.getElementById('error-prenom');
let inputNomUtilisateur =document.getElementById('input-nom-utilisateur');
let erreurinputNomUtilisateur =document.getElementById('error-nom-utilisateur');
let inputCourriel =document.getElementById('input-email');
let erreurinputemail =document.getElementById('error-email');
let inputMotDepasse=document.getElementById('input-mot-de-passe');
let erreurinputmotdepasse =document.getElementById('error-mot-de-passe');

/*********validate name */
const validateName = () => {
    if(inputNom.validity.valid) {
        erreurinputNom.style.display = 'none';
    }
    else if(inputNom.validity.valueMissing) {
        erreurinputNom.innerText = 'This field is required';
        erreurinputNom.style.display = 'block';
    }
}



formAuth.addEventListener('submit', validateName);

/***********validatePrenom********* */
const validatePrenom = () => {
    if(inputPrenom.validity.valid) {
        erreurinputprenom.style.display = 'none';
    }
    else if(inputPrenom.validity.valueMissing) {
        erreurinputprenom.innerText = 'This field is required';
        erreurinputprenom.style.display = 'block';
    }
}

formAuth.addEventListener('submit', validatePrenom);

/**************validateNomUtilisateur**************** */


const validateNomUtilisateur = () => {
    if(inputNomUtilisateur.validity.valid) {
        erreurinputNomUtilisateur.style.display = 'none';
    }
    else if(inputNomUtilisateur.validity.valueMissing) {
        erreurinputNomUtilisateur.innerText = 'This field is required';
        erreurinputNomUtilisateur.style.display = 'block';
    }
    else if (inputNomUtilisateur.validity.patternMismatch ){
        erreurinputNomUtilisateur.innerText = 'Please enter a user name that consists of one or more letters or digits, and is at least 4 characters long and 10  characters max .';
        erreurinputNomUtilisateur.style.display = 'block';

    }
}

formAuth.addEventListener('submit', validateNomUtilisateur);


/**************validateEmail************ */

const validateEmail = () => {
    if(inputCourriel.validity.valid) {
        erreurinputemail.style.display = 'none';
    }
    else if(inputCourriel.validity.valueMissing) {
        erreurinputemail.innerText = 'This field is required';
        erreurinputemail.style.display = 'block';
    }
    else if (inputCourriel.validity.patternMismatch ){
        erreurinputemail.innerText = 'Please enter a valid email address .For example, {someone@example.com} is a valid email address.';
        erreurinputemail.style.display = 'block';

    }
}

formAuth.addEventListener('submit', validateEmail);

/*****************validatePasswordd********************* */

const validatePasswordd = () => {
    if(inputMotDepasse.validity.valid) {
        erreurinputmotdepasse.style.display = 'none';
    }
    else if(inputMotDepasse.validity.valueMissing) {
        erreurinputmotdepasse.innerText = 'This field is required';
        erreurinputmotdepasse.style.display = 'block';
    }
    else if (inputMotDepasse.validity.patternMismatch ){
        erreurinputmotdepasse.innerText = 'Please enter a password that is at least 8 characters long and contains at least one digit, one lowercase letter, and one uppercase letter. For example, {Abc1234} is a valid password';
        erreurinputmotdepasse.style.display = 'block';

    }
}

formAuth.addEventListener('submit', validatePasswordd);
/****************************************************** */

formAuth.addEventListener('submit', async (event)=>{

    event.preventDefault();

      //validation du form
   if (!formAuth.checkValidity()){

    return;
   }

    
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
        
    }
})