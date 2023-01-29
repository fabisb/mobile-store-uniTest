import { pool } from '../../../config/db'

export default async function handler(req, res) {


    switch (req.method) {
        case 'GET':
            await getProducts(req, res)
            return
        case 'POST':
            await saveProduct(req, res)
            return
    }

}

const saveProduct = async (req, res) => {
    console.log('creating a product')
    console.log(req.body)


    const { model, capacity, price, year, marca, img } = req.body

    const [postResult] = await pool.query('INSERT INTO product SET ?', {
        model,
        capacity,
        price,
        year,
        marca,
        img,
    })

    return res.status(200).json({ model, capacity, price, marca, img, id: postResult.insertId })
}


const getProducts = async (req, res) => {
    const [getResult] = await pool.query('SELECT * FROM product')
    return res.status(200).json(getResult)

}
