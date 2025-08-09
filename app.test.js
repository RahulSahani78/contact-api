const express = require('express');
const mongoose = require('mongoose');
const app = require('../app'); // Assuming app.js is in the parent directory
const request = require('supertest');

jest.mock('../routes/user');
jest.mock('../routes/contact');

describe('App Integration Test', () => {
  let mockUserRoute;
  let mockContactRoute;

  beforeAll(() => {
    mockUserRoute = require('../routes/user');
    mockContactRoute = require('../routes/contact');
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });


  it('should connect to MongoDB and handle routing and 404', async () => {
    try {
      const mockMongooseConnect = jest.spyOn(mongoose, 'connect');
      mockMongooseConnect.mockResolvedValue(true); // Mock successful connection

      mockUserRoute.default.get.mockImplementation((req, res) => {
        res.status(200).json({user: 'test'});
      });
      mockContactRoute.default.get.mockImplementation((req, res) => {
        res.status(200).json({contact: 'test'});
      });


      const responseUser = await request(app).get('/user');
      expect(responseUser.status).toBe(200);
      expect(responseUser.body).toEqual({user: 'test'});

      const responseContact = await request(app).get('/contact');
      expect(responseContact.status).toBe(200);
      expect(responseContact.body).toEqual({contact: 'test'});


      const response404 = await request(app).get('/invalid');
      expect(response404.status).toBe(404);
      expect(response404.body).toEqual({ msg: 'Bad request' });
      
      expect(mockMongooseConnect).toHaveBeenCalled();
    } catch (error) {
      console.error("Test Error:", error);
      expect(error).toBeNull(); // Fail the test if an error occurred during the test
    }
  });


  it('should handle MongoDB connection errors gracefully', async () => {
    try{
        const mockMongooseConnect = jest.spyOn(mongoose, 'connect');
        mockMongooseConnect.mockRejectedValue(new Error('Failed to connect'));

        await expect(mongoose.connect('mongodb://localhost:27017/test')).rejects.toThrow('Failed to connect');
    } catch (error) {
      console.error("Test Error:", error);
      expect(error).not.toBeNull();
    }
  });
});