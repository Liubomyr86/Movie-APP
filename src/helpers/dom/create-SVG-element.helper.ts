import { ISvgElementProps } from '../../common/models/dom.model';

const createSVGElement = ({
    tagName,
    className,
    svgAttributes,
    pathAttributes,
}: ISvgElementProps) => {
    const iconSvg = document.createElementNS(
        'http://www.w3.org/2000/svg',
        tagName
    );
    const iconPath = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'path'
    );

    if (className) {
        const classNames = className.split(' ').filter(Boolean); // Include only not empty className values after the splitting
        iconSvg.classList.add(...classNames);
    }

    Object.keys(svgAttributes).forEach((key) =>
        iconSvg.setAttribute(key, svgAttributes[key])
    );
    Object.keys(pathAttributes).forEach((key) =>
        iconPath.setAttribute(key, pathAttributes[key])
    );

    iconSvg.append(iconPath);

    return iconSvg;
};

export { createSVGElement };
