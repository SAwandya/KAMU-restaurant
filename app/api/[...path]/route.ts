import { NextRequest, NextResponse } from "next/server";

// This should point to your backend API's base URL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:80/api";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join("/");
  const queryString = new URL(request.url).search;
  const url = `${API_BASE_URL}/${path}${queryString}`;

  const headers = new Headers(request.headers);
  headers.delete("host"); // Remove host to avoid conflicts

  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
      credentials: "include",
    });

    // For non-JSON responses
    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(`Error proxying GET request to ${url}:`, error);
    return NextResponse.json(
      { error: "Failed to fetch data from API" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join("/");
  const url = `${API_BASE_URL}/${path}`;

  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const headers = new Headers(request.headers);
  headers.delete("host"); // Remove host to avoid conflicts

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
      credentials: "include",
    });

    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(`Error proxying POST request to ${url}:`, error);
    return NextResponse.json(
      { error: "Failed to send data to API" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join("/");
  const url = `${API_BASE_URL}/${path}`;

  let body;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const headers = new Headers(request.headers);
  headers.delete("host"); // Remove host to avoid conflicts

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
      credentials: "include",
    });

    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(`Error proxying PUT request to ${url}:`, error);
    return NextResponse.json(
      { error: "Failed to update data in API" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = params.path.join("/");
  const url = `${API_BASE_URL}/${path}`;

  const headers = new Headers(request.headers);
  headers.delete("host"); // Remove host to avoid conflicts

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers,
      credentials: "include",
    });

    if (response.status === 204) {
      return new NextResponse(null, { status: 204 });
    }

    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(`Error proxying DELETE request to ${url}:`, error);
    return NextResponse.json(
      { error: "Failed to delete data in API" },
      { status: 500 }
    );
  }
}
