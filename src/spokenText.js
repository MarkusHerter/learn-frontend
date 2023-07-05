// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition;

// export const spokenText = {
//   recognition: null,
//   targetText: "Your target text here", // Hier sollte Ihr Zieltext eingefügt werden
//   isListening: false,
//   correctAnswer: false,

//   init: function () {
//     this.recognition = new SpeechRecognition();

//     // Festlegen einiger Parameter
//     this.recognition.lang = "en-US"; // Hier sollte Ihre Sprache eingestellt werden
//     this.recognition.continuous = true;
//     this.recognition.interimResults = false;
//     this.recognition.onresult = function (event) {
//       let final_transcript = "";

//       // Durchlaufen der Ergebnisse
//       for (let i = event.resultIndex; i < event.results.length; ++i) {
//         if (event.results[i].isFinal) {
//           final_transcript += event.results[i][0].transcript;
//         }
//       }
//       console.log("Erkannter Text: ", final_transcript);

//       if (final_transcript.trim() === spokenText.targetText) {
//         this.correctAnswer = true;
//       } else {
//         this.correctAnswer = false;
//       }
//     };

//     this.recognition.onspeechend = function () {
//       spokenText.recognition.stop();
//       spokenText.isListening = false;
//     };

//     this.recognition.onend = function () {
//       // Wenn die Erkennung endet und der Benutzer immer noch sprechen möchte, starten Sie sie erneut.
//       if (spokenText.isListening) {
//         spokenText.recognition.start();
//       }
//     };
//   },

//   toggleSpeechRecognition: function () {
//     if (this.isListening) {
//       this.recognition.stop();
//       this.isListening = false;
//     } else {
//       this.recognition.start();
//       this.isListening = true;

//       // Stoppen der Erkennung nach 3 Sekunden der Stille
//       setTimeout(function () {
//         if (spokenText.isListening) {
//           spokenText.recognition.stop();
//           spokenText.isListening = false;
//         }
//       }, 3000);
//     }
//   },
// };
