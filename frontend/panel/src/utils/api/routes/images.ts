import { api } from '../api';
import Cookies from 'js-cookie';

interface Image {
  id: string;
  name: string;
  description: string;
};

const token = Cookies.get('token');

export async function getAllImages(): Promise<Image[]> {
  const response = await api.get('/images', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};