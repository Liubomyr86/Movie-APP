import {
    pathAttributeProperty,
    pathAttributeValue,
    posterAttributeProperty,
    posterAttributeValue,
    svgAttributeProperty,
    svgAttributeValue,
    tagName,
} from '../common/enums/enum';
import { ICard } from '../common/models/card.model';
import { createHTMLElement, createSVGElement } from '../helpers/helpers';
import { global } from '../store/store';
import { toggleFavoriteMovie } from './favoriteMovie';

const createMovieCardImage = (
    { poster_path, overview, release_date, id }: ICard,
    favoriteMoviesContainer: Element
): HTMLElement => {
    const onClick = (e: Event) => {
        const currentTarget = e.currentTarget! as SVGElement;
        toggleFavoriteMovie(id!, e, global.set, favoriteMoviesContainer);

        currentTarget.classList.toggle('active');
    };
    const cardImageConatainer = createHTMLElement({
        tagName: tagName.DIV,
        className: 'card shadow-sm',
    });

    const image = createHTMLElement({
        tagName: tagName.IMG,
        className: '',
        attributes: {
            [posterAttributeProperty.ALT]: posterAttributeValue.ALT,
        },
    }) as HTMLImageElement;

    image.src = `https://image.tmdb.org/t/p/w500${poster_path}`;
    const svg = createSVGElement({
        tagName: tagName.SVG,
        className: 'bi bi-heart-fill position-absolute p-2',
        svgAttributes: {
            [svgAttributeProperty.STOKE]: svgAttributeValue.STOKE,
            [svgAttributeProperty.FILL]: svgAttributeValue.FILL,
            [svgAttributeProperty.WIDTH]: svgAttributeValue.WIDTH,
            [svgAttributeProperty.HEIGHT]: svgAttributeValue.HEIGHT,
            [svgAttributeProperty.VIEW_BOX]: svgAttributeValue.VIEW_BOX,
        },
        pathAttributes: {
            [pathAttributeProperty.FILL_RULE]: pathAttributeValue.FILL_RULE,
            [pathAttributeProperty.D]: pathAttributeValue.D,
        },
    });
    svg.addEventListener('click', onClick);

    const cardBodyContainer = createMovieCardBody({ overview, release_date });

    cardImageConatainer.append(image, svg, cardBodyContainer);

    return cardImageConatainer;
};

const createMovieCardBody = ({
    overview,
    release_date,
}: ICard): HTMLElement => {
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

export { createMovieCardImage };
