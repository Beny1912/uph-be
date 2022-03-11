import app from './../src/app';
import request from 'supertest';


describe('CREATE SERVER', () => {
    test('CHECK IF JEST WORK OK', async () =>{
        expect(1).toBe(1)
    });
    test('CHECK IF JEST WORK KO', async () =>{
        expect(2).toBe(1)
    });
    test('CHECK HEALTH ENDPOINT STATUS',async () => {
        const res = await request(app).get("/health").send();

        expect(res.statusCode).toEqual(200);
    })
    test('CHECK HEALTH ENDPOINT RETURN',async () => {
        const res = await request(app).get("/health").send();
        expect(res.text).toEqual('Server OK');
    })
});
describe('ENDPOINT CHECK ADDRESS', () => {

    test('CHECK ADRESS ENDPOINT STATUS',async () => {
        const res = await request(app).post("/checkAddress").send({
            "street":"gran capitan",
            "streetNumber":"2",
            "town":"Utrera",
            "postalCode":"41710",
            "country":"España"
        });
        expect(res.statusCode).toEqual(200);
        //expect(res.text).toEqual('Server OK');
    });
    test('CHECK ADRESS ENDPOINT RESPONSE',async () => {
        const res = await request(app).post("/checkAddress").send({
            "street":"gran capitan",
            "streetNumber":"2",
            "town":"Utrera",
            "postalCode":"41710",
            "country":"España"
        });
        expect(res.body.formatted_address).toBeDefined();
    });
    test('CHECK ERROR ADRESS ENDPOINT STATUS',async () => {
        const res = await request(app).post("/checkAddress").send({
            "street":"nila",
            "streetNumber":"2",
            "town":"Utrera",
            "postalCode":"41710",
            "country":"España"
        });
        expect(res.statusCode).toEqual(400);
    });
    test('CHECK ERROR ADRESS ENDPOINT RESPONSE',async () => {
        const res = await request(app).post("/checkAddress").send({
            "street":"nila",
            "streetNumber":"2",
            "town":"Utrera",
            "postalCode":"41710",
            "country":"España"
        });
        expect(res.body.message).toBeDefined();
    });


});

describe('ENDPOINT GET WEATHER', () => {

    test('CHECK ADRESS ENDPOINT STATUS',async () => {
        const res = await request(app).post("/getWeather").send({
            "street":"gran capitan",
            "streetNumber":"2",
            "town":"Utrera",
            "postalCode":"41710",
            "country":"España"
        });
        expect(res.statusCode).toEqual(200);
    });
    test('CHECK ADRESS ENDPOINT RESPONSE',async () => {
        const res = await request(app).post("/getWeather").send({
            "street":"gran capitan",
            "streetNumber":"2",
            "town":"Utrera",
            "postalCode":"41710",
            "country":"España"
        });
        expect(res.body.weather).toBeDefined();
    });
    test('CHECK ERROR ADRESS ENDPOINT STATUS',async () => {
        const res = await request(app).post("/getWeather").send({
            "street":"nila",
            "streetNumber":"2",
            "town":"Utrera",
            "postalCode":"41710",
            "country":"España"
        });
        expect(res.statusCode).toEqual(400);
    });
    test('CHECK ERROR ADRESS ENDPOINT RESPONSE',async () => {
        const res = await request(app).post("/getWeather").send({
            "street":"nila",
            "streetNumber":"2",
            "town":"Utrera",
            "postalCode":"41710",
            "country":"España"
        });
        expect(res.body.message).toBeDefined();
    });

});

describe('ENDPOINT SIGNUP', () => {
    test('CHECK SIGNUP ENDPOINT STATUS',async () => {
        const res = await request(app).post('/signup').send({
            "username":"beny2",
            "email":"beny2@beny.com",
            "password":"benito2"
        });
        expect(res.statusCode).toEqual(200);
    });
    test('CHECK SIGNUP ENDPOINT RESPONSE',async () => {
        const res = await request(app).post('/signup').send({
            "username":"beny2",
            "email":"beny2@beny.com",
            "password":"benito2"
        });
        expect(res.body.email).toBeDefined();
    });
    test('CHECK SIGNUP ENDPOINT STATUS ERROR ALREADY EXISTS',async () => {
        const res = await request(app).post('/signup').send({
            "username":"beny2",
            "email":"beny2@beny.com",
            "password":"benito2"
        });
        expect(res.statusCode).toEqual(400);
    });
    test('CHECK SIGNUP ENDPOINT RESPONSE ERROR ALREADY EXISTS',async () => {
        const res = await request(app).post('/signup').send({
            "username":"beny2",
            "email":"beny2@beny.com",
            "password":"benito2"
        });
        expect(res.body).toHaveProperty('message','Email already exists');
    });
    test('CHECK SIGNUP ENDPOINT RESPONSE ERROR VALIDATIONS',async () => {
        const res = await request(app).post('/signup').send({
            "username":"beny2",
            "email":"beny2@beny.com"
        });
        expect(res.body.message).toBeDefined();
    });

});

describe('ENDPOINT SIGNIN', () => {
    test('CHECK SIGNIN ENDPOINT STATUS',async () => {
        const res = await request(app).post('/signin').send({
            "email":"beny2@beny.com",
            "password":"benito2"
        });
        expect(res.statusCode).toEqual(200);
    });
    test('CHECK SIGNIN ENDPOINT RESPONSE',async () => {
        const res = await request(app).post('/signin').send({
            "email":"beny2@beny.com",
            "password":"benito2"
        });
        expect(res.body.token).toBeDefined();
    });
    test('CHECK SIGNIN ENDPOINT STATUS ERROR EMAIL',async () => {
        const res = await request(app).post('/signin').send({
            "email":"a@a.com",
            "password":"benito2"
        });
        expect(res.statusCode).toEqual(400);
    });
    test('CHECK SIGNIN ENDPOINT RESPONSE ERROR EMAIL',async () => {
        const res = await request(app).post('/signin').send({
            "email":"a@a.com",
            "password":"benito2"
        });
        expect(res.body).toHaveProperty('message','Email or Password is wrong');
   
    });
    test('CHECK SIGNIN ENDPOINT STATUS ERROR PASSWORD',async () => {
        const res = await request(app).post('/signin').send({
            "email":"beny@beny.com",
            "password":"ben"
        });
        expect(res.statusCode).toEqual(400);
    });
    test('CHECK SIGNIN ENDPOINT RESPONSE ERROR PASSWORD',async () => {
        const res = await request(app).post('/signin').send({
            "email":"beny@beny.com",
            "password":"ben"
        });
        expect(res.body).toHaveProperty('message','Invalid Password');
   
    });
})