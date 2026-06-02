import { bulkImportWebsites } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    if (!body.websites || !Array.isArray(body.websites)) {
      return NextResponse.json(
        { message: 'Invalid input: websites array required' },
        { status: 400 }
      );
    }

    // Validate each website has required fields
    const invalidWebsites = body.websites.filter(
      (w: any) => !w.title || !w.url || !w.imageUrl
    );

    if (invalidWebsites.length > 0) {
      return NextResponse.json(
        { message: `${invalidWebsites.length} websites missing required fields (title, url, imageUrl)` },
        { status: 400 }
      );
    }

    const result = await bulkImportWebsites(body.websites);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error bulk importing websites:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
