import { GET } from "@/app/api/projects/route";
import { Request } from "node-fetch";

// Polyfill Response for Jest environment
global.Response = class {
  constructor(body, init) {
    this._body = body;
    this.status = init.status;
    this.headers = init.headers;
  }
  async json() {
    return JSON.parse(this._body);
  }
};

// Mock fetch globally
global.fetch = jest.fn();

describe("GET /api/projects", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("returns projects data when fetch is successful", async () => {
    // Mock a successful fetch response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { id: "1", title: "Project 1", content: "<p>Content</p>" },
      ],
    });

    const req = new Request("http://localhost/api/projects?lang=en");
    const res = await GET(req);
    const data = await res.json();

    // Should return 200 with correct data
    expect(res.status).toBe(200);
    expect(data).toEqual([
      { id: "1", title: "Project 1", content: "<p>Content</p>" },
    ]);

    // Ensure fetch was called with proper headers
    expect(fetch).toHaveBeenCalledWith(
      `${process.env.API_URL}/projects?lang=en`,
      expect.objectContaining({
        headers: { "x-api-key": process.env.FRONTEND_API_KEY || "" },
      })
    );
  });

  it("returns 500 when fetch response is not ok", async () => {
    // Mock fetch returning an error
    fetch.mockResolvedValueOnce({ ok: false });

    const req = new Request("http://localhost/api/projects?lang=en");
    const res = await GET(req);
    const data = await res.json();

    // Should return 500 and error message from catch
    expect(res.status).toBe(500);
    expect(data).toEqual({ error: "Server error" });
  });

  it("returns 500 when fetch throws an error", async () => {
    // Mock fetch throwing an exception
    fetch.mockRejectedValueOnce(new Error("Network error"));

    const req = new Request("http://localhost/api/projects?lang=en");
    const res = await GET(req);
    const data = await res.json();

    expect(res.status).toBe(500);
    expect(data).toEqual({ error: "Server error" });
  });
});
