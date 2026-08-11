function Drop(name, typeData) {
    if (typeData == "db"){
        console.log('Suppression de la base');
        
        return `DROP DATABASE IF EXISTS ${name}`
    }else{
        console.log('Suppression de la table');
        return `DROP TABLE IF EXISTS ${name} `
    }
}

module.exports = Drop