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

    const images = response?.data?.data;
    
    if (Array.isArray(images)) {
      return images.map(img => ({
        ...img,
        url: `/api/uploads/${img.name}`,
      }));
    }

    console.warn('Unexpected API response structure:', response?.data);
    return [];
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};


// get image by id
export async function getImageById({ id }: ImageByIdTypes): Promise<ImageObjectTypes> {
  try {
    const response = await api.get<ApiImageByIdResponseTypes>(`/images/${id}`, authHeader);
    return {
      ...response.data.data,
      url: `/api/uploads/${response.data.data.name}`
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
      url: `/api/uploads/${response.data.image.name}`
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

// edit image name
export async function editImageNameById({ id, name }: EditImageNameByIdTypes): Promise<ImageObjectTypes> {
  try {
    const response = await api.put<ApiImageByIdResponseTypes>(
      `/images/${id}`,
      { name },
      authHeader
    );

    if (!response.data?.data) {
      throw new Error('Invalid response from server');
    }

    return {
      id: response.data.data.id,
      name: response.data.data.name,
      url: `/api/uploads/${response.data.data.name}`
    };
  } catch (error) {
    console.error(`Error updating image with id ${id}:`, error);
    throw error;
  }
};

// replace image
export async function replaceImage({ id, image }: { id: number; image: File }): Promise<ImageObjectTypes> {
  try {
    const formData = new FormData();
    formData.append('image', image);
    
    const response = await api.put(`/images/${id}/replace`, formData, {
      ...authHeader,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return {
      ...response.data.data,
      url: `/api/uploads/${response.data.data.name}`
    };
  } catch (error: unknown) {
    // axios error
    if (isAxiosError(error)) {
      console.error('API Error details:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || error.message);
    }
    
    // default error
    if (error instanceof Error) {
      console.error('Error:', error.message);
      throw error;
    }
    
    // unknown error
    console.error('Unknown error:', error);
    throw new Error('An unknown error occurred');
  }
}

// axios error verify
function isAxiosError(error: unknown): error is { 
  isAxiosError: boolean; 
  response?: { data?: { message?: string } }; 
  message: string 
} {
  return typeof error === 'object' && error !== null && 'isAxiosError' in error;
}

// delete image
export async function deleteImageById(id: number): Promise<void> {
  try {
    await api.delete(`/images/${id}`, authHeader);
    
  } catch (error) {
    console.error(`Error deleting image with id ${id}:`, error);
    throw error;
  }
};