
const pool = require('./connect')
function querytEqdm(addSql, addSql_params) {
    let promise = new Promise(function (resolve, reject) {
        pool.query(addSql, addSql_params, function (err, results) {
            if (err) throw err;
            resolve(results)
        })
    })
    return promise
}
module.exports = {
    querytEqdm
}