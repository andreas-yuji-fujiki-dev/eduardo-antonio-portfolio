import { Project } from "./projectTypes";
import { Stack } from "./stackTypes";

export interface Image {
  name: string;
  projectId?: number;
  project?: Project;
  stackLogo?: Stack;
}
