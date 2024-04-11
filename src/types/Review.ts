export type ReviewType = {
  _id: string;
  id: string;
  bean: string;
  review: string;
  createdAt: string;
  rating: number;
  user?: {
    _id: string;
    name: string;
  };
};
