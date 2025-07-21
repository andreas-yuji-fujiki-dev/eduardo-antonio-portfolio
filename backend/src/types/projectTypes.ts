import { Image } from "./projectImageTypes";

export interface Project {
  id: number;
  name: string;
  description: string;
  more_info: string;
  deploy_link: string;
  repository_link: string;
  images: Image[];
}
