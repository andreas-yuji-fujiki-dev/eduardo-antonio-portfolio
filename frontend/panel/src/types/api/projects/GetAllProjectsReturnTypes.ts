import { ProjectTypes } from "./ProjectTypes";

export interface GetAllProjectsReturnTypes {
  status: string;
  message: string;

  pagination: {
    currentPage: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
  }
  
  data: ProjectTypes[] | string;
}