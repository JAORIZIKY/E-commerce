function Create(name, typeData, colonne) {
    if (typeData == "db" && colonne == null){
        console.log('Création de la base');
        
        return `CREATE DATABASE IF NOT EXISTS ${name}`
    }else{
        console.log('table');
        return `CREATE TABLE IF NOT EXISTS ${name} (${colonne})`
    }
}

module.exports = Create