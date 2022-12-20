import type { Box, Card } from "@/types";
export const cardboxes = [
  { id: 1, topic: "Spanisch" },
  { id: 2, topic: "Englisch" },
  { id: 3, topic: "Französisch" },
  { id: 4, topic: "SQL" },
  { id: 5, topic: "Die französische Revolution" },
  { id: 6, topic: "IPv6" },
  { id: 7, topic: "Der Hitler-Stalin-Pakt" },
  { id: 8, topic: "Der Herr der Ringe" },
  { id: 9, topic: "Schwimmen für Anfänger" },
  { id: 10, topic: "Der Mann ohne Namen" },
];
export const activeBox: Box = {
  id: 1,
  topic: "Spanisch",
  pairs: [
    ["ich", "yo", 0, 0],
    ["das Haus", "la casa", 0, 0],
    ["der Baum", "el arbol", 0, 0],
    ["die Reise", "el viaje", 0, 0],
    // ["der Hund", "el perro", 0, 0],
    // ["der Kater", "el gato", 0, 0],
    // ["ich gehe", "voy", 0, 0],
    // ["er weint", "llora", 0, 0],
    // ["heißen", "llamar", 0, 0],
  ],
  getDays: [0, 1, 4, 10, 30, 30, 180],
  oneDay: 86400000,
  position: -1,
  takeNextValidCard: function (): Card | null {
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
    for (let i = this.pairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [this.pairs[i], this.pairs[j]] = [this.pairs[j], this.pairs[i]];
    }
  },
  deleteEmptyCards: function (): void {
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
