class FavIcon extends HTMLElement {
    private static favIconSize = 16;

    static get observedAttributes() {
        return [ "src", "badge", "badgeBackgroundSrc", "badgeColor", "textColor" ]
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

        this.updateSrc();
    }

    get src() {
        return this.getAttribute('src');
    }

    set src(value) {
        this.setAttribute('src', value);
    }

    get badge() {
        return this.getAttribute('badge');
    }

    set badge(value) {
        this.setAttribute('badge', value);
    }

    get badgeColor() {
        return this.getAttribute('badgeColor') || 'red';
    }

    set badgeColor(value) {
        this.setAttribute('badgeColor', value);
    }

    get textColor() {
        return this.getAttribute('textColor') || 'black';
    }

    set textColor(value) {
        this.setAttribute('textColor', value);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "src":
                this.updateSrc();
                break;
            case "badge":
            case "badgeColor":
            case "textColor":
                this.updateIcon();
                break;
        }
    }
    
    private updateSrc() {
        this.image.src = this.src;
    }

    private updateIcon() {
        const context = this.canvas.getContext('2d');
        context.clearRect(0, 0, FavIcon.favIconSize, FavIcon.favIconSize);
        context.drawImage(this.image, 0, 0, FavIcon.favIconSize, FavIcon.favIconSize);

        const drawBadge = !!this.badge;
        if (drawBadge) {
            const badgeSize = FavIcon.favIconSize/3;

            context.beginPath();
            context.arc(this.canvas.width - badgeSize, this.canvas.height - badgeSize, badgeSize, 0, 2*Math.PI);
            context.fillStyle = this.badgeColor;
            context.fill();

            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillStyle = this.textColor;
            context.fillText(this.badge.slice(0, 2), this.canvas.width - badgeSize, this.canvas.height - badgeSize);
        }

        this.link.href = this.canvas.toDataURL('image/png');
    }
}

customElements.define('fav-icon', FavIcon);