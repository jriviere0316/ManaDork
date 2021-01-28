process.env.TEST = true;

const { ExpansionPanelActions } = require('@material-ui/core');
const supertest = require ('supertest');
const pool = require('../../../server/modules/pool');
const app = require('../../../server/server');
const agent = supertest.agent(app);

describe('updating a users information', () =>{

    test(`should update a users name`, async()=> {
        let putResponse = await agent
        .put(`/api/user/${user.id}`)
        .send({
            username: 'yolo'
        });
    expect(putResponse.statusCode).toBe(200);
    //name should be updated and i should see that in the response body
    expect(putResponse.body).toMatchObject({
        username: 'yolo'
    });
    });

})

beforeEach(async()=>{
    //clean up my user table
    await pool.query('DELETE FROM "user"')

    // SETUP: register a new user
    let registerRes = await agent
    .post('api/user/register')
    .send({
        username: 'jmanrivi',
        password: 'testpass',
    });
    expect(registerRes.statusCode).toBe(201);
    user = registerRes.body;
    expect(user.username).toBe('jmanrivi');

    //SETUP: login as our new user
    let loginRes = await agent
    .post('/api/user/login')
    .send({ username: 'jmanrivi', password: 'testpass' });
    expect(loginRes.statusCode).toBe(200);
})