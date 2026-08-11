function Delete(table, condition){
    return `DELETE FROM ${table} ${condition}`
}

module.exports = Delete