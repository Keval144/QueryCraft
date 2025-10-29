// src/app/api/admin/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Admin route working!" });
}

// OR (you can include POST, PUT, etc.)
export async function POST(req: Request) {
  const data = await req.json();
  return NextResponse.json({ received: data });
}
