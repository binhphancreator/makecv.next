import { ComponentMap } from "~/configs/document";

export const resolveComponent = (component: string) => {
  return ComponentMap[component];
};
