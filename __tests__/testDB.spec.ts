//import * as faker from 'faker';
import * as dbHandler from './db';


beforeAll(async () => {
    await dbHandler.connect();
});

afterEach(async () => {
    await dbHandler.clearDatabase();
});

afterAll(async () => {
    await dbHandler.closeDatabase();
});

describe('USER POST TEST', () => {
    it('can be created correctly', async () => {
        // expect that two assertios will be made
        expect.assertions(2);
        // create new post model instance
    
        // save test user to in-memory db
    
        // find inserted user by parameter
       
        // check that title is expected
    });
});