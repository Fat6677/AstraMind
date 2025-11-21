// app/api/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'API is working!',
    endpoints: {
      'GET /api': 'This endpoint',
      'GET /api/[slug]': 'Get data by slug',
      'POST /api/[slug]': 'Post data to slug'
    },
    timestamp: new Date().toISOString()
  });
}