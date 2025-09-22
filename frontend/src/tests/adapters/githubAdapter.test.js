import { fetchGithubProjects } from "../../adapters/githubAdapter";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: 1, name: "Repo 1" }]),
  })
);

describe("GitHub Adapter", () => {
  it("fetches projects from GitHub API", async () => {
    const projects = await fetchGithubProjects();
    expect(projects).toHaveLength(1);
    expect(projects[0].name).toBe("Repo 1");
  });
});
