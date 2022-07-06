import {
    imageAttributesProperty,
    imageAttributesValue,
    pathAttributesProperty,
    pathAttributesValue,
    tagName,
} from '../common/enums/dom/dom';
import { svgAttributesProperty } from '../common/enums/dom/svg-attributes/svg-attributes-property';
import { svgAttributesValue } from '../common/enums/dom/svg-attributes/svg-attributes-value';
import { ICard } from '../common/models/card.model';
import { createHTMLElement, createSVGElement } from '../helpers/helpers';
import { movies } from '../services/services';

export const createCards = async (): Promise<HTMLElement> => {
    const container = createHTMLElement({
        tagName: tagName.DIV,
        className: 'row',
        attributes: { id: 'film-container' },
    });
    const movieCardsData = await movies.getPopularMovies();
    const { results } = movieCardsData;

    const movieCards: HTMLElement[] = results.map((item: ICard) => {
        const { poster_path, overview, release_date } = item;
        return createCard({ poster_path, overview, release_date });
    });

    movieCards.forEach((card) => container.append(card));

    return container;
};

const createCard = ({
    poster_path,
    overview,
    release_date,
}: ICard): HTMLElement => {
    const container = createHTMLElement({
        tagName: tagName.DIV,
        className: 'col-lg-3 col-md-4 col-12 p-2',
    });
    const cardImageConatainer = createCardImage({
        poster_path,
        overview,
        release_date,
    });

    container.append(cardImageConatainer);

    return container;
};

const createCardImage = ({
    poster_path,
    overview,
    release_date,
}: ICard): HTMLElement => {
    const cardImageConatainer = createHTMLElement({
        tagName: tagName.DIV,
        className: 'card shadow-sm',
    });

    const image = createHTMLElement({
        tagName: tagName.IMG,
        className: '',
        attributes: { [imageAttributesProperty.ALT]: imageAttributesValue.ALT },
    }) as HTMLImageElement;

    image.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
    const svg = createSVGElement({
        tagName: tagName.SVG,
        className: 'bi bi-heart-fill position-absolute p-2',
        svgAttributes: {
            [svgAttributesProperty.STOKE]: svgAttributesValue.STOKE,
            [svgAttributesProperty.FILL]: svgAttributesValue.FILL,
            [svgAttributesProperty.WIDTH]: svgAttributesValue.WIDTH,
            [svgAttributesProperty.HEIGHT]: svgAttributesValue.HEIGHT,
            [svgAttributesProperty.VIEW_BOX]: svgAttributesValue.VIEW_BOX,
        },
        pathAttributes: {
            [pathAttributesProperty.FILL_RULE]: pathAttributesValue.FILL_RULE,
            [pathAttributesProperty.D]: pathAttributesValue.D,
        },
    });

    const cardBodyContainer = createCardBody({ overview, release_date });

    cardImageConatainer.append(image, svg, cardBodyContainer);

    return cardImageConatainer;
};

const createCardBody = ({ overview, release_date }: ICard): HTMLElement => {
    const cardBodyContainer = createHTMLElement({
        tagName: tagName.DIV,
        className: 'card-body',
    });

    const bodyText = createHTMLElement({
        tagName: tagName.P,
        className: 'card-text truncate',
    });
    if (overview) bodyText.innerText = overview;

    const dateContainer = createHTMLElement({
        tagName: tagName.DIV,
        className: 'd-flex justify-content-between align-items-center',
    });
    const date = createHTMLElement({
        tagName: tagName.SMALL,
        className: 'text-muted',
    });
    if (release_date) date.innerText = release_date;

    dateContainer.append(date);
    cardBodyContainer.append(bodyText, dateContainer);

    return cardBodyContainer;
};
