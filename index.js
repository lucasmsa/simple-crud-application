const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const ejs = require('ejs')
var DataTypes = require('sequelize/lib/data-types')
const sqlite3 = require('sqlite3')
var router = express.Router()

const app = express()
const db = new sqlite3.Database('./database/products.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, err => {
    if (err) {
        console.error(err.message)
    } else {
        console.log('Successfully connected to SQLite products db')
    }
});


app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

// Add headers
// This is used to allow React to interact with Node
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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

// Insert a product, with category ID and its description
app.route('/insertProduct') 
    .get((req, res) => {
        res.render('insert')
    })
    .post((req, res) => {
        let stringfiedReq = req.body
        let stringToParse = Object.keys(stringfiedReq)[0]
        let product = JSON.parse(stringToParse).newProduct

        insert_sql = `INSERT INTO Product (id_categoria, descricao) VALUES (?, ?)`
        new_product = [product.id_categoria, product.descricao]

        db.run(insert_sql, new_product, err => {
            if(err) {
                return console.error(err.message)
            } else {
                console.log('Successfully inserted a new product')
            }
        })

        res.redirect('/products')
})

// Update a product given its id
app.route('/updateProduct/:product_id')
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
    .put((req, res) => {
        let stringfiedReq = req.body
        let stringToParse = Object.keys(stringfiedReq)[0]
        let product = JSON.parse(stringToParse).newProduct

        const update_list = [product.product_desc, product.category_id, req.params.product_id]
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

// Deletes a product based on its id
app.delete('/deleteProduct/:product_id', (req, res) => {
    const id_delete = req.params.product_id
    const delete_sql = `DELETE FROM Product WHERE id = ?`
    db.run(delete_sql, id_delete, err => {
        if(err) {
            return console.error(err.message)
        } else {
            res.send('Deleted product with id: ' + id_delete)
        }
    })
})

// Returns all categories
app.get('/categories', (req, res) => {

    const products = "SELECT * FROM Category ORDER BY id"

    db.all(products, [], (err, rows) => {
        if (err){
            return console.error(err.message)
        } else {
            res.json(rows)
        }
    })
})

// Returns a determined category given its primary key (id)
app.get('/categories/:category_id', (req, res) => {
    const category_id = req.params.category_id
    const find_category = `SELECT * FROM Category WHERE id == ${category_id}`
    db.all(find_category, [], (err, result) => {
        if (err){
            return console.error(err.message)
        } else {
            res.json(result)   
        }
    })
})

// Insert a product, with category ID and its description
app.route('/insertCategory') 
    .get((req, res) => {
        res.render('insert')
    })
    .post((req, res) => {
        let stringfiedReq = req.body
        let stringToParse = Object.keys(stringfiedReq)
        let product = JSON.parse(stringToParse).newCategory

        insert_sql = `INSERT INTO Category (categoria) VALUES (?)`
        new_product = [product.categoria]

        db.run(insert_sql, new_product, err => {
            if(err) {
                return console.error(err.message)
            } else {
                console.log('Successfully inserted a new category')
            }
        })

        res.redirect('/categories')
})

// Update a product given its id
app.route('/updateCategory/:category_id')
    .get((req, res) => {
        const find_category = `SELECT * FROM Category WHERE id == ${req.params.category_id}`
        db.all(find_category, [], (err, result) => {
            if (err){
                return console.error(err.message)
            } else {
                res.render('update', {
                             product_id: result[0].id,
                             product_desc: result[0].categoria,
                             category_id: result[0].categoria
                        })
                    }
                }
            )
        })
    .put((req, res) => {

        let stringfiedReq = req.body
        let stringToParse = Object.keys(stringfiedReq)
        let product = JSON.parse(stringToParse).newCategory

        const update_sql = `UPDATE Category SET categoria = ? WHERE (id = ?)`
        const update_list = [product.categoria, req.params.category_id]

        db.run(update_sql, update_list, (err, result) => {
            if(err) {
                return console.error(err.message)
            } else {
                res.redirect('/categories/'+req.params.category_id)
            }
        })
    })

// Deletes a category based on its id
app.delete('/deleteCategory/:category_id', (req, res) => {
    const id_delete = req.params.category_id
    const delete_sql = `DELETE FROM Category WHERE id = ?`
    db.run(delete_sql, id_delete, err => {
        if(err) {
            return console.error(err.message)
        } else {
            res.send('Deleted category with id: ' + id_delete)
        }
    })
})

// Getting all products from a certain category
app.get('/productsInCategory/:category_id', (req, res) => {

    const find_products = `SELECT * FROM Product WHERE id_categoria == ${req.params.category_id}`
    db.all(find_products, [], (err, result) => {
        if (err){
            return console.error(err.message)
        } else {
            if(result.length){
                const category_description = `SELECT * FROM Category WHERE id == ${result[0].id_categoria}`
                db.all(category_description, [], (err, result_category) => {
                    if(err){
                        return console.error(err.message)
                    } else {
                        const category_id = result[0].id_categoria
                        result[0].id_categoria = result_category
                        res.json(result)
                    }
                })
            } else {
                noProducts = [{
                    descricao: 'No products in this category'
                }]
                res.json(noProducts)
            }
        }
    })
})

const port = 5000
const server = app.listen(port, () => {
  console.log('Server listening on port ' + port)
})

module.exports = { server, db }

