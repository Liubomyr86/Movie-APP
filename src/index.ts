import { RESPONSE_ARRAY_LENGTH } from './common/constants/servisec';
import { ApiQueryValue } from './common/enums/enum';
import { createLoadMoreMoviesBtn } from './components/loadMoreMoviesBtn';
import { createMoviesSearch } from './components/moviesSearch';
import { createMovieSelectors } from './components/moviesSelectors';
import { createMovieCards } from './components/moviesView';
import { createRandomMovie } from './components/randomMovie';
import {
    getObjectFromLocalStorage,
    randomInteger,
    setLocalStorageItem,
} from './helpers/helpers';
import { movies } from './services/services';

export async function render(): Promise<void> {
    let data: any = [];
    const moviesInfo: any = await movies.getPopularMovies(ApiQueryValue.PAGE);
    const { results } = moviesInfo;
    data.push(...results);

    let count: number = ApiQueryValue.PAGE;

    const randomIndex = randomInteger(RESPONSE_ARRAY_LENGTH);

    const main = document.body.querySelector('.main');
    const cardsContainer = document.body.querySelector(
        'div.album.py-5.bg-light div.container'
    );
    const selectorsContainer = document.body.querySelector(
        '.container-fluid.d-flex.bg-light.justify-content-center.p-2'
    );
    const searchContainer = document.body.querySelector('#search-container');

    const randomMovie = createRandomMovie(results[randomIndex]);
    const selectors = createMovieSelectors();
    const search = createMoviesSearch();
    const cards = createMovieCards(results);
    const loadMoreBtn = createLoadMoreMoviesBtn();
    const searchInput = search.firstChild as HTMLInputElement;

    main?.append(randomMovie);
    selectorsContainer?.append(selectors);
    searchContainer?.append(search);
    cardsContainer?.append(cards, loadMoreBtn);

    loadMoreBtn.addEventListener('click', async (e) => {
        const activeCategory = localStorage.getItem('active_category');
        const search = getObjectFromLocalStorage('search');
        let response = [];
        count++;

        if (search) {
            response = await movies.searchMovie(search.searchInputValue, count);
        } else {
            switch (activeCategory) {
                case 'upcoming':
                    response = await movies.getUpcomingMovies(count);
                    break;
                case 'top_rated':
                    response = await movies.getTopRatedMovies(count);
                    break;
                default:
                    response = await movies.getPopularMovies(count);
                    break;
            }
        }

        if (response.results && count < response.total_pages) {
            const { results } = response;
            data.push(...results);
            cardsContainer!.innerHTML = '';
            const cards = createMovieCards(data);
            cardsContainer?.append(cards, loadMoreBtn);
        }
    });

    selectors.addEventListener('click', async (e) => {
        const target = e.target! as HTMLElement;
        const searchInput = search.firstChild as HTMLInputElement;
        let response = [];
        count = ApiQueryValue.PAGE;
        localStorage.removeItem('search');

        switch (target.id) {
            case 'popular':
                response = await movies.getPopularMovies(ApiQueryValue.PAGE);
                localStorage.setItem('active_category', target.id);
                searchInput.value = '';
                break;
            case 'upcoming':
                response = await movies.getUpcomingMovies(ApiQueryValue.PAGE);
                localStorage.setItem('active_category', target.id);
                searchInput.value = '';
                break;
            case 'top_rated':
                response = await movies.getTopRatedMovies(ApiQueryValue.PAGE);
                localStorage.setItem('active_category', target.id);
                searchInput.value = '';
                break;
            default:
                break;
        }

        if (response.results) {
            const { results } = response;
            data = results;
            cardsContainer!.innerHTML = '';
            const cards = createMovieCards(data);
            cardsContainer?.append(cards, loadMoreBtn);
        }
    });

    search.addEventListener('click', async (e) => {
        const target = e.target! as HTMLElement;
        const searchInputValue = (
            search.firstChild as HTMLInputElement
        ).value.trim();
        let response = [];

        count = ApiQueryValue.PAGE;

        if (target.id === 'submit' && searchInputValue.length) {
            response = await movies.searchMovie(
                searchInputValue,
                ApiQueryValue.PAGE
            );
            setLocalStorageItem('search', {
                isSearch: 'true',
                searchInputValue,
            });
        }

        if (response.results) {
            const { results } = response;
            data = results;
            cardsContainer!.innerHTML = '';
            const cards = createMovieCards(data);
            cardsContainer?.append(cards, loadMoreBtn);
        }
    });

    searchInput.addEventListener('search', async () => {
        const activeCategory = localStorage.getItem('active_category');
        count = ApiQueryValue.PAGE;
        let response = [];
        localStorage.removeItem('search');

        switch (activeCategory) {
            case 'upcoming':
                response = await movies.getUpcomingMovies(ApiQueryValue.PAGE);
                break;
            case 'top_rated':
                response = await movies.getTopRatedMovies(ApiQueryValue.PAGE);
                break;
            default:
                response = await movies.getPopularMovies(ApiQueryValue.PAGE);
                break;
        }

        if (response.results) {
            const { results } = response;
            data = results;
            cardsContainer!.innerHTML = '';
            const cards = createMovieCards(data);
            cardsContainer?.append(cards, loadMoreBtn);
        }
    });

    window.onbeforeunload = function (e) {
        localStorage.removeItem('active_category');
    };
}
