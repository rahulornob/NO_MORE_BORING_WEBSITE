import { addWebsite } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.url || !body.imageUrl) {
      return NextResponse.json(
        { message: 'Missing required fields: title, url, imageUrl' },
        { status: 400 }
      );
    }

    const website = await addWebsite({
      title: body.title,
      url: body.url,
      imageUrl: body.imageUrl,
      category: body.category || null,
      description: body.description || null,
    });

    if (!website) {
      return NextResponse.json(
        { message: 'Failed to add website' },
        { status: 500 }
      );
    }

    return NextResponse.json(website, { status: 201 });
  } catch (error) {
    console.error('Error adding website:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
