const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const ejs = require('ejs')
var DataTypes = require('sequelize/lib/data-types')
const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
const Sequelize = require('sequelize')
const path = require('path')

const app = express()
const db = new sqlite3.Database('./database/products.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, err => {
    if (err) {
        console.error(err.message)
    } else {
        console.error('Successfully connected to SQLite products db')
    }
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

// Returns all products
app.get('/products', (req, res) => {
    const products = "SELECT * FROM Product ORDER BY id"
    db.all(products, [], (err, rows) => {
        if (err){
            return console.error(err.message)
        } else {
            res.json(rows)
        }
    })
})

// Returns a determined product given its primary key (id)
app.get('/products/:product_id', (req, res) => {
    const prod_id = req.params.product_id
    const find_product = `SELECT * FROM Product WHERE id == ${prod_id}`
    db.all(find_product, [], (err, result) => {
        if (err){
            return console.error(err.message)
        } else {
            const category_description = `SELECT * FROM Category WHERE id == ${result[0].id_categoria}`

            // Changing the category ID to contain both category ID and the category description
            // by finding the category ID on the category table
            db.all(category_description, [], (err, result_category) => {
                if(err){
                    return console.error(err.message)
                } else {
                    const category_id = result[0].id_categoria
                    result[0].id_categoria = result_category
                    res.json(result)
                }
            })
            
        }
    })
})

// Deletes a product based on its id
app.get('/delete/:product_id', (req, res) => {
    const id_delete = req.params.product_id
    const delete_sql = `DELETE FROM Product WHERE id = ?`
    db.run(delete_sql, id_delete, err => {
        if(err) {
            return console.error(err.message)
        } else {
            console.log('Product deleted successfully')
            res.redirect('/products')
        }
    })
})

// Insert a product, with category ID and its description
app.route('/insert') 
    .get((req, res) => {
        res.render('insert')
    })
    .post((req, res) => {

        insert_sql = `INSERT INTO Product (id_categoria, descricao) VALUES (?, ?)`
        new_product = [req.body.category_id, req.body.product_desc]

        db.run(insert_sql, new_product, err => {
            if(err) {
                return console.error(err.message)
            } else {
                console.log('Successfully inserted categories')
            }
        })

        res.redirect('/products')
})

// Update a product given its id
app.route('/update/:product_id')
    .get((req, res) => {
        const find_product = `SELECT * FROM Product WHERE id == ${req.params.product_id}`
        db.all(find_product, [], (err, result) => {
            if (err){
                return console.error(err.message)
            } else {
                res.render('update', {
                             product_id: result[0].id,
                             product_desc: result[0].descricao,
                             category_id: result[0].id_categoria
                        })
                    }
                }
            )
        })
    .post((req, res) => {
        const update_list = [req.body.product_desc, req.body.category_id, req.params.product_id]
        const update_sql = `UPDATE Product SET descricao = ?, id_categoria = ? WHERE (id = ?)`
        db.run(update_sql, update_list, (err, result) => {
            if(err) {
                return console.error(err.message)
            } else {
                console.log(result)
                res.redirect('/products/'+req.params.product_id)
            }
        })
    })

app.get('/new', (req, res) => {
    res.render('new')
})


app.listen(3000, () => {
  console.log('Server listening on port 3000')
})

// db.close(err => {
//     if(err){
//         console.error(err.message)
//     } else {
//         console.log('Successfully closed db')
//     }
// })
