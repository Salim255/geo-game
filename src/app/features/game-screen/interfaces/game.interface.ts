export interface CurrentTargetState {
  target: GameTarget | null;

  // The active challenge inside this target
  currentChallenge: GameChallenge | null;

  // Story context (array of paragraphs)
  storyContext: string[];

  // Question details
  questionText: string[];
  questionType: string;
  expectedAnswer: string;

  // Clean list of actions (already transformed)
  actions: ChallengeAction[];

  // Instructions (derived from story + question + actions)
  instructions: string[];

  // Success / failure
  successMessage?: string;
  successVoice?: string;
  failureMessage?: string;
  retryAllowed?: boolean;
}


export interface GameTarget {
  id: number;
  order: number;
  name: string;

  location: {
    lat: number;
    lng: number;
    radius: number;
  };

  nextTargetId: number | null;

  challenges: GameChallenge[];
}

export interface GameChallenge {
  story?: {
    context: string[];
  };

  question?: {
    text: string[];
    type: "text" | "choice" | string;
    answer: string;
  };

  // UPDATED: actions are now a list of named action objects
  actions?: ChallengeAction[];

  success?: {
    message: string;
    voice?: string;
  };

  failure?: {
    message: string;
    retryAllowed: boolean;
  };
}

export interface ChallengeAction {
  name: string;          // e.g. "acheter", "photo"
  header: string;        // action header
  paragraphs: string[];  // list of paragraphs
}

export interface Introduction {
  paragraphs: string []
}

export interface GameConfig {
  id: string;
  title: string;
  description: string;
  introduction: Introduction;
  targets: GameTarget[];
}
