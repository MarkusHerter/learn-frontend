export type Box = {
  id: number;
  topic: String;
  pairs: Array<[string, string, number, number]>;
  getDays: Array<number>;
  oneDay: number;
  position: number;
  takeNextValidCard: Function;
  shuffle: Function;
  deleteEmptyCards: Function;
};

export type Card = [string, string, number, number];
