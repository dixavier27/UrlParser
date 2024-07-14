export function parseUrl(url: string): {
    protocol: string;
    domain: string;
    path: string;
    query: Record<string, string>,
    anchor: string;
} {
    const protocol = getProtocol(url);
    const domain = getDomain(url);
    const path = getPath(url);
    const query = getQuery(url);
    const anchor = getAnchor(url)
    return { protocol, domain, path, query, anchor };
}

export function invertDomain(url: string): string {
    return parseUrl(url)?.domain.split('.').reverse().join('.') || '';
}

export function invertDomains(urls: string[]): string[] {
    let invert: string[] = []
    urls.map(url => {
        invert.push(invertDomain(url));
    })
    return invert
}

export function getProtocol(url: string): string {
    const match = url.match(/^.*?:\/\//);
    return match ? match[0].replace(/:\/{2}$/, '') : '';
}

export function getDomain(url: string): string {
    let domain = url.replace(/^.*?:\/\//, '');
    domain = domain.split('/')[0].split(':')[0];
    return domain;
}

export function getPath(url: string): string {
    let path = url.replace(/^.*?:\/\/[^/]+/, '').replace(/#(.+)$/, '');
    path = path.split('?')[0];
    return path;
}

export function getQuery(url: string): Record<string, string> {
    const queryString = url.split('?')[1] || '';
    const queryParams = new URLSearchParams(queryString);
    return Object.fromEntries(queryParams);
}

export function getAnchor(url: string): string {
    const match = url.match(/#(.+)$/);
    return match ? match[0] : '';
}
