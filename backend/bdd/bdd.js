const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'mysql'

});


connection.connect((err) => {

    if (err) {
        console.error('Erreur de connexion à MySQL :', err);
        return;
    }

    console.log('Connecté à MySQL avec succès !');


    const createDatabaseQuery = `
        CREATE DATABASE IF NOT EXISTS bdd_vente_en_ligne
        CHARACTER SET utf8mb4
        COLLATE utf8mb4_unicode_ci
    `;

    connection.query(createDatabaseQuery, (err) => {

        if (err) {
            console.error(
                'Erreur lors de la création de la base :',
                err
            );
            return;
        }

        console.log(
            'Base "bdd_vente_en_ligne" créée ou déjà existante !'
        );

        connection.query(
            'USE bdd_vente_en_ligne',
            (err) => {

                if (err) {
                    console.error(
                        'Erreur lors de la sélection de la base :',
                        err
                    );
                    return;
                }

                console.log(
                    'Base "bdd_vente_en_ligne" sélectionnée !'
                );
                const createTableAdmin = `
                        CREATE TABLE IF NOT EXISTS t_admin (
                            id INT AUTO_INCREMENT PRIMARY KEY,

                            user VARCHAR(25) NOT NULL,

                            password TEXT,

                            date_system TIMESTAMP
                                DEFAULT CURRENT_TIMESTAMP
                        )
                
                `

                connection.query(
                    createTableAdmin,
                    (err) => {

                        if (err) {
                            console.error(
                                'Erreur création t_admin :',
                                err
                            );
                            return;
                        }

                        console.log(
                            'Table "t_admin" prête !'
                        );

                        const createTableTypeProduit = `
                                        CREATE TABLE IF NOT EXISTS t_typeProduit (
                                                id INT AUTO_INCREMENT PRIMARY KEY,
                                                nomType VARCHAR(25) NOT NULL
                                        )
                        `;

                        connection.query(
                            createTableTypeProduit,
                            (err) => {

                                if (err) {
                                    console.error(
                                        'Erreur création t_typProduit :',
                                        err
                                    );
                                    return;
                                }

                                console.log(
                                    'Table "t_typeProduit" prête !'
                                );

                                const createTableProduit = `
                                            CREATE TABLE IF NOT EXISTS t_produit (
                                                    id INT AUTO_INCREMENT PRIMARY KEY,

                                                    nom VARCHAR(25) NOT NULL,

                                                    id_typeProduit INT NOT NULL,

                                                    qte INT, 

                                                    prix_unitaire DECIMAL(10,2) NOT NULL,

                                                    date_system TIMESTAMP
                                                        DEFAULT CURRENT_TIMESTAMP,

                                                    reduction DECIMAL(5,2)
                                                        DEFAULT 0,
                                                    
                                                    CONSTRAINT fk_produit_typeProduit
                                                        FOREIGN KEY (id_typeProduit)
                                                        REFERENCES t_typeProduit(id)
                                                        ON DELETE CASCADE
                                                        ON UPDATE CASCADE
                                                    )

                                `;

                                connection.query(
                                    createTableProduit,
                                    (err) => {

                                        if (err) {
                                            console.error(
                                                'Erreur création t_produit :',
                                                err
                                            );
                                            return;
                                        }

                                        console.log(
                                            'Table "t_produit" prête !'
                                        );

                                        const createTableCaracteristique = `
                                            CREATE TABLE IF NOT EXISTS t_caracteristique (
                                                id INT AUTO_INCREMENT PRIMARY KEY,

                                                id_produit INT NOT NULL,

                                                caracteristique text
                                                    NOT NULL,

                                                CONSTRAINT fk_caracteristique_produit
                                                    FOREIGN KEY (id_produit)
                                                    REFERENCES t_produit(id)
                                                    ON DELETE CASCADE
                                                    ON UPDATE CASCADE
                                            )
                                        `;

                                        connection.query(
                                            createTableCaracteristique,
                                            (err) => {

                                                if (err) {
                                                    console.error(
                                                        'Erreur création t_caracteristique :',
                                                        err
                                                    );
                                                    return;
                                                }
                                                console.log(
                                                    'Table "t_caracteristique" prête !'
                                                );
                                                const createTableClient = `
                                                    CREATE TABLE IF NOT EXISTS t_client (
                                                        id INT AUTO_INCREMENT PRIMARY KEY,
                                                        nom VARCHAR(50) NOT NULL,
                                                        prenom VARCHAR(50) NOT NULL,
                                                        adresse VARCHAR(255),
                                                        pays VARCHAR(100)
                                                    )
                                                `;

                                                connection.query(
                                                    createTableClient,
                                                    (err) => {
                                                        if (err) {
                                                            console.error(
                                                                'Erreur création t_client :',
                                                                err
                                                            );
                                                            return;
                                                       }
                                                        console.log(
                                                            'Table "t_client" prête !'
                                                        );

                                                        const createTableVideo = `
                                                                CREATE TABLE IF NOT EXISTS t_video (
                                                                    id INT AUTO_INCREMENT PRIMARY KEY,

                                                                    id_produit INT NOT NULL,

                                                                    nom_video VARCHAR(255) NOT NULL,

                                                                    date_system TIMESTAMP
                                                                        DEFAULT CURRENT_TIMESTAMP,

                                                                    CONSTRAINT fk_video_produit
                                                                        FOREIGN KEY (id_produit)
                                                                        REFERENCES t_produit(id)
                                                                        ON DELETE CASCADE
                                                                        ON UPDATE CASCADE
                                                                )
                                                        
                                                        `
                                                        connection.query(
                                                            createTableVideo,
                                                            (err) => {
                                                                if (err) {
                                                                    console.error(
                                                                        'Erreur création t_video :',
                                                                        err
                                                                    );
                                                                    return;
                                                            }
                                                                console.log(
                                                                    'Table "t_video" prête !'
                                                                );

                                                                const createTableImage = `
                                                                        CREATE TABLE IF NOT EXISTS t_image (
                                                                            id INT AUTO_INCREMENT PRIMARY KEY,

                                                                            id_produit INT NOT NULL,
                                                                            
                                                                            nom_image VARCHAR(255) NOT NULL,
                                                                            
                                                                            date_system TIMESTAMP
                                                                                DEFAULT CURRENT_TIMESTAMP,

                                                                            CONSTRAINT fk_image_produit
                                                                                FOREIGN KEY (id_produit)
                                                                                REFERENCES t_produit(id)
                                                                                ON DELETE CASCADE
                                                                                ON UPDATE CASCADE
                                                                        )
                                                                
                                                                `
                                                                connection.query(
                                                                    createTableImage,
                                                                    (err) => {
                                                                        if (err) {
                                                                            console.error(
                                                                                'Erreur création t_image :',
                                                                                err
                                                                            );
                                                                            return;
                                                                    }
                                                                        console.log(
                                                                            'Table "t_image" prête !'
                                                                        );
                                                                        const createTableAchat = `
                                                                                CREATE TABLE IF NOT EXISTS t_achat (
                                                                                    id INT AUTO_INCREMENT PRIMARY KEY,

                                                                                    id_client INT NOT NULL,

                                                                                    id_produit INT NOT NULL,

                                                                                    prix_total DECIMAL(10,2) NOT NULL,

                                                                                    mode_paiement VARCHAR(50)
                                                                                        NOT NULL,

                                                                                    date_system TIMESTAMP
                                                                                        DEFAULT CURRENT_TIMESTAMP,

                                                                                    CONSTRAINT fk_achat_client
                                                                                        FOREIGN KEY (id_client)
                                                                                        REFERENCES t_clients(id)
                                                                                        ON DELETE CASCADE
                                                                                        ON UPDATE CASCADE,

                                                                                    CONSTRAINT fk_achat_produit
                                                                                        FOREIGN KEY (id_produit)
                                                                                        REFERENCES t_produit(id)
                                                                                        ON DELETE CASCADE
                                                                                        ON UPDATE CASCADE
                                                                                )
                                                                        
                                                                        `
                                                                        connection.query(
                                                                            createTableAchat,
                                                                            (err) => {
                                                                                if (err) {
                                                                                    console.error(
                                                                                        'Erreur création t_achat :',
                                                                                        err
                                                                                    );
                                                                                    return;
                                                                            }
                                                                                console.log(
                                                                                    'Table "t_achat" prête !'
                                                                                );


                                                                                console.log(
                                                                                    '\n======================================'
                                                                                );

                                                                                console.log(
                                                                                    'Base de données prête !'
                                                                                );

                                                                                console.log(
                                                                                    '======================================'
                                                                                );

                                                                                console.log(
                                                                                    '✓ t_admin'
                                                                                );

                                                                                console.log(
                                                                                    '✓ t_client'
                                                                                );

                                                                                console.log(
                                                                                    '✓ t_produit'
                                                                                );

                                                                                console.log(
                                                                                    '✓ t_achat'
                                                                                );

                                                                                console.log(
                                                                                    '✓ t_caracteristique'
                                                                                );

                                                                                console.log(
                                                                                    '✓ t_typeProduit'
                                                                                );

                                                                                console.log(
                                                                                    '✓ t_video'
                                                                                );

                                                                                console.log(
                                                                                    '✓ t_image'
                                                                                );

                                                                                // Fermeture de la connexion
                                                                                /*connection.end(
                                                                                    (err) => {

                                                                                        if (err) {
                                                                                            console.error(
                                                                                                'Erreur fermeture connexion :',
                                                                                                err
                                                                                            );
                                                                                            return;
                                                                                        }
                                                                                    }
                                                                                );*/                                                       
                                                                            })

                                                    
                                                                    })
                                                     
                                                            })                                                    
                                                    })

                                            }
                                        );
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    });
});




module.exports = connection;