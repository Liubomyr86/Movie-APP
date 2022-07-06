import { HttpHeader, HttpMethod } from '../../common/enums/enum';
import { IFetchOptions, IQuery } from '../../common/models/api.model';
import { HttpError } from '../../exceptions/http-error.exception';
import { getStringifiedQuery } from '../../helpers/get-stringified-query.helper';

class Http {
    async load(url: string, options: IFetchOptions) {
        const {
            method = HttpMethod.GET,
            payload = null,
            query,
            contentType,
        } = options;
        const headers = this.getHeaders(contentType);

        try {
            const response = await fetch(this.getUrl(url, query), {
                method,
                headers,
                body: payload,
            });
            const data = await this.checkStatus(response);

            return this.parseJSON(data);
        } catch (err) {
            return this.throwError(err);
        }
    }

    private getHeaders(contentType: string | undefined): Headers {
        const headers = new Headers();
        if (contentType) {
            headers.append(HttpHeader.CONTENT_TYPE, contentType);
        }

        return headers;
    }

    private getUrl(url: string, query: IQuery | undefined): string {
        return `${url}${query ? `?${getStringifiedQuery(query)}` : ''}`;
    }

    private async checkStatus(response: Response): Promise<Response> {
        if (!response.ok) {
            const parsedException = await response.json().catch(() => ({
                message: response.statusText,
            }));

            throw new HttpError({
                status: response.status,
                message: parsedException?.message,
            });
        }

        return response;
    }

    private async parseJSON(response: Response) {
        return await response.json();
    }

    private throwError(err: unknown): void {
        throw err;
    }
}

export { Http };
