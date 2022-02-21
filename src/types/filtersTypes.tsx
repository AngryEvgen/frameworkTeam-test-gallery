export interface IRange {
  from: string;
  before: string;
}

export interface Filters {
  name: string;
  author: string;
  location: string;
  created: IRange;
}
