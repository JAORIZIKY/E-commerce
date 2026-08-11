function AlterAdd(colonne, table){
    return `ALTER TABLE ${table} ADD ${colonne}`}

module.exports = AlterAdd    