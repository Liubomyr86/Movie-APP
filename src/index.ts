import { RESPONSE_ARRAY_LENGTH } from './common/constants/servisec';
import {
    clearSearchBar,
    createLoadMoreMoviesBtn,
    createMovieCards,
    createMovieSelectors,
    createMoviesSearch,
    createRandomMovie,
    loadMoreMovies,
    renderFavoriteMovie,
    searchMovie,
    selectCategory,
} from './components/components';
import { randomInteger } from './helpers/helpers';
import { global } from './store/store';

export async function render(): Promise<void> {
    const randomIndex = randomInteger(RESPONSE_ARRAY_LENGTH);
    const results = await global.getData();
    global.data.push(...results);

    const favoriteMoviesContainer =
        document.body.querySelector('#favorite-movies');

    const main = document.body.querySelector('.main');
    const selectorsContainer = document.body.querySelector(
        '.container-fluid.d-flex.bg-light.justify-content-center.p-2'
    );
    const searchContainer = document.body.querySelector('#search-container');
    const cardsContainer = document.body.querySelector(
        'div.album.py-5.bg-light div.container'
    );

    const randomMovie = createRandomMovie(results[randomIndex]);
    const selectors = createMovieSelectors();
    const search = createMoviesSearch();
    const cards = createMovieCards(results, favoriteMoviesContainer!);
    const loadMoreBtn = createLoadMoreMoviesBtn();

    const searchInput = search.firstChild as HTMLInputElement;
    renderFavoriteMovie(favoriteMoviesContainer!);

    main?.prepend(randomMovie);
    selectorsContainer?.append(selectors);
    searchContainer?.append(search);
    cardsContainer?.append(cards, loadMoreBtn);

    loadMoreBtn.addEventListener('click', () => {
        loadMoreMovies(cardsContainer!, loadMoreBtn);
    });
    selectors.addEventListener('click', (e) => {
        selectCategory(
            e,
            search,
            cardsContainer!,
            loadMoreBtn,
            favoriteMoviesContainer!
        );
    });
    search.addEventListener('click', (e) => {
        searchMovie(
            e,
            search,

            cardsContainer!,
            loadMoreBtn
        );
    });
    searchInput.addEventListener('search', () => {
        clearSearchBar(cardsContainer!, loadMoreBtn);
    });

    window.onbeforeunload = function () {
        localStorage.removeItem('active_category');
        localStorage.removeItem('search');
    };
}
