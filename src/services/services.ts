import { ENV } from '../common/enums/enum';
import { Http } from './http/http.service';
import { Movies } from './movie/movies.service';

const http = new Http();

const movies = new Movies(ENV.APP_BASE_URL, http);

export { http, movies };
