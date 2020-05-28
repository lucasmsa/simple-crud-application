const { server, db } = require('./index.js')
const request = require('supertest')
const sqlite3 = require('sqlite3')

describe('Starting route testing', () => {

    //descrição do caso de testes
    test('Displaying all prdoucts route', async () => {
        //qual a rota que ele deve acessar e qual requisição deve fazer
        const response = await request(server).get('/products');
        //qual o status esperado 
        expect(response.status).toEqual(200);

        expect(response.type).toEqual('application/json')
     });

     test('Displaying a specific prdouct', async () => {
        const response = await request(server).get('/products/1');

        expect(response.status).toEqual(200);
        expect(response.type).toEqual('application/json')
     });

    test('Prdoucts insertion route', async () => {
        //qual a rota que ele deve acessar e qual requisição deve fazer
        const response = await request(server).get('/insertProduct');
        //qual o status esperado 
        expect(response.status).toEqual(200);
     });

     test('Prdoucts update route', async () => {
        //qual a rota que ele deve acessar e qual requisição deve fazer
        const response = await request(server).get('/updateProduct/1');
        //qual o status esperado 
        expect(response.status).toEqual(200);
     });
})

