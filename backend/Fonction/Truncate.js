function Truncate(name, typeData) {
    if (typeData == "db"){
        console.log('Réinitialisation de la base');
        
        return `TRUNCATE DATABASE IF EXISTS ${name}`
    }else{
        console.log('Réinitialisation de la table');
        return `TRUNCATE TABLE IF EXISTS ${name})`
    }
}

module.exports = Truncate