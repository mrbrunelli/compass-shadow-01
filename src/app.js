import axios from "axios";
import "dotenv/config";
import express from "express";

class GitHubService {
  async getProfileByName(name = "") {
    return axios.get(`https://api.github.com/users/${name}`);
  }
}

class ProfileController {
  #githubService = null;

  constructor() {
    this.#githubService = new GitHubService();
  }

  async getGithubProfileByName(request, response) {
    const { name } = request.params;

    try {
      const githubResponse = await this.#githubService.getProfileByName(name);
      return response.status(200).json(githubResponse.data);
    } catch (error) {
      return response.status(500).json(error);
    }
  }
}

const profileController = new ProfileController();

const app = express();

app.get("/api/github/user/:name", (req, res) => {
  return profileController.getGithubProfileByName(req, res);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}`);
});
