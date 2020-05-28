const { server, db } = require('./index.js')
const request = require('supertest')
const sqlite3 = require('sqlite3')

insert_sql = `INSERT INTO Product (id_categoria, descricao) VALUES (?, ?)`
new_product = [2, 'Planeta dos macacos']

// At first a new product is inserted in the database so that it can be deleted 
// afterwards to test the delete route
db.run(insert_sql, new_product, err => {
    if(err) {
        return console.error(err.message)
    } else {
        console.log('Successfully inserted element')
    }
})

select_sql = `SELECT * FROM Product ORDER BY id DESC LIMIT 1` 

// Selecting the element that was just added and storing its id in a
// global variable so that it can be accessed by the insert, update and delete routes
db.all(select_sql, [], (err, row) => {
    if(err) {
        return console.error(err.message)
    } else {
        global.globalID = row[0].id
    }
})


describe('Starting route testing', () => {

    test('Displaying all prdoucts route', async () => {
        const response = await request(server).get('/products');
        expect(response.status).toEqual(200);

        expect(response.type).toEqual('application/json')
     });

     test('Displaying a specific prdouct', async () => {
        const response = await request(server).get('/products/'+globalID);

        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json')
     });

    test('Prdoucts insertion route', async () => {
        const response = await request(server).get('/insertProduct');
        expect(response.status).toEqual(200);
     });

     test('Prdoucts update route', async () => {
        const response = await request(server).get('/updateProduct/'+globalID);
        expect(response.status).toEqual(200);
     });

     test('Deleting product from the database', async () => {
        const response = await request(server).delete('/deleteProduct/'+globalID);
        expect(response.status).toEqual(200);
        expect(response.text).toEqual('Deleted product with id: ' + globalID)
     });
}); afterAll(async () => {
        try {
            console.log('All tests finished!')
            await db.close();
            await server.close();

        } catch (error) {
        console.log('Something is wrong ' + error);
        throw error;
    }
})