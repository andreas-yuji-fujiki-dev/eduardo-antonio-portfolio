import { api } from '../api';

interface Image {
  id: string;
  name: string;
  description: string;
};

export async function getAllImages(): Promise<Image[]> {
  const response = await api.get('/images');
  return response.data;
};