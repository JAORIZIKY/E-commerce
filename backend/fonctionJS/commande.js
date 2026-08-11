const { exec, spawn, fork, execFile } = require("child_process");
function Commande(source) {
    exec(`cd ${source} ` , (erreur, sortie, erreurs) => {

        if (erreur) {
            console.log(erreur);
            return;
        }

        console.log("Rep: " + sortie);
        return
    });
    
}
Commande()
module.exports = Commande
