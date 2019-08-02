const getLinkHtml = (href: string) => `<link rel="shortcut icon" href="${href}"`;

class FavIcon extends HTMLElement {
    static get observedAttributes() {
        return [ "href" ]
    };

    private link: HTMLLinkElement;

    constructor() {
        super();

        this.link = document.createElement('link');
        this.link.setAttribute("rel", "shortcut icon");

        document.head.appendChild(this.link);

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
        this.link.setAttribute("href", this.href);
    }
}

customElements.define('fav-icon', FavIcon);