let formAuth = document.getElementById('form-auth');
let inputNomUtilisateur = document.getElementById('input-nom-utilisateur');
let inputMotDepasse = document.getElementById('input-mot-de-passe');
let incorrectPasswordDiv = document.getElementById('password-message');
let incorrectUsernameDiv = document.getElementById('username-message');

const MotDePasseInvalide = () => {
    let p = document.createElement('p');
    p.classList.add('incorrect');
    p.innerText = "The password is incorrect";

    incorrectPasswordDiv.append(p);
}

const UsernameInvalide = () => {
    let p = document.createElement('p');
    p.classList.add('incorrect');
    p.innerText = "Username is incorrect";

    incorrectUsernameDiv.append(p);
}

formAuth.addEventListener('submit', async (event) => {
    event.preventDefault();
    let data = {
        nomUtilisateur: inputNomUtilisateur.value,
        motDePasse: inputMotDepasse.value
    }
    let response = await fetch('/connexion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        
        window.location.replace('/');
    } 
    else if (response.status === 401) {
        
        let info = await response.json();
        if (info.erreur === 'erreur_nom_utilisateur') {
            incorrectUsernameDiv.innerHTML = '';
            incorrectPasswordDiv.innerHTML = '';
            UsernameInvalide();
        }
        else if (info.erreur === 'erreur_mot_de_passe') {
            incorrectUsernameDiv.innerHTML = '';
            incorrectPasswordDiv.innerHTML = '';
            MotDePasseInvalide();
        }
    }
});