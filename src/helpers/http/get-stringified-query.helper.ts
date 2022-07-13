import { stringify } from 'query-string';
import { IQuery } from '../../common/models/models';

const getStringifiedQuery = (query: IQuery): string => stringify(query);

export { getStringifiedQuery };
