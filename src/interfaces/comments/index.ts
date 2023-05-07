export interface ICommentRequest {
  comment: string;
}

export interface ICommentResponse {
  id: string;
  comment: string;
  created_at: Date;
  updated_at: Date;
}
