import { ExperienceLevel } from "./enums";
import { Image } from "./projectImageTypes";

export interface Stack {
  id: number;
  name: string;
  experience: ExperienceLevel;
  logo: Image;
  logoId: number;
}
