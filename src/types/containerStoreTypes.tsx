export interface Author {
  id: number;
  name: string;
}

export interface Location {
  id: number;
  location: string;
}

export interface Painting {
  authorId: number;
  created: string;
  id: number | string;
  imageUrl: string;
  locationId: number;
  name: string;
}
