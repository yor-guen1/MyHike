//validation de l'email
export const EmailValid = (email) => {
    const re = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
    return re.test(email);
};

//validation du motdepasse
export const PasswordValid = (password) => {
    const standard = new RegExp("(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}");
    return standard.test(password);
};

//validation du username
export const UserNameValid=(username)=>{
    const usernameR = new RegExp("^[a-zA-Z0-9]{4,10}$");
   return usernameR.test(username);
 };


//validation du nom
export const validateNom = (nom) => {
    return typeof nom === 'string' && !!nom;
}

// cette fonction valide l'inscription coté serveur
export const inscriptioValide=(body) => {

    return UserNameValid(body.nomUtilisateur) &&

    PasswordValid(body.motDePasse) &&

    EmailValid(body.courriel) &&

    validateNom(body.nom) &&

    validateNom(body.prenom);
}

// cette fonction valide la connexion coté serveur
export const ValidateConnexion=(body)=>{
    return UserNameValid(body.nomUtilisateur) &&
    PasswordValid(body.motDePasse);

}


