export function resolveUrlTemplate(
    path: string,
    params: { [key: string]: string; }
): string {
    const prefixedParams: { [key: string]: string; } = {};
    for (let key in params) {
        prefixedParams[":" + key] = params[key];
    }
    const re = new RegExp(Object.keys(prefixedParams).join("|"), "gi");
    return path.replace(re, matched => prefixedParams[matched]);
}
