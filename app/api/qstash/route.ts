type Postcard = {
  email: string;
  message: string;
};

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  console.log('email api: ', body);

  return NextResponse.json('data');
}
