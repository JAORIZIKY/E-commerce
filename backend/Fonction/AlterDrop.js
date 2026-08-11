function AlterDrop(colonne, table){
    return `ALTER TABLE ${table} DROP ${colonne}`}

module.exports = AlterDrop    