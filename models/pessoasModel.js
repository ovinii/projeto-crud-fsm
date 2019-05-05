const findAll = (connection) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM PESSOAS', (err, results) => {
            if(!err) {
                resolve(results)
            } else {
                reject(err)
            }
        })
    })
}

const deleteOne = (connection, id) => {
    return new Promise((resolve, reject) => {
        connection.query('DELETE FROM PESSOAS WHERE ID = ' + id, (err) => {
            if(err) {
                reject(err)
            } else {
                resolve()
            }
        }) 
    })
}

const create = (connection, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO PESSOAS (NOME, NASCIMENTO, CARGO) VALUES 
        ('${data.nome}', '${data.nascimento}', '${data.cargo}')`, (err) => {
            if(err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

const findById = (connection, id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM PESSOAS WHERE ID = ' + id, (err, results) => {
            if(err) {
                reject(err)
            } else {
                if (results.length > 0) {
                    resolve(results[0])
                }else {
                    resolve({})
                }
            }
        })
    })
}

const update = (connection, id, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE PESSOAS SET NOME='${data.nome}', NASCIMENTO='${data.nascimento}', CARGO='${data.cargo}' WHERE ID='${id}'`, (err, results) => {
            if(err) {
                reject(err)
            } else {
                if (results.length > 0) {
                    resolve(results[0])
                }else {
                    resolve({})
                }
            }
        })
    })
}

module.exports = {
    findAll,
    deleteOne,
    create,
    findById,
    update
}