import { api } from '../api';
import { authHeader } from '../authHeader';

// types
import { ImageObjectTypes } from '@/types/api/images/ImageObjectTypes';
import { ApiImagesResponseTypes } from '@/types/api/images/ApiImagesResponseTypes';

import { ImageByIdTypes } from '@/types/api/images/ImageByIdTypes';
import { ApiImageByIdResponseTypes } from '@/types/api/images/ApiImageByIdResponseTypes';
import { EditImageNameByIdTypes } from '@/types/api/images/EditImageNameByIdTypes';

// get all
export async function getAllImages(): Promise<ImageObjectTypes[]> {
  const request = await api.get<ApiImagesResponseTypes>('/images', authHeader);
  return request.data.data; 
};

// get by id
export async function getImageById( { id }: ImageByIdTypes): Promise<ImageObjectTypes> {
  const request = await api.get<ApiImageByIdResponseTypes>(`/images/${id}`, authHeader);
  return request.data.data;
};

// upload
export async function uploadImage(formData: FormData) {
  const response = await api.post('/images/upload', formData, authHeader);
  return response.data;
};

// edit
export async function editImageNameById( { id, name } : EditImageNameByIdTypes ) {
  const response = await api.put<ApiImageByIdResponseTypes>(`/images/${id}`, { name }, authHeader);
  return response.data.data;
};