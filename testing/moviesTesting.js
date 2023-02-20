const request = require('supertest');
const app = require('../app');

describe('movies api', () => {
  let id;

  // Create Operation
  it('create operation', async () => {
    const res = await request(app)
      .post('/movies/allmovies')
      .send({ name: 'praveesh', email: 'praveeshukd000@gmail.com' });
    expect(res.statusCode).toEqual(204);
    expect(res.body).toHaveProperty('id');
    id = res.body.id;
  });

  // 
  it('movielist', async () => {
    const res = await request(app).get(`/user/movielist/${id}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('movieTitle', 'thunivu');
    expect(res.body).toHaveProperty('director', 'h.vinodh');
    expect(res.body).toHaveProperty('releaseDate', '10-o2-2923');
    expect(res.body).toHaveProperty('rating', '10');
  });

  // Update 
  it('update', async () => {
    const res = await request(app)
      .put(`/user/update/${id}`)
      .send({ name: 'praveesh', email: 'praveeshukd000@gmail.com' });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('movieTitle', 'vivegam');
    expect(res.body).toHaveProperty('director', 'h.siva');
    expect(res.body).toHaveProperty('releaseDate', '10-o2-2923');
    expect(res.body).toHaveProperty('rating', '10');
  });

 
});
// not working