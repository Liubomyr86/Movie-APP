interface IHtmlElementProps {
    tagName: string;
    className: string;
    attributes?: { [key: string]: string };
}

interface ISvgElementProps extends IHtmlElementProps {
    svgAttributes: { [key: string]: string };
    pathAttributes: { [key: string]: string };
}

export { IHtmlElementProps, ISvgElementProps };
