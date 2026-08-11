const express = require('express');
const cors = require('cors');
const d = require('./bdd/bdd');
const db = require('./bdd/bddVente');
const { exec } = require("child_process");
const multer = require("multer");
const fs = require("fs");
const path = require("path");



const app = express();
const PORT = 5000;
console.log('OK');

app.use(express.json());
app.use(cors());
app.use(
    "../SGBDR0_vite/src/imageVideo/",
    express.static(
        path.join(`${__dirname.slice(0,__dirname.length-7)}\SGBDR0_vite\\src`, "imagevideo")
    )
);
console.log(`${__dirname.slice(0,__dirname.length-7)}\SGBDR0_vite\\src`);

// CONFIGURATION MULTER

const upload = multer({
    dest: path.join(`${__dirname.slice(0,__dirname.length-7)}\SGBDR0_vite\\src`, "uploads")
});

// ROUTE UPLOAD

app.post("/upload", upload.single("file"), (req, res) => {

    // Aucun fichier
    if (!req.file) {
        console.log("Aucun fichier reçu");

        return res.status(400).json({
            message: "Aucun fichier reçu"
        });
    }

    console.log("=================================");
    console.log("Fichier reçu");
    console.log("Nom original :", req.file.originalname);
    console.log("Type :", req.file.mimetype);
    console.log("Taille :", req.file.size);
    console.log("Temporaire :", req.file.path);
    console.log("=================================");

    // RÉCUPÉRER LE NOM ET L'EXTENSION

    const nomOriginal = req.file.originalname;

    const extension = path.extname(nomOriginal);

    const nomSansExtension = path.basename(
        nomOriginal,
        extension
    );

    // CRÉER UN NOM UNIQUE

    const nomFichier =
        nomSansExtension +
        "_" +
        Date.now() +
        extension;


    // DOSSIER DESTINATION

    const dossierDestination = path.join(
        `${__dirname.slice(0,__dirname.length-7)}\SGBDR0_vite\\src`,
        "imageVideo"
    );


    // Créer imageVideo/ si nécessaire
    fs.mkdirSync(
        dossierDestination,
        {
            recursive: true
        }
    );

    // CHEMIN FINAL

    const destination = path.join(
        dossierDestination,
        nomFichier
    );


    // COPIER LE FICHIER

    fs.copyFile(
        req.file.path,
        destination,
        (error) => {

            if (error) {

                console.error(
                    "Erreur de copie :",
                    error
                );

                return res.status(500).json({
                    message: "Erreur lors de la copie"
                });
            }


            console.log(
                "Fichier copié vers :",
                destination
            );


            // SUPPRIMER LE FICHIER TEMPORAIRE

            fs.unlink(
                req.file.path,
                (error) => {

                    if (error) {

                        console.error(
                            "Erreur suppression temporaire :",
                            error
                        );

                    } else {

                        console.log(
                            "Fichier temporaire supprimé"
                        );
                    }
                }
            );

            // RÉPONSE AU FRONTEND

            res.status(200).json({

                message: "Fichier copié avec succès",

                nomOriginal: nomOriginal,

                nomFichier: nomFichier,

                type: req.file.mimetype,

                taille: req.file.size,

                chemin: `../SGBDR0_vite/src/imageVideo/${nomFichier}`

            });

        }
    );

});



// =================
// Insertion
// =================

app.post('/api/vente', (req, res) => {
    const { table, colonnes, values } = req.body;
    console.log("Nom de la table; " + table);
    console.log("Les colonnes: " + colonnes);
    console.log("les valeurs ajoutés: " + values);
    
    
    if (!table || !colonnes || !values || table === undefined || colonnes === undefined || values === undefined){
        return res.status(400).json({ 
            message: 'Il y a  des données obligatoires non remplis !' 
        });
    }
    let valeurs = ""
    for (let i = 0; i < values.length - 1; i++) {
        valeurs += "?,"
    }
    console.log("valeurs de values: ",values);
    
    console.log(valeurs);
    
    const query = `INSERT INTO ${table} (${colonnes}) VALUES (${valeurs} ?)`;
    
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion :', err);
            return res.status(500).json({ message: 'Erreur serveur' });
        }
        
        res.status(201).json({
            message: `Nouveau ${table} a été ajouté avec succès !`,
            id: result.insertId
        });
    });
});


// =================
// Affichage
// =================

app.get('/api/vente/:inform', (req, res) => {
    const { inform } = req.params
    const info = inform.split("§")
    const colonnes = info[0]
    const tables = info[1] 
    console.log(colonnes);
    console.log(tables);
    
    
    const query = `SELECT ${colonnes} FROM bdd_vente_en_ligne.${tables}`;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erreur de récupération :', err);
            return res.status(500).json({ message: 'Erreur serveur' });
        }
        console.log("Selection se fait avec succès")
        console.log(results);
        
        res.json(results);
    });
});


app.put('/api/vente/:id', (req, res) => {
    const { id } = req.params;
    const { table, colonnes, values } = req.body;
    values.push(parseInt(id))
    console.log(values);
    
    if (!table || !colonnes || !values) {
        return res.status(400).json({ 
            message: 'Il y a des informations obligatoires non remplis!' 
        });
    }
    
    const query = `UPDATE ${table} SET ${colonnes} WHERE id = ?`;
    
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Erreur lors de la mise à jour :', err);
            return res.status(500).json({ message: 'Erreur serveur' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'id non trouvé' });
        }
        
        res.json({
            message: 'donnée modifié avec succès !'
        });
    });
});

app.delete('/api/vente/:inform', (req, res) => {
    const { inform } = req.params
    const info = inform.split('§')
    const table = info[1]
    const id = parseInt(info[0])
    console.log(table);
    console.log(id);
    
    
    const query = `DELETE FROM ${table} WHERE id = ?`;
    
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erreur lors de suppression :', err);
            return res.status(500).json({ message: 'Erreur serveur' });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'ligne non trouvé' });
        }
        
        res.json({ message: 'Ligne supprimé avec succès !' });
    });
});


// Port de connexion 
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
    
})