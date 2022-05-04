export interface FeebackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface FeedbacksRepository {
  create: (data: FeebackCreateData) => Promise<void>;
}
