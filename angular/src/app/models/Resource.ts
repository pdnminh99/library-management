import { ResourceType } from "./ResourceType";

export interface Resource {
  resourceId: number;

  title: string;

  description: string;

  yearOfPublishing: number;

  publisher: string;

  type: ResourceType;
}
