import { ProjectStackCategoryTypes } from "./ProjectStackCategoryTypes";
import { ProjectStackCategoryLogoTypes } from "./ProjectStackCategoryLogoTypes";

export interface ProjectStackTypes {
  id: number;
  name: string;
  experience: 1 | 2 | 3;
  category: ProjectStackCategoryTypes;
  logo: ProjectStackCategoryLogoTypes;
}