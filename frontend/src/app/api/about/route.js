// app/api/about/route.js
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const lang = searchParams.get("lang") || "en";

    // Logs para depuración en Vercel
    console.log("Lang requested:", lang);
    console.log("Fetching URL:", `${process.env.API_URL}/about?lang=${lang}`);
    console.log("API Key present?", !!process.env.FRONTEND_API_KEY);

    // Fetch al backend de manera segura
    const res = await fetch(`${process.env.API_URL}/about?lang=${lang}`, {
      headers: { "x-api-key": process.env.FRONTEND_API_KEY || "" },
    });

    console.log("Backend response status:", res.status);

    if (!res.ok) {
      const text = await res.text();
      console.error("Backend response text:", text);
      return new Response(
        JSON.stringify({ error: "Error fetching content from backend" }),
        { status: 500 }
      );
    }

    const data = await res.json();

    return new Response(JSON.stringify({ content: data.content }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error in /api/about:", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
