import { GET } from "@/app/api/about/route";

// Testing successful fetch, fetch errors, and response handling
// Node doesn't have Response by default, so we mock it for testing
class MockResponse {
  constructor(body, options) {
    this.body = body;
    this.status = options.status;
    this.headers = options.headers || {};
  }

  async json() {
    return JSON.parse(this.body);
  }
}

// Assign MockResponse to global so our API routes can use it
global.Response = MockResponse;

// Mock the fetch API globally
global.fetch = jest.fn();

describe("GET /api/about", () => {
  // Reset mocks after each test to prevent test pollution
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns content when fetch is successful", async () => {
    // Mock a successful fetch response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ content: "<p>Hello World</p>" }),
    });

    // Create a fake request with a language query param
    const req = { url: "http://localhost/api/about?lang=en" };

    // Call our API handler
    const res = await GET(req);

    // Parse the returned JSON content
    const data = await res.json();

    // Assertions
    expect(res.status).toBe(200);
    expect(data).toEqual({ content: "<p>Hello World</p>" });
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.API_URL}/about?lang=en`,
      expect.objectContaining({
        headers: { "x-api-key": process.env.FRONTEND_API_KEY || "" },
      })
    );
  });

  it("returns 500 when fetch response is not ok", async () => {
    // Mock a fetch that fails (non-ok response)
    fetch.mockResolvedValueOnce({ ok: false });

    const req = { url: "http://localhost/api/about?lang=en" };
    const res = await GET(req);
    const data = await res.json();

    // Assertions: should return 500 and an error message
    expect(res.status).toBe(500);
    expect(data).toEqual({ error: "Error fetching content" });
  });

  it("returns 500 when fetch throws an error", async () => {
    // Mock a fetch that throws a network error
    fetch.mockRejectedValueOnce(new Error("Network error"));

    const req = { url: "http://localhost/api/about?lang=en" };
    const res = await GET(req);
    const data = await res.json();

    // Assertions: should return 500 and a generic server error message
    expect(res.status).toBe(500);
    expect(data).toEqual({ error: "Server error" });
  });
});
