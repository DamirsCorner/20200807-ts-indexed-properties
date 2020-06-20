export interface Photo {
  url: string;
  caption: string;
  index: number;
}

export interface Entry {
  id: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  visible: boolean;
  photos: Photo[];
}
