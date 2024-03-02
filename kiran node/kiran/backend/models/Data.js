const pool = require('../db');

class Data {
    static async getAllData() {
        const query = 'SELECT * FROM customer_records';
        const { rows } = await pool.query(query);
        return rows;
    }
}

module.exports = Data;
