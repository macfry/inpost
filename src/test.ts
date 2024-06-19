import test from 'ava';

import { CORRECT } from './correctResult';
import { categoryTree } from './task';

test('should return correct category tree', async (t) => {
  const results = await categoryTree();

  t.deepEqual(results, CORRECT);
});
