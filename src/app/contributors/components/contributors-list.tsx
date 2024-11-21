"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface Author {
  login: string;
}

interface CommitAuthor {
  name: string;
  email: string;
}

interface Commit {
  sha: string;
  commit: {
    author: CommitAuthor;
  };
  author: Author;
}

type CommitsResponse = Commit[];

export function ContributorsList() {
  const [contributors, setContributors] = useState<
    {
      name: string;
      githubUser: string;
      commits: number;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchContributors = async () => {
    setLoading(true);
    setError(null);

    try {
      let page = 1;
      const contributorCount: {
        [key: string]: { name: string; githubUser: string; commits: number };
      } = {};

      while (true) {
        const response = await axios.get<CommitsResponse>(
          `https://api.github.com/repos/marcelopoars/projeto-gestao-agil-front/commits?sha=develop&page=${page}&per_page=100`
        );

        if (response.data.length === 0) break;

        response.data.forEach((commit: Commit) => {
          const committer = commit.commit.author;

          if (committer) {
            const committerName = committer.name;
            const githubUser = commit.author.login;

            if (contributorCount[githubUser]) {
              contributorCount[githubUser].commits += 1;
            } else {
              contributorCount[githubUser] = {
                name: committerName,
                githubUser,
                commits: 1,
              };
            }
          }
        });

        page++;
      }

      const sortedContributors = Object.values(contributorCount).sort(
        (a, b) => b.commits - a.commits
      );

      setContributors(sortedContributors);
    } catch (error) {
      console.error("Erro ao buscar os commits:", error);
      setError("Não foi possível carregar os contribuintes. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributors();
  }, []);

  return (
    <div>
      {loading && <p>Carregando...</p>}

      {error && <p>{error}</p>}

      {!loading && !error && (
        <ul>
          {contributors.map((contributor, index) => (
            <li key={index}>
              <strong>{contributor.name}</strong> - {contributor.commits}{" "}
              commits
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
