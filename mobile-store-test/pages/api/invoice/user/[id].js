import { pool } from '../../../../config/db'




export default async function handler(req, res) {


    switch (req.method) {
        case 'GET':
            return await getFactura(req, res)

        default:
            break;

    }



}


const getFactura = async (req, res) => {

    const { id } = req.query
    const [result] = await pool.query('SELECT factura FROM facturas WHERE user_id = ?', id)
    return res.status(200).json(result)
}

