export interface CreateUserData {
  name: string;
  password: string;
  email: string;
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  password?: string;
}

export interface CreateFeedbackPayload {
  feedback: string;
  rating: number;
}

export interface UpdateFeedbackPayload {
  feedback?: string;
  rating?: number;
}
