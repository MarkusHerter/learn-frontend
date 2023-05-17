declare interface SpokenText {
  SpeechRecognition: typeof SpeechRecognition;
  recognition: SpeechRecognition | null;
  targetText: string;
  isListening: boolean;
  correctAnswer: boolean;
  init: Function;
  toggleSpeechRecognition: Function;
}

declare module "@/spokenText" {
  export const spokenText: SpokenText;
}
