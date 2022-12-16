let addButton = document.getElementById('add-submit');
let addNom = document.getElementById('form-nom');
let errorNom = document.getElementById('error-nom');
let addDateDebut = document.getElementById('form-dateDebut');
let errordate = document.getElementById('error-date');
let addCapacite = document.getElementById('form-capacite');
let errorCapacity = document.getElementById('error-capacity');
let addDescription = document.getElementById('form-description');
let errorDescription = document.getElementById('error-description');
let form = document.getElementById('form-hike');
let divRow = document.getElementById('row');
let liste=document.getElementById('list');
let trList=document.getElementById('list-tr');


let cardButtons = document.querySelectorAll('#liste-card button');

// let listeBtn=document.getElementById('list-btn');


// const showliste = () => {
//     liste.style.display = 'block';
// }

// listeBtn.addEventListener('click',showliste);
    


//********************validations************ */
const validateNom = () => {
    if(addNom.validity.valid) {
        errorNom.style.display = 'none';
    }
    else if(addNom.validity.valueMissing) {
        errorNom.innerText = 'Ce champ est requis';
        errorNom.style.display = 'block';
    }
}
form.addEventListener('submit', validateNom);


const validateDate = () => {

      if(addDateDebut.validity.valueMissing) {
        errordate.innerText = 'Ce champ est requis';
        errordate.style.display = 'block';
    }
 
    
    else if (addDateDebut.validity.valid) {
        errordate.style.display = 'none';
    }
    else{
        errordate.innerText = 'la date n"est pas valide';
        errordate.style.display = 'block';

    }
}
form.addEventListener('submit', validateDate);

const validateCapacity = () => {
    

    if(addCapacite.validity.valueMissing) {
        errorCapacity.innerText = 'Ce champ est requis';
        errorCapacity.style.display = 'block';
    }
   
    else if(addCapacite.validity.rangeUnderflow) {
        errorCapacity.innerText = 'La valeur doit être plus grande que 0';
        errorCapacity.style.display = 'block';
    }
    else if(addCapacite.validity.rangeOverflow) {
        errorCapacity.innerText = 'La valeur ne doit pas dépasser 50';
        errorCapacity.style.display = 'block';
    }
    else if(addCapacite.validity.valid) {
        errorCapacity.style.display = 'none';
    }
}
form.addEventListener('submit', validateCapacity);


const validateDescription = () => {
    if(addDescription.validity.valid) {
        errorDescription.style.display = 'none';
    }
    else if(addDescription.validity.valueMissing) {
        errorDescription.innerText = 'Ce champ est requis';
        errorDescription.style.display = 'block';
    }
    else if(addDescription.validity.tooShort) {
        errorDescription.innerText = 'Le message doit avoir au moins 10 caractères';
        errorDescription.style.display = 'block';
    }
    else if(addDescription.validity.tooLong) {
        errorDescription.innerText = 'Le message doit avoir au maximum 2000 caractères';
        errorDescription.style.display = 'block';
    }
}

form.addEventListener('submit', validateDescription);


/*************************fin validations */

// Fonction pour la creation dynamique d'une carte hike du cote client
const addHikeClient = (id, dateDebut, nom, Capacite, Description) => {

    //  if(!form.checkValidity()) {
    //      return;
    //  }
   
    let div = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let div4 = document.createElement('div');
    let div5 = document.createElement('div');
    let ul = document.createElement('ul');
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    let tr = document.createElement('tr');
    let th1 = document.createElement('th');
    let th2 = document.createElement('th');
    let h3 = document.createElement('h3');
    let h5 = document.createElement('h5');
    let p = document.createElement('p');
    let img = document.createElement('img');
    let h52 = document.createElement('h5');
    let h53 = document.createElement('h5');
    let button1 = document.createElement('BUTTON');

    div.classList.add('col-lg-4');
    div.classList.add('col-md-4');
    div.classList.add('mb-2');
    div.id = id;
    div2.classList.add('card');
    div2.classList.add('h-100');
    div3.classList.add('card-body');
    div4.classList.add('card-footer');
    div4.id = "card-footer";
    div5.classList.add('participants');

    ul.id = "list";
    ul.classList.add('col-1');
    ul.classList.add('col-md-1');
    ul.classList.add('mb-1');

    tbody.id = "list-tbody";

    table.classList.add('table');
    table.classList.add('table-striped');

    th1.scope = 'col';
    th1.innerText = "ID";
    th2.scope = 'col';
    th2.innerText = "Username";

    h3.classList.add('card-title');
    h3.innerText = nom;
     /****************************** personalisatin de la date */
     let date=new Date(dateDebut);    
     dateDebut=  date.toDateString()+", "+date.getHours() + ":" + date.getMinutes();
     h5.innerText = dateDebut;
     /****************************** */


    p.classList.add('card-text');
    p.innerText = Description;

    div3.append(h3);
    div3.append(h5);
    div3.append(p);

    img.src = "./img/person.svg";

    h52.innerText = "0";
    h53.innerText = "/" + Capacite;

    div5.append(img);
    div5.append(h52);
    div5.append(h53);

    button1.classList.add('btn');
    button1.classList.add('btn-danger');
    button1.classList.add('btn-lg');
    button1.classList.add('btn-block');
    button1.id = id;
    button1.innerText = "Delete";
    button1.addEventListener('click', deleteHikeServeur);


    div4.append(div5);
    div4.append(button1);

    tr.append(th1);
    tr.append(th2);
    thead.append(tr);
    table.append(thead);
    table.append(tbody);
    ul.append(table);

    div2.append(div3);
    div2.append(ul);
    div2.append(div4);

    div.append(div2);

    divRow.append(div);
}

// Fonction qui ajoute le nouveau hike a la base de donnees et fait appel a la fonction addHikeClient pour ajouter le hike
// du cote client sans avoir besoin de refresh la page
const addHikeServeur = async (event) => {
    event.preventDefault();

    if(!form.checkValidity()) {
        return;
    }
    
    let data = {
        nom: addNom.value,
        date_debut:addDateDebut.value,
        id: event.currentTarget.id,
        capacite:addCapacite.value,
        description:addDescription.value
    }

    let response = await fetch('/Admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if(response.ok) {
        let data = await response.json();
        //addHikeClient(data.id, addDateDebut.value, addNom.value, addCapacite.value, addDescription.value);
        addNom.value='';
        addDateDebut.value='';
        addCapacite.value='';
        addDescription.value='';
        cardButtons = document.querySelectorAll('#liste-card button');
        for(let supButton of cardButtons )
        {supButton.addEventListener('click', deleteHikeServeur);}
    }
}

// Fonction qui supprime le div contenant la carte hike qui duquel le bouton supprimer a ete peser
const deleteHikeClient = (id) => {

    let divDel = document.getElementById(id);
    
    divDel.remove();
}

// Fonction qui supprime le hike de la base de donnee et fait appel a deleteHikeClient pour supprimer le hike dynamiquement sans avori besoin de refresh la page
const deleteHikeServeur = async (event) => {
    event.preventDefault();
    let data = {
      id: event.currentTarget.id
    }

    deleteHikeClient(data.id);

    let response = await fetch('/Admin', {
        
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

}
const addListeInscription = (id_utilisateur, nom_utilisateur, id_hike) => {
    let card = document.getElementById(id_hike);
    let tbody =card.querySelector('tbody');
    let tr = document.createElement('tr');
    tr.setAttribute('data-id',id_utilisateur);
    let th = document.createElement('th');
    let td1 = document.createElement('td');
    //let td2 = document.createElement('td');

    th.scope = 'row';
    th.id = "th-id";

    td1.id = "td-prenom";

    th.innerText=id_utilisateur;
    td1.innerText=nom_utilisateur;
    //td2.innerText=prenom;
    tr.append(th);
    tr.append(td1);
    //tr.append(td2);
    tbody.append(tr);

}
const deleteListeInscription = (id,id_utilisateur) => {

    let card = document.getElementById(id);
    let tr=card.querySelector('tr[data-id="'+id_utilisateur+'"]');

}
let source = new EventSource ('/stream');
source.addEventListener('inscrire-hike', (event) => {
    let data = JSON.parse(event.data);
    addListeInscription(data.id_utilisateur,data.nom_utilisateur, data.id_hike);
    
});
source.addEventListener('desinscrire-hike', (event) => {
    let data = JSON.parse(event.data);
    deleteListeInscription(data.id,data.id_utilisateur);
    
});

source.addEventListener('add-hike', (event) => {
    let data = JSON.parse(event.data);
  
    addHikeClient(data.id, data.date_debut, data.nom, data.capacite, data.description);
});
source.addEventListener('delete-hike', (event) => {
    let data = JSON.parse(event.data);
    deleteHikeClient(data.id);
});
// Creation d'un event listener pour les boutons supprimer de tout les cartes hikes qui fait appel a la fonction deleteHikeServer
for(let supButton of cardButtons )
{supButton.addEventListener('click', deleteHikeServeur);}

// Creation d'un event listener pour le bouton de creation de hike
form.addEventListener('submit', addHikeServeur);