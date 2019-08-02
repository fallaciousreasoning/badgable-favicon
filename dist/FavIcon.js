class FavIcon extends HTMLElement {
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
    static get observedAttributes() {
        return ["href", "badge"];
    }
    ;
    get href() {
        return this.getAttribute('href');
    }
    set href(value) {
        this.setAttribute('href', value);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name !== "href" || oldValue == newValue)
            return;
        this.updateHref();
        this.updateIcon();
    }
    updateHref() {
        this.image.src = this.href;
    }
    updateIcon() {
        const context = this.canvas.getContext('2d');
        context.clearRect(0, 0, FavIcon.favIconSize, FavIcon.favIconSize);
        context.drawImage(this.image, 0, 0, FavIcon.favIconSize, FavIcon.favIconSize);
        this.link.href = this.canvas.toDataURL('image/png');
    }
}
FavIcon.favIconSize = 16;
customElements.define('fav-icon', FavIcon);
