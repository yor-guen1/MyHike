import { existsSync } from 'fs';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

/**
 * Constante indiquant si la base de données existe au démarrage du serveur 
 * ou non.
 */
const IS_NEW = !existsSync(process.env.DB_FILE)

/**
 * Crée une base de données par défaut pour le serveur. Des données fictives
 * pour tester le serveur y ont été ajouté.
 */
const createDatabase = async (connectionPromise) => {
    let connection = await connectionPromise;

    await connection.exec(
        `CREATE TABLE IF NOT EXISTS type_utilisateur(
            id_type_utilisateur INTEGER PRIMARY KEY,
            type TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS utilisateur(
            id_utilisateur INTEGER PRIMARY KEY,
            id_type_utilisateur INTEGER NOT NULL,
            nom_utilisateur TEXT NOT NULL,
            courriel TEXT NOT NULL UNIQUE,
            mot_passe TEXT NOT NULL,
            prenom TEXT NOT NULL,
            nom TEXT NOT NULL,
            CONSTRAINT fk_type_utilisateur 
                FOREIGN KEY (id_type_utilisateur)
                REFERENCES type_utilisateur(id_type_utilisateur) 
                ON DELETE SET NULL 
                ON UPDATE CASCADE
        );
        
        CREATE TABLE IF NOT EXISTS hike(
            id_hike INTEGER PRIMARY KEY AUTOINCREMENT,
            nom TEXT NOT NULL,
            description TEXT NOT NULL,
            capacite INTEGER NOT NULL,
            date_debut INTEGER NOT NULL,
            nb_hike INTEGER NOT NULL
        );
        
        CREATE TABLE IF NOT EXISTS hike_utilisateur(
            id_hike INTEGER,
            id_utilisateur INTEGER,
            PRIMARY KEY (id_hike, id_utilisateur),
            CONSTRAINT fk_hike_utilisateur 
                FOREIGN KEY (id_hike)
                REFERENCES hike(id_hike) 
                ON DELETE SET NULL 
                ON UPDATE CASCADE,
            CONSTRAINT fk_utilisateur_hike 
                FOREIGN KEY (id_utilisateur)
                REFERENCES utilisateur(id_utilisateur) 
                ON DELETE SET NULL 
                ON UPDATE CASCADE
        );
        
        INSERT INTO type_utilisateur (type) VALUES 
            ('regulier'),
            ('administrateur');

        INSERT INTO utilisateur (id_type_utilisateur,nom_utilisateur, courriel, mot_passe, prenom, nom) VALUES 
            (2, 'kocylabbas', 'kocylabbas@gmail.com', '$2b$10$SRmyYhEapDBQWh73MzW5SuBx6kI3ucT/l2m/5uFBAWpR5JF55AoXq', 'Kocyl', 'Abbas'),
            (1, 'yorguen', 'yorguen@gmail.com', '$2b$10$oFgYJneF/kQWauQyCQyoLeBzKcNVzOPeKqvNT.rxdoGYFJ3BToxuO', 'Yorguen', 'M'),
            (2, 'admin', 'admin@admin.com', '$2y$10$PrEATC9Qs0y/qdv6AVImreuUcjcEp8jut9VaD.BbGDNJ2D9VhYY.6', 'Admin', 'Admin');
            (2, 'admin03', 'admin01@gmail.com', '$2y$10$PrEATC9Qs0y/qdv6AVImreuUcjcEp8jut9VaD.BbGDNJ2D9VhYY.6', 'Admin01', 'Admin01');
            
        INSERT INTO hike (nom, date_debut, nb_hike, capacite, description) VALUES 
            ('Luskville Falls', 1662508800000, 12, 12, 'This trail offers amazing views of the surrounding area and a few waterfalls. While the waterfalls may not be very active during the dry season. The difficulty level of this trail is largely due to the initial incline which can be intense.'),
            ('Mont King', 1662681600000, 10, 24, 'For such a short hike, you get breathtaking and clear views of the region, including of Gatineau and Ottawa. There is even a little lake where there is usually beaver activity.'),
            ('Tomato Hill', 1661522400000, 8, 20, 'Situated on the Western section of the Eardley Escarpment, this trail offers breathtaking lookout point of the Outaouais River and the surrounding area. For a trail that is not too difficult, this is a great trail to do on the weekend. '),
            ('Grandview Loop', 1662418800000, 9, 10, 'This loop is essentially this first part of the Yellow Box Trail. For such a short hike, you get unbelievable views. Because it only takes 2 hours to complete,'),
            ('Wolf Trail', 1662465600000, 15, 25, 'The Wolf trail is a classic among hikers of the Gatineau Park. It offers amazing views not only of the interior of the Gatineau Park, but also of the Outaouais River. The last lookout point (complete the trail counterclockwise) offers a great view of the sunset'),
            ('Lusk Cave Trail', 1662588000000, 5, 15, 'This is probably the most unique trail in the entire Gatineau Park. While the trail itself is relatively ordinary, passing along the beautiful Philippe Lake and Lusk Lake, the key attraction is the Lusk Cave system. This cave system can be explored (at your own risk)'),
            ('Pink Lake', 1667257200000, 1, 45, 'The Pink Lake trail is probably one of the most popular trails in the Gatineau Park for first-time visitors and hiking enthusiasts alike. With its turquoise green, sometimes bleu water, the Pink Lake is absolutely beautiful, especially on a nice summer day');
        
`
    );

    return connection;
}

// Base de données dans un fichier
export let promesseConnexion = open({
    filename: process.env.DB_FILE,
    driver: sqlite3.Database
});

// Si le fichier de base de données n'existe pas, on crée la base de données
// et on y insère des données fictive de test.
if (IS_NEW) {
    promesseConnexion = createDatabase(promesseConnexion);
}

