import { tagName } from '../common/enums/enum';
import { ICard } from '../common/models/card.model';
import { createHTMLElement } from '../helpers/helpers';

export const createRandomMovie = (random: ICard) => {
    const { title, overview, backdrop_path } = random;
    const section = createHTMLElement({
        tagName: tagName.SECTION,
        className: 'py-5 text-center container-fluid',
        attributes: {
            style: 'background: no-repeat center center;  background-size: cover;',
            id: 'random-movie',
        },
    });
    section.style.backgroundImage = `url('https://image.tmdb.org/t/p/original${backdrop_path}')`;

    const container = createHTMLElement({
        tagName: tagName.DIV,
        className: 'row py-lg-5',
    });

    const textContainer = createHTMLElement({
        tagName: tagName.DIV,
        className: 'col-lg-6 col-md-8 mx-auto',
        attributes: { style: 'background-color: #2525254f' },
    });

    const movieName = createHTMLElement({
        tagName: tagName.H1,
        className: 'fw-light text-light',
        attributes: { id: 'random-movie-name' },
    });
    movieName.innerText = title!;

    const movieDescription = createHTMLElement({
        tagName: tagName.DIV,
        className: 'lead text-white',
        attributes: { id: 'random-movie-description' },
    });
    movieDescription.innerText = overview!;

    textContainer.append(movieName, movieDescription);
    container.append(textContainer);
    section.append(container);

    return section;
};
