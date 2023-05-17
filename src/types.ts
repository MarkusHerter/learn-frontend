export type Box = {
  id: number | null;
  topic: string;
  pairs: Array<[string, string, number, number, number | null]> | null;
  getDays: Array<number>;
  oneDay: number;
  position: number;
  _cardsForToday: number;
  cardsForToday: number;
  takeNextValidCard: Function;
  shuffle: Function;
  deleteEmptyCards: Function;
};

export type Card = [string, string, number, number, number | null];
export type ChosenBox = { id: number; topic: string };
export type FetchedCard = {
  id: number;
  front: string;
  back: string;
  BoxId: number;
  pocket: number;
  lastTimePicked: number;
};
