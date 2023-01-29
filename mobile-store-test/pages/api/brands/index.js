import { pool } from '../../../config/db'

export default async function handler(req, res) {


    switch (req.method) {
        case 'GET':
            await getMarcas(req, res)
            return
        case 'POST':
            await saveMarcas(req, res)
            return
    }

}

const saveMarcas = async (req, res) => {
    console.log('creating a Marca')
    console.log(req.body)


    const { name } = req.body

    const [postResult] = await pool.query('INSERT INTO marcas SET ?', {
        name,
    })

    return res.status(200).json({ name, id: postResult.insertId })
}


const getMarcas = async (req, res) => {
    const [getResult] = await pool.query('SELECT * FROM marcas')
    return res.status(200).json(getResult)

}
