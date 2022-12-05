// Aller chercher les configurations de l'application
import 'dotenv/config';

// Importer les fichiers et librairies
import express, { json, urlencoded } from 'express';
import expressHandlebars from 'express-handlebars';
import helmet from 'helmet';
import compression from 'compression';
import session from 'express-session';
import memorystore from 'memorystore';
import { getHikes, addHike, deleteHike, getInscription, getMyHikes, inscrireHike, desinscrireHike } from './model/hike.js';
import cors from 'cors';
import cspOption from './csp-options.js';
import { validateForm } from './validations.js';
import passport from 'passport';
import middlewareSse from './middleware-sse.js';
import './authentification.js'
import { addUtilisateur } from './model/utilisateur.js';

// Création de la base de données de session
const MemoryStore = memorystore(session);

// Création du serveur
const app = express();
app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');

// Ajout de middlewares
app.use(helmet(cspOption));
app.use(compression());
app.use(cors());
app.use(json());
app.use(session({
    cookie: { maxAge: 1800000 },
    name: process.env.npm_package_name,
    store: new MemoryStore({ checkPeriod: 1800000 }),
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(urlencoded({ extended: false }));
app.use(express.static('public'));


// Ajouter les routes ici ...
app.get('/', async (request, response) => {
    if (request.user) {
        let inscrit = await getInscription();
        let hike_ids = [];

        let data = [];
        for (let i = 0; i < inscrit.length; i++) {
            hike_ids.push(inscrit[i].id_hike);
        }

        let hikes = await getHikes();

        hikes.forEach(hike => {
            data.push({
                id_hike: hike.id_hike,
                nom: hike.nom,
                description: hike.description,
                capacite: hike.capacite,
                date_debut: hike.date_debut,
                nb_hike: hike.nb_hike,
                inscription: hike_ids.includes(hike.id_hike),
                checkInscription: hike.capacite > hike.nb_hike

            });
        })
        response.render('home', {
            title: 'Page d\'accueil',
            styles: ['/css/style.css'],
            scripts: ['/js/home.js'],
            acceptCookie: request.session.accept,
            user: request.user,
            admin :request.user.id_type_utilisateur == 2,
            hike: data
        });
    }
    else {
        response.redirect('/connexion')
    }
});


app.post('/', async (request, response) => {
    if(!request.user) {
        response.status(401).end();
    }
    else {
        // JE VIENS D'AJOUTER SA ET SA MARCHE PAS request.body.id_utilisateur
    let id = await inscrireHike(request.body.id);
    response.status(201).json({ id: id });
    }
});
app.delete('/', async (request, response) => {
    if(!request.user) {
        response.status(401).end();
    }
    else {
    let id = await desinscrireHike(request.body.id);
    response.status(201).json({ id: id });
    }
});

app.get('/Admin', async (request, response) => {
    if (!request.user) {
        response.status(401).end();
    }
    else if (request.user.id_type_utilisateur != 2) {
        response.status(403).end();
    }
    else {
        response.render('Admin', {
            title: 'Admin',
            styles: ['/css/Admin.css'],
            styles: ['/css/style.css'],
            scripts: ['/js/Admin.js'],
            acceptCookie: request.session.accept,
            user: request.user,
            hike: await getHikes(),

        });
    }
});
app.get('/connexion', (request, response) => {
    response.render('Connexion', {
        titre: 'Connexion',
        styles: ['/css/authentification.css', '/css/style.css'],
        scripts: ['/js/connexion.js'],
        acceptCookie: request.session.accept,
        user: request.user,
        count: request.session.accept
    });
});
app.get('/inscription', (request, response) => {
    response.render('Inscription', {
        titre: 'Inscription',
        styles: ['/css/authentification.css', '/css/style.css'],
        scripts: ['/js/inscription.js'],
        user: request.user,
        acceptCookie: request.session.accept
    });
});
app.post('/Admin', async (request, response) => {
    if (!request.user) {
        response.status(401).end();
    }
    else if (request.user.id_type_utilisateur != 2) {
        response.status(403).end();
    }
    else {
    if (!validateForm(request.body)) {
        let id = await addHike(request.body.nom, request.body.date_debut, request.body.capacite, request.body.description);
        response.status(201).json({ id: id });
    }

    else {
        console.log(request.body);
        response.status(400).end();
    }
    }
});
app.delete('/Admin', async (request, response) => {
    if (!request.user) {
        response.status(401).end();
    }
    else if (request.user.id_type_utilisateur != 2) {
        response.status(403).end();
    }
    else {

    await deleteHike(request.body.id);
    response.status(200).end();
    }
});
app.get('/MyHikes', async (request, response) => {
     if (request.user) {
    response.render('MyHikes', {
        title: 'Page d\'accueil',
        styles: ['/css/style.css'],
        scripts: ['/js/MyHikes.js'],
        acceptCookie: request.session.accept,
        user: request.user,
        admin :request.user.id_type_utilisateur == 2,
        hike: await getMyHikes(),


    });
}
    else {
        response.redirect('/Connexion');
    }
});

app.post('/accept', (request, response) => {
    request.session.accept = true;
    response.status(200).end();
});
app.post('/inscription', async (request, response, next) => {
    //mettre la validation  des champs venant du client

    if (true) {
        try {
            await addUtilisateur(request.body.nomUtilisateur, request.body.motDePasse, request.body.courriel, request.body.nom, request.body.prenom);
            response.status(200).end();
        }
        catch (error) {
            if (error.code === 'SQLITE_CONSTRAINT') {
                console.log(request.body);
                response.status(409).end();
            }
            else {
                next(error);
            }
        }
    } else {
        response.status(400).end();
    }

});
app.post('/connexion', (request, response, next) => {
    if (true) {
        passport.authenticate('local', (error, utilisateur, info) => {
            if (error) {
                next(error);
            }
            else if (!utilisateur) {
                response.status(401).json(info);
            }
            else {
                request.logIn(utilisateur, (error) => {
                    if (error) {
                        next(error);
                    } else {
                        response.status(200).end();
                    }
                })
            }
        })(request, response, next);
    } else {
        response.status(400).end();
    }
});
app.post('/deconnexion', (request, response, next) => {
    request.logOut((error) => {
        if (error) {
            next(error);
        } else {
            response.redirect('/')
        }
    })
});

// Renvoyer une erreur 404 pour les routes non définies
app.use(function (request, response) {
    // Renvoyer simplement une chaîne de caractère indiquant que la page n'existe pas
    response.status(404).send(request.originalUrl + ' not found.');
});


// Démarrage du serveur
app.listen(process.env.PORT);
console.info(`Serveurs démarré:`);
console.info(`http://localhost:${process.env.PORT}`);
