export enum TCAppRoutes {
  "Welcome" = "Welcome",
  "Another" = "Another",
  "LeThird" = "Le Third Page",
}

export interface TCRouterHistory {
  formerPath: string;
}

export interface BackButton {
  text: string;
  handler: () => void;
}

export interface TCRoute {
  path: string;
  needsAnId?: true;
}
