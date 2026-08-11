function Insert(colonne, table) {
    let resultat = "VALUES("
    const col = colonne.split(',')
    for (let i = 0; i < col.length; i++) {
        if  (i === col.length - 1) {
            resultat += '?)'
            
        }else{
            resultat += "?,"
            
        }
    }
    return `INSERT INTO ${table} (${colonne}) ${resultat}`
}

module.exports = Insert