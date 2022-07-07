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

    const selectors = createMovieSelectors();

    const cards = createMovieCards(results);
    selectorsContainer?.append(selectors);
    cardsContainer?.append(cards);

    selectors.addEventListener('click', async (e) => {
        switch ((e.target! as HTMLElement).id) {
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
