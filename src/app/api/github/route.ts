import { NextResponse } from "next/server";

const GITHUB_USERNAME = "belentani7";

export async function GET() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "belentani-core",
        },
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "belentani-core",
          },
          next: { revalidate: 3600 },
        }
      ),
    ]);

    if (!userRes.ok) {
      return NextResponse.json(
        { error: `GitHub API error: ${userRes.status}` },
        { status: userRes.status }
      );
    }

    const user = await userRes.json();
    const repos = reposRes.ok ? await reposRes.json() : [];

    return NextResponse.json({
      name: user.name ?? user.login,
      login: user.login,
      avatar_url: user.avatar_url,
      bio: user.bio,
      public_repos: user.public_repos,
      followers: user.followers,
      following: user.following,
      html_url: user.html_url,
      repos: repos.map((r: { name: string; language: string | null; description: string | null; html_url: string }) => ({
        name: r.name,
        language: r.language,
        description: r.description,
        html_url: r.html_url,
      })),
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}