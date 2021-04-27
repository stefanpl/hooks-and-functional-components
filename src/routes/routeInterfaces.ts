export enum TCAppRoutes {
  "Welcome" = "Welcome",
  "FunctionIntro" = "FunctionIntro",
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
  name: string;
  isIndented?: true;
  needsAnId?: true;
}
