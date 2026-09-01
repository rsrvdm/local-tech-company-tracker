import { NextResponse } from 'next/server';

type GooglePlace = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  websiteUri?: string;
  googleMapsUri?: string;
  businessStatus?: string;
  rating?: number;
  userRatingCount?: number;
};

export async function POST(request: Request) {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key)
    return NextResponse.json(
      { error: 'Google Places is not connected yet.' },
      { status: 503 },
    );

  const body = (await request.json().catch(() => ({}))) as {
    name?: string;
    location?: string;
  };
  const name = body.name?.trim();
  const location = body.location?.trim();
  if (!name)
    return NextResponse.json(
      { error: 'Enter a business name first.' },
      { status: 400 },
    );

  const response = await fetch(
    'https://places.googleapis.com/v1/places:searchText',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask':
          'places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.internationalPhoneNumber,places.websiteUri,places.googleMapsUri,places.businessStatus,places.rating,places.userRatingCount',
      },
      body: JSON.stringify({
        textQuery: `${name}${location ? ` ${location}` : ''}`,
        languageCode: 'en',
        regionCode: 'AU',
        maxResultCount: 5,
      }),
    },
  );
  const result = (await response.json().catch(() => ({}))) as {
    places?: GooglePlace[];
    error?: { message?: string };
  };
  if (!response.ok)
    return NextResponse.json(
      { error: result.error?.message || 'Google Places lookup failed.' },
      { status: response.status },
    );

  return NextResponse.json({
    places: (result.places || []).map((place) => ({
      id: place.id || '',
      name: place.displayName?.text || '',
      address: place.formattedAddress || '',
      phone:
        place.nationalPhoneNumber || place.internationalPhoneNumber || '',
      website: place.websiteUri || '',
      mapsUrl: place.googleMapsUri || '',
      businessStatus: place.businessStatus || '',
      rating: place.rating,
      reviewCount: place.userRatingCount,
    })),
  });
}

