export class CurrentActionState {
  // Action context
  private actionIndex!: number;
  private currentAction!: ChallengeAction;
  private isLast!: boolean;
  private isDone!: boolean;

  /**
   * Build state from a GameAction object
   */
  constructor(
    actionIndex: number,
    action: ChallengeAction,
    isLast: boolean,
    isDone: boolean,
  ) {

    this.actionIndex = actionIndex;
    this.currentAction = action;
    this.isLast = isLast;
    this.isDone = isDone;
  }


  // -------------------------
  // GETTERS
  // -------------------------
  getActionIndex() {
    return this.actionIndex;
  }

  getAction() {
    return this.currentAction;
  }

  getIsDone(){
    return this.isDone;
  }

  // -------------------------
  // SETTERS
  // -------------------------
  setIsDone(){
    this.isDone = true;
  }

  setItLast(){
    this.isLast = !this.isLast;
  }

  setActionIndex(index: number) {
    this.actionIndex = index;
  }

  getIsLast(): boolean {
    return this.isLast;
  }
}


export class CurrentTargetState {
  private targetId?: number;
  private targetName?: string;
  private challengeCount?: number;
  private currentChallengeIndex?: number;

  private hasActions?: boolean;
  private actionCount?: number;
  private currentActionIndex?: number;

  private nextTargetId?: number | null;

  constructor() {}

  // ------------------------------------
  // BUILD STATE FROM TARGET (uses setters)
  // ------------------------------------
  buildFromTarget(target: GameTarget, challengeIndex: number = 0) {
    const challenge = target.challenges[challengeIndex];

    this.setTargetId(target.id);
    this.setTargetName(target.name);
    this.setNextTargetId(target.nextTargetId);

    this.setChallengeCount(target.challenges.length);
    this.setCurrentChallengeIndex(challengeIndex);

    this.setHasActions(!!challenge.actions?.length);
    this.setActionCount(challenge.actions?.length ?? 0);
    this.setCurrentActionIndex(0);
  }

  // ------------------------------------
  // SETTERS
  // ------------------------------------

  setTargetId(id: number) {
    this.targetId = id;
  }

  setTargetName(name: string) {
    this.targetName = name;
  }

  setChallengeCount(count: number) {
    this.challengeCount = count;
  }

  setCurrentChallengeIndex(index: number) {
    this.currentChallengeIndex = index;
  }

  setHasActions(has: boolean) {
    this.hasActions = has;
  }

  setActionCount(count: number) {
    this.actionCount = count;
  }

  setCurrentActionIndex(index: number) {
    this.currentActionIndex = index;
  }

  setNextTargetId(id: number | null) {
    this.nextTargetId = id;
  }

  // ------------------------------------
  // GETTERS
  // ------------------------------------

  getTargetId() {
    return this.targetId;
  }

  getTargetName() {
    return this.targetName;
  }

  getChallengeCount() {
    return this.challengeCount;
  }

  getCurrentChallengeIndex() {
    return this.currentChallengeIndex;
  }

  getHasActions() {
    return this.hasActions;
  }

  getActionCount() {
    return this.actionCount;
  }

  getCurrentActionIndex() {
    return this.currentActionIndex;
  }

  getNextTargetId() {
    return this.nextTargetId;
  }
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
  actions: ChallengeAction[];

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
