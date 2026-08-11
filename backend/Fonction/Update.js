function Update(colonne, table, condition) {
    return `UPDATE ${table} SET ${colonne} WHERE ${condition}`
}

module.exports = Update