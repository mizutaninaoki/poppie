export const scrollTop = (): void => {
    const main = document.getElementById('main');
    const header = document.querySelector('header');

    if (!main || !header || !window.scrollTo) return;

    window.scrollTo({ top: main.offsetTop - header.clientHeight, behavior: 'auto' });
};
