import {
    tagName,
    selectorsWrraperAtributeProperty,
    selectorsWrraperAtributeValue,
    selectorsInputAtributeProperty,
    selectorsInputAtributeValue,
    selectorsInputIdValue,
    selectorsLabelNameValue,
    selectorsLabelAtributeProperty,
    ApiQueryValue,
} from '../common/enums/enum';
import { ICard } from '../common/models/card.model';
import { ISelectior } from '../common/models/selector.model';
import { createHTMLElement } from '../helpers/helpers';
import { movies } from '../services/services';
import { global } from '../store/store';
import { createMovieCards } from './moviesCardContainer';

const createMovieSelectors = (): HTMLElement => {
    const selectorWrapper = createHTMLElement({
        tagName: tagName.DIV,
        className: 'btn-group',
        attributes: {
            [selectorsWrraperAtributeProperty.ID]:
                selectorsWrraperAtributeValue.ID,
            [selectorsWrraperAtributeProperty.SROLE]:
                selectorsWrraperAtributeValue.SROLE,
            [selectorsWrraperAtributeProperty.ARIA_LABEL]:
                selectorsWrraperAtributeValue.ARIA_LABEL,
        },
    });

    const popularSelect = createMovieSelector({
        selectorName: selectorsLabelNameValue.POPULAR,
        selectorForId: selectorsInputIdValue.POPULAR,
        checked: true,
    });
    const upcomingSelect = createMovieSelector({
        selectorName: selectorsLabelNameValue.UPCOMING,
        selectorForId: selectorsInputIdValue.UPCOMING,
    });
    const topRatedSelect = createMovieSelector({
        selectorName: selectorsLabelNameValue.TOP_RATED,
        selectorForId: selectorsInputIdValue.TOP_RATED,
    });

    selectorWrapper.append(
        ...popularSelect,
        ...upcomingSelect,
        ...topRatedSelect
    );
    return selectorWrapper;
};

const createMovieSelector = ({
    selectorName,
    selectorForId,
    checked = false,
}: ISelectior): (HTMLInputElement | HTMLLabelElement)[] => {
    const selectorInput = createHTMLElement({
        tagName: tagName.INPUT,
        className: 'btn-check',
        attributes: {
            [selectorsInputAtributeProperty.TYPE]:
                selectorsInputAtributeValue.TYPE,
            [selectorsInputAtributeProperty.NAME]:
                selectorsInputAtributeValue.NAME,
            [selectorsInputAtributeProperty.ID]: `${selectorForId}`,
            [selectorsInputAtributeProperty.AUTOCOMPLETE]:
                selectorsInputAtributeValue.AUTOCOMPLETE,
        },
    }) as HTMLInputElement;
    selectorInput.checked = checked;

    const selectorLabel = createHTMLElement({
        tagName: tagName.LABEL,
        className: 'btn btn-outline-dark',
        attributes: {
            [selectorsLabelAtributeProperty.FOR]: `${selectorForId}`,
        },
    }) as HTMLLabelElement;
    selectorLabel.innerText = selectorName;

    return [selectorInput, selectorLabel];
};

const selectCategory = async (
    e: Event,
    search: Element,
    cardsContainer: Element,
    loadMoreBtn: Element,
    favoriteMoviesContainer: Element
): Promise<void> => {
    const target = e.target! as HTMLElement;
    const searchInput = search.firstChild as HTMLInputElement;
    let response: ICard[] = [];
    global.count = ApiQueryValue.PAGE;
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

    if (response.length) {
        global.data = response;
        cardsContainer!.innerHTML = '';
        const cards = createMovieCards(global.data, favoriteMoviesContainer);
        cardsContainer?.append(cards, loadMoreBtn);
    }
};

export { createMovieSelectors, selectCategory };
