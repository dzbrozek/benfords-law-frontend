import { Factory } from 'rosie';
import * as faker from 'faker';

import { DataSetResponse } from 'api/types';

export const DataSetResponseFactory = new Factory<DataSetResponse>()
  .sequence('id')
  .attrs({
    name: () => faker.random.word(),
    created: () => faker.date.past().toISOString(),
    distribution: () =>
      new Array(9).reduce((previousValue, currentValue, currentIndex) => {
        // eslint-disable-next-line no-param-reassign
        previousValue[0] = faker.random.number();
        return previousValue;
      }, {}),
  });
