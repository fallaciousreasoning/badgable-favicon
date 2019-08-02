
class FavIcon extends HTMLElement {
    private static favIconSize = 16;

    static get observedAttributes() {
        return [ "href", "badge" ]
    };

    private canvas: HTMLCanvasElement;
    private link: HTMLLinkElement;
    private image: HTMLImageElement;

    constructor() {
        super();

        this.link = document.createElement('link');
        this.link.setAttribute("rel", "shortcut icon");

        this.image = document.createElement('img');
        this.image.onload = () => this.updateIcon();

        this.canvas = document.createElement('canvas');
        this.canvas.width = FavIcon.favIconSize;
        this.canvas.height = FavIcon.favIconSize;

        document.head.appendChild(this.link);

        this.updateHref();
    }

    get href() {
        return this.getAttribute('href');
    }

    set href(value) {
        this.setAttribute('href', value);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name !== "href" || oldValue == newValue) return;
        this.updateHref();
        this.updateIcon();
    }
    
    private updateHref() {
        this.image.src = this.href;
    }

    private updateIcon() {
        const context = this.canvas.getContext('2d');
        context.clearRect(0, 0, FavIcon.favIconSize, FavIcon.favIconSize);
        context.drawImage(this.image, 0, 0, FavIcon.favIconSize, FavIcon.favIconSize);

        this.link.href = this.canvas.toDataURL('image/png');
    }
}

customElements.define('fav-icon', FavIcon);