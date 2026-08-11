const mysql = require('mysql2')
const connex = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'bdd_vente_en_ligne'

});

connex.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à  Mysql:', err);
        return;
    }
    console.log("Connexion avec bdd_vente_en_ligne a réussi");
    
})

module.exports = connex;