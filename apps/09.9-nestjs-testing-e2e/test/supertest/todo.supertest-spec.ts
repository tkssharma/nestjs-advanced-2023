import * as request from 'supertest';

const baseURL = 'http://localhost:3000/';

describe('Todo', () => {
  const apiRequest = request(baseURL);

  describe('GET: todo/:id', () => {
    it('should have the response', async () => {
      const response = await apiRequest.get('todo/1');

      expect(response.status).toBe(200);
    });
  });

  describe('GET: todo/all', () => {
    it('should have the response', async () => {
      const response = await apiRequest.get('todo/all');

      expect(response.status).toBe(200);
    });
  });

  describe('POST: todo', () => {
    it('should have the response', async () => {
      const response = await apiRequest.post('todo').send({});

      expect(response.status).toBe(201);
    });
  });

  describe('PUT: todo', () => {
    it('should have the response', async () => {
      const response = await apiRequest.put('todo').send({});

      expect(response.status).toBe(200);
    });
  });

  describe('PUT: todo/inactive/:id', () => {
    it('should have the response', async () => {
      const response = await apiRequest.put('todo').send({});

      expect(response.status).toBe(200);
    });
  });

  describe('DELETE: todo/:id', () => {
    it('should have the response', async () => {
      const response = await apiRequest.delete('todo/1');

      expect(response.status).toBe(200);
    });
  });
});
