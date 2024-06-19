import { CategoryListElement } from './types/interfaces';

export class Mapping<T> {
  fetchData: () => Promise<{ data: T[] }>;
  private data: T[];

  constructor(callback: () => Promise<{ data: T[] }>) {
    this.fetchData = callback;
  }

  async getData() {
    try {
      const response = await this.fetchData();
      this.data = response.data ?? [];
    } catch {
      this.data = [];
    }
  }

  createOrder(title: string, id: number): number {
    const order = title.replace(/\D/g, '');
    return order ? Number(order) : id;
  }

  async getResults(
    mapping: (arr: T[]) => CategoryListElement[]
  ): Promise<CategoryListElement[]> {
    await this.getData();
    if (!this.data.length) return [];
    return mapping(this.data);
  }
}
