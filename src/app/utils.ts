import { appendPilet } from './commands';

export function injectPiletsFromUrl(url: string) {
  return fetch(url)
    .then(res => res.json())
    .then(
      r => {
        // it's a JSON manifest!
        const items = Array.isArray(r) ? r : Array.isArray(r.items) ? r.items : [];

        for (const item of items) {
          appendPilet(item);
        }
      },
      () => {
        const path = url.substr(url.indexOf('//') + 2).replace(/\//g, '-');
        // it's a JS (or non-JSON) file!
        appendPilet({
          name: `pilet-${path}`,
          version: '1.0.0',
          link: url,
        });
      },
    );
}

export function checkJson(input: string) {
  try {
    JSON.parse(input);
    return true;
  } catch {
    return false;
  }
}

export function getTheme() {
  const theme = localStorage.getItem('theme');

  if (theme) {
    return theme;
  } else {
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (userPrefersDark) {
      return 'dark';
    } else {
      return 'light';
    }
  }
}
