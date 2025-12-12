import { api } from "../api";

export default async function fetchAllProjects() {
  const response = await api.get("/projects");

  return response;
}