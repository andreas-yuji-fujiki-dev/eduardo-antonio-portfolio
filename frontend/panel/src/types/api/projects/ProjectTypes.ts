import { ProjectImageTypes } from "./ProjectImageTypes";
import { ProjectStackTypes } from "./ProjectStackTypes";
import { ProjectCategoryTypes } from "./ProjectCategoryTypes";

export interface ProjectTypes {
  id: number;
  name: string;
  description: string;
  more_info: string;
  deploy_link: string;
  repository_link: string;
  category: ProjectCategoryTypes;
  images: ProjectImageTypes[];
  stacks: ProjectStackTypes[];
}