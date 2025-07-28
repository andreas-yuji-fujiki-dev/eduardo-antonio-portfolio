import { api } from '../api';
import { authHeader } from '../authHeader';

// types
import { ImageObjectTypes } from '@/types/api/images/ImageObjectTypes';
import { ApiImagesResponseTypes } from '@/types/api/images/ApiImagesResponseTypes';
import { ImageByIdTypes } from '@/types/api/images/ImageByIdTypes';
import { ApiImageByIdResponseTypes } from '@/types/api/images/ApiImageByIdResponseTypes';
import { EditImageNameByIdTypes } from '@/types/api/images/EditImageNameByIdTypes';
import { UploadImageTypes } from '@/types/api/images/UploadImageTypes';

// get all images
export async function getAllImages(): Promise<ImageObjectTypes[]> {
  try {
    const response = await api.get<ApiImagesResponseTypes>('/images', authHeader);
    return response.data.data.map(img => ({
      ...img,
      url: `/uploads/${img.name}` // Garante que a URL está completa
    }));
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

// get image by id
export async function getImageById({ id }: ImageByIdTypes): Promise<ImageObjectTypes> {
  try {
    const response = await api.get<ApiImageByIdResponseTypes>(`/images/${id}`, authHeader);
    return {
      ...response.data.data,
      url: `/uploads/${response.data.data.name}` // Garante que a URL está completa
    };
  } catch (error) {
    console.error(`Error fetching image with id ${id}:`, error);
    throw error;
  }
};

// upload image
export async function uploadImage({ image }: UploadImageTypes): Promise<ImageObjectTypes> {
  try {
    const formData = new FormData();
    formData.append('image', image);

    const response = await api.post('/images', formData, {
      ...authHeader,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return {
      ...response.data.image,
      url: `/uploads/${response.data.image.name}`
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export async function editImageNameById({ id, name }: EditImageNameByIdTypes): Promise<ImageObjectTypes> {
  try {
    const response = await api.put<ApiImageByIdResponseTypes>(
      `/images/${id}`,
      { name },
      authHeader
    );

    // Verifica se a resposta e os dados existem
    if (!response.data || !response.data.data) {
      throw new Error('Invalid response from server');
    }

    return {
      id: response.data.data.id,
      name: response.data.data.name,
      url: `/uploads/${response.data.data.name}`
    };
  } catch (error) {
    console.error(`Error updating image with id ${id}:`, error);
    throw error;
  }
};

// delete image (adicionei essa função que pode ser útil)
export async function deleteImageById(id: number): Promise<void> {
  try {
    await api.delete(`/images/${id}`, authHeader);
  } catch (error) {
    console.error(`Error deleting image with id ${id}:`, error);
    throw error;
  }
};