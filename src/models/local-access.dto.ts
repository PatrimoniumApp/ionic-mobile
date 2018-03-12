import { Page } from "./page.dto";

export interface LocalAccess {
  access: {
    page: Page;
    count: number;
  }[]
}