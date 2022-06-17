export interface IAnimal {
  id: number;
  imageUrl: string;
  name: string;
  shortDescription: string;
}

export interface IExtendedAnimal {
  imageUrl: string;
  name: string;
  yearOfBirth: number;
  shortDescription: string;
  latinName: string;
  longDescription: string;
  isFed: boolean;
  lastFed: string;
}
