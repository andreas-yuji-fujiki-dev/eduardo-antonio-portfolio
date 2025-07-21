import { Image } from "./projectImageTypes";

export interface ProjectRequestBody {
  name: string;
  description: string;
  more_info: string;
  deploy_link: string;
  repository_link: string;
  images: Image[];
}
