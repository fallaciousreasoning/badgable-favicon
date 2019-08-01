const getLinkHtml = (href: string) => `<link rel="shortcut icon" href="${href}"`;

export class FavIcon extends HTMLElement {
    static get observedAttributes() {
        return [ "href" ]
    };

    private link: HTMLLinkElement;

    constructor() {
        super();

        this.link = document.createElement('link');
        this.attachShadow({ mode: "open" }).appendChild(this.link);
        this.update();
    }

    get href() {
        return this.getAttribute('href');
    }

    set href(value) {
        this.setAttribute('href', value);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name !== "href" || oldValue == newValue) return;

        this.update();
    }

    private update() {
        this.link.innerHTML = getLinkHtml(this.href);
    }
}