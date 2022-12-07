export const EmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export const PasswordValid = (password) => {
    const standard = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{4,})");
    return standard.test(password);
};

export function UserNameValid(username){
    var usernameR = /^[a-zA-Z0-9]/;
    return usernameR.test(username);
  };

//validation du nom
export const validateNom = (nom) => {
    return typeof nom === 'string' && !!nom;
}