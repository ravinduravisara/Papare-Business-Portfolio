import { describe, it, expect, afterAll } from 'vitest';
import request from 'supertest';
import mongoose from 'mongoose';
import { app } from './app.js';

describe('Server API Endpoints', () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('GET /api/v1/health should return 200 OK with healthy status', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(res.body.service).toBe('ThePapare Events API');
  });

  it('POST /api/v1/inquiries should reject invalid input with 400', async () => {
    const res = await request(app).post('/api/v1/inquiries').send({
      fullName: 'A', // too short
      email: 'not-an-email',
    });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('GET /api/v1/projects/admin/all should reject unauthorized access with 401', async () => {
    const res = await request(app).get('/api/v1/projects/admin/all');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});

