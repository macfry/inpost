import { Mapping } from './mapping';
import { Category, getCategories } from './mockedApi';
import { CategoryListElement } from './types/interfaces';

const maper = new Mapping<Category>(getCategories);

const mapping = (arr: Array<Category>): CategoryListElement[] =>
  arr
    .map(({ id, name, MetaTagDescription, Title, children }) => ({
      children: mapping(children),
      image: MetaTagDescription,
      showOnHome: false,
      id,
      name,
      order: maper.createOrder(Title, id),
    }))
    .sort((a, b) => a.order - b.order);

export const categoryTree = async (): Promise<CategoryListElement[]> => {
  const results = await maper.getResults(mapping);

  return results.map((item) => ({
    ...item,
    showOnHome: true,
  }));
};
