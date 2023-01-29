import { pool } from '../../../config/db'

export default async function handler(req, res) {


    switch (req.method) {
        case 'GET':
            await getFactura(req, res)
            return
        case 'POST':
            await saveUser(req, res)
            await saveFactura(req, res)
            return
    }

}

const saveFactura = async (req, res) => {
    console.log('creating an invoice')
    console.log(req.body)

    const { products_id, user_id, factura, cantidad } = req.body



    const [postResult] = await pool.query('INSERT INTO facturas SET ?', {
        products_id,
        factura,
        user_id,
        cantidad,
    })



    return res.status(200).json({ products_id, user_id, factura, cantidad, id: postResult.insertId })
}

const saveUser = async (req, res) => {
    console.log('creating an user')
    console.log(req.body)

    const { user_id } = req.body



    const [postResult] = await pool.query('INSERT IGNORE users SET ?', {

        cedula: user_id

    })

    return res.status(200).json({ cedula: user_id })
}


const getFactura = async (req, res) => {
    const [getResult] = await pool.query('SELECT * FROM facturas')
    return res.status(200).json(getResult)

}
