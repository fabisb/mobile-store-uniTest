import { pool } from '../../../config/db'

export default async function handler(req, res) {


    switch (req.method) {
        case 'GET':
            await getUsers(req, res)
            return
    }

}

const getUsers = async (req, res) => {
    const [getResult] = await pool.query('SELECT * FROM users')
    return res.status(200).json(getResult)

}