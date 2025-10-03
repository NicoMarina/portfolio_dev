export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "en";

    const res = await fetch(`${process.env.API_URL}/projects?lang=${lang}`, {
      headers: { "x-api-key": process.env.FRONTEND_API_KEY || "" },
    });

    if (!res.ok) throw new Error("Error fetching projects");

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error in /api/projects:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
