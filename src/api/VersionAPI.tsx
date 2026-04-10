
import axios from "axios";

export const VersionApi = axios.create({
    baseURL: 'https://api.github.com/repos/Igor-Wolf/PlanejaMaisMobile/releases',
    headers: {
      'Content-Type': 'application/json',
    }
})