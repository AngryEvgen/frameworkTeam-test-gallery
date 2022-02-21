import { makeAutoObservable } from 'mobx';
import { configure } from 'mobx';
import { service } from '../utils';
import { config } from '../config';
import { Author, Location, Painting, Option } from '../types';

configure({
  enforceActions: 'never',
});

class ContainerStore {
  public paintings: Painting[] = [];
  public authors: Record<number, Option> = {};
  public locations: Record<number, Option> = {};

  constructor() {
    makeAutoObservable<this>(this);
  }

  async fetchByFilters(parameters: string): Promise<void> {
    const response = await service.get(`/paintings?${parameters}`);

    if (response.data) {
      this.paintings = response.data.map((result: Painting) => ({
        ...result,
        imageUrl: `${config.baseApiURL}${result.imageUrl}`,
      }));
    } else {
      throw new Error('no data');
    }
  }

  async fetchPaintings(): Promise<void> {
    const response = await service.get('/paintings');

    if (response.data) {
      this.paintings = response.data.map((result: Painting) => ({
        ...result,
        imageUrl: `${config.baseApiURL}${result.imageUrl}`,
      }));
    } else {
      throw new Error('no data');
    }
  }

  async fetchAuthors(): Promise<void> {
    const response = await service.get<Author[]>('/authors');

    if (response.data) {
      this.authors = response.data.reduce((acc, item) => {
        return { ...acc, [item.id]: item };
      }, {});
    } else {
      throw new Error('no data');
    }
  }

  async fetchLocations(): Promise<void> {
    const response = await service.get<Location[]>('/locations');
    if (response.data) {
      this.locations = response.data.reduce((acc, item) => {
        return { ...acc, [item.id]: { id: item.id, name: item.location } };
      }, {});
    } else {
      throw new Error('no data');
    }
  }
}

export default new ContainerStore();
