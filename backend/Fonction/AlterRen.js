function AlterRen(colonne1,toColonne2, table){
    return `ALTER TABLE ${table} CHANGE ${colonne1} ${toColonne2}`}

module.exports = AlterRen    