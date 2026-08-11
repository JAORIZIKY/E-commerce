const bdd = require('../bdd/bdd')

function Select(colonne, table, condition, ordre){
  if (condition != null){
    return `SELECT ${colonne} FROM ${table}`
  }else {
    return `SELECT ${colonne} FROM ${table}`
  }
}

module.exports = Select