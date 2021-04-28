let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);

const url = 'http://localhost:3000/api';
let token = "";

// Validacion de registro -----------------------------------------------------
describe('Registro', () => {
    it('- Deberia crear un usuario: { "username":"wolox" , "password":"test2021" }', (done) => {
        chai.request(url)
            .post('/user/add')
            .send({ username: "wolox", password: "test2021", firstname: "luciano", lastname: "raso", money: "usd" })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('- Deberia rechazar username preexistente: { "username":"wolox" , "password":"test1234" }', (done) => {
        chai.request(url)
            .post('/user/add')
            .send({ username: "wolox", password: "test1234", firstname: "pepe", lastname: "test", money: "usd" })
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done();
            });
    });
});

// Validacion de login --------------------------------------------------------
describe('Login', () => {
    it('- Deberia loguear un usuario: {"username":"wolox" , "password":"test2021" }', (done) => {
        chai.request(url)
            .post('/user/login')
            .send({ username: "wolox", password: "test2021" })
            .end(function(err, res) {
                token = res.body.token
                expect(res).to.have.status(200);
                done();
            });
    });

    it('- Deberia rechazar pass erronea: {"username": "wolox" , "password" : "test1234"}', (done) => {
        chai.request(url)
            .post('/user/login')
            .send({ username: "wolox", password: "test1234" })
            .end(function(err, res) {
                expect(res).to.have.status(400);
                done();
            });
    });
});

// Validacion de listado de cryptos -------------------------------------------
describe('Listado de cryptos: ', () => {
    it('- Deberia listar todas las cryptos', (done) => {
        chai.request(url)
            .get('/coins')
            .set({ 'token': token })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('- Deberia listar todas las cryptos del usuario', (done) => {
        chai.request(url)
            .get('/user/coins')
            .set({ 'token': token })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });

});

// Validacion de cryptos por usuario ------------------------------------------
describe('Add/remove de cryptos: ', () => {
    it('- Deberia agregar una crypto al usuario: { "idcoin" : "bitcoin" } ', (done) => {
        chai.request(url)
            .post('/user/coins')
            .set({ 'token': token })
            .send({ idcoin: "bitcoin" })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('- Deberia eliminar una crypto al usuario: { "idcoin" : "bitcoin" }', (done) => {
        chai.request(url)
            .delete('/user/coins')
            .set({ 'token': token })
            .send({ idcoin: "bitcoin" })
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });

});