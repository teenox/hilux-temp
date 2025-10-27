
export const updateURLParam = (key: string, value: any) => {
    const url = new URL(window.location.href);
    url.searchParams.set(key, value);
    window.history.pushState({}, '', url);
};


export const getURLParam = (key: any) => {
    const urlParam = new URLSearchParams(location.search);
    return urlParam.get(key);
};