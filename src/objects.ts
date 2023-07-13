import type { Box, Card } from "@/types";
export const activeBox: Box = {
  id: null,
  topic: "",
  pairs: null,
  getDays: [0, 1, 4, 10, 30, 30, 180],
  oneDay: 86400000,
  position: -1,
  _cardsForToday: 0,
  get cardsForToday() {
    if (this.pairs === null || this.pairs.length === null) {
      return 0;
    }
    return this.pairs.filter((item) => {
      return Date.now() - item[3] >= this.oneDay * this.getDays[item[2]];
    }).length;
  },
  set cardsForToday(value: number) {
    this._cardsForToday -= value;
  },
  takeNextValidCard: function (): Card | null {
    if (this.pairs === null || this.pairs.length === 0) {
      return null;
    }
    const start = this.position;
    do {
      this.position++;
      if (this.position === this.pairs.length) this.position = 0;
      if (
        Date.now() - this.pairs[this.position][3] >=
        this.oneDay * this.getDays[this.pairs[this.position][2]]
      ) {
        return this.pairs[this.position];
      }
    } while (this.position !== start);
    return null;
  },
  shuffle: function (): void {
    if (this.pairs === null) {
      return;
    }
    for (let i = this.pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [this.pairs[i], this.pairs[j]] = [this.pairs[j], this.pairs[i]];
    }
    this.pairs.sort((a, b) =>
      a[2] < b[2] ? 1 : a[2] > b[2] ? -1 : a[3] == null ? 1 : 0
    );
    console.log(JSON.stringify(this.pairs));
  },
  deleteEmptyCards: function (): void {
    if (this.pairs === null) {
      return;
    }
    for (let i = 0; i <= this.pairs.length - 1; i++) {
      if (this.pairs[i][0].trim() === "") this.pairs.splice(i);
    }
  },
};

/* Fach 0: Take it!
  Fach 1: 1 mal pro Tag, -> t[now] - t[last] >=1
  Fach 2: alle 4 Tage,  t[now] - t[last] >= 4
  Fach 3: nach zehn, t[now] - t[last] >= 10
  Fach 4: nach einem Monat t[now] - t[last] >= 30
  fach 5: nach einem Monat t[now] - t[last] >= 30
  fach 6: nach einem halben Jahr t[now] - t[last] >= 150
  
  wenn eine Aufgabe richtig beantwortet wurde, kommt sie in das nächste Fach, sonst kommt sie eins zurück
  1 tag = 1000*60*60*24
  */
