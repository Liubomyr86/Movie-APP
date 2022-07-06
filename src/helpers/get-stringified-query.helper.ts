import { stringify } from 'query-string';
import { IQuery } from '../common/models/api.model';

const getStringifiedQuery = (query: IQuery): string => stringify(query);

export { getStringifiedQuery };
