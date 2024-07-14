export function parseUrl(url: string): {
    protocol: string;
    domain: string;
    path: string;
    query: Record<string, string>
} {
    const protocol = getProtocol(url);
    const domain = extractDomain(url);
    const path = extractPath(url);
    const query = extractQuery(url);
    return { protocol, domain, path, query };
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

export function extractDomain(url: string): string {
    let domain = url.replace(/^.*?:\/\//, '');
    domain = domain.split('/')[0].split(':')[0];
    return domain;
}

export function extractPath(url: string): string {
    let path = url.replace(/^.*?:\/\/[^/]+/, '');
    path = path.split('?')[0];
    return path;
}

export function extractQuery(url: string): Record<string, string> {
    const queryString = url.split('?')[1] || '';
    const queryParams = new URLSearchParams(queryString);
    return Object.fromEntries(queryParams);
}
