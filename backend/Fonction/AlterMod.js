function AlterMod(colonne1,newType, table){
    return `ALTER TABLE ${table} MODIFY ${colonne1} ${newType}`}

module.exports = AlterMod    