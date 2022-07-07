import { createMoviesSearch } from './components/moviesSearch';
import { createMovieSelectors } from './components/moviesSelectors';
import { createMovieCards } from './components/moviesView';
import { movies } from './services/services';

export async function render(): Promise<void> {
    // TODO render your app here
    let data: any = [];
    const moviesInfo: any = await movies.getPopularMovies();
    const { results } = moviesInfo;

    const cardsContainer = document.body.querySelector(
        'div.album.py-5.bg-light div.container'
    );
    const selectorsContainer = document.body.querySelector(
        '.container-fluid.d-flex.bg-light.justify-content-center.p-2'
    );
    const searchContainer = document.body.querySelector('#search-container');

    const selectors = createMovieSelectors();
    const search = createMoviesSearch();
    const cards = createMovieCards(results);

    selectorsContainer?.append(selectors);
    searchContainer?.append(search);
    cardsContainer?.append(cards);

    selectors.addEventListener('click', async (e) => {
        const target = e.target! as HTMLElement;
        let searchInput = search.firstChild as HTMLInputElement;

        switch (target.id) {
            case 'popular':
                data = await movies.getPopularMovies();
                console.log(searchInput);
                localStorage.setItem('active_category', target.id);
                searchInput.value = '';
                break;
            case 'upcoming':
                data = await movies.getUpcomingMovies();
                localStorage.setItem('active_category', target.id);

                searchInput.value = '';
                break;
            case 'top_rated':
                data = await movies.getTopRatedMovies();
                localStorage.setItem('active_category', target.id);
                searchInput.value = '';

                break;
            default:
                break;
        }

        if (data.results) {
            const { results } = data;
            cardsContainer!.innerHTML = '';
            const cards = createMovieCards(results);
            cardsContainer?.append(cards);
        }
    });

    search.addEventListener('mouseup', async (e) => {
        const target = e.target! as HTMLElement;
        const searchInputValue = (
            search.firstChild as HTMLInputElement
        ).value.trim();

        if (target.id === 'submit' && searchInputValue.length) {
            data = await movies.searchMovie(searchInputValue);
        }

        if (data.results) {
            const { results } = data;
            cardsContainer!.innerHTML = '';
            const cards = createMovieCards(results);
            cardsContainer?.append(cards);
        }
    });

    const searchInput = search.firstChild as HTMLInputElement;

    searchInput.addEventListener('search', async () => {
        const activeCategory = localStorage.getItem('active_category');
        switch (activeCategory) {
            case 'popular':
                data = await movies.getPopularMovies();
                break;
            case 'upcoming':
                data = await movies.getUpcomingMovies();
                break;
            case 'top_rated':
                data = await movies.getTopRatedMovies();

                break;
            default:
                break;
        }

        if (data.results) {
            const { results } = data;
            cardsContainer!.innerHTML = '';
            const cards = createMovieCards(results);
            cardsContainer?.append(cards);
        }
    });
}
