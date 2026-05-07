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
