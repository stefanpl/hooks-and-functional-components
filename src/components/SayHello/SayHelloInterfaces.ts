export interface SomebodyToSayHiTo {
  name: string;
  age?: number;
  somethingElse?: boolean;
  friends: Friend[];
}

export interface Friend {
  name: string;
}
