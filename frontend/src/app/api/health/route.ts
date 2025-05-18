export async function GET() {
  try {
    const response = await fetch("http://localhost:3001/health");
    const data = await response.text();
    return Response.json({ status: "ok", data });
  } catch {
    return Response.json(
      { status: "error", message: "Failed to connect to backend" },
      { status: 500 }
    );
  }
}
