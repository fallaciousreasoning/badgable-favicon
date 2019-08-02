const drawBadgeCircle = (to, color, size) => {
    to.beginPath();
    to.arc(this.canvas.width - size, this.canvas.height - size, size, 0, 2 * Math.PI);
    to.fillStyle = this.badgeColor;
    to.fill();
};
const shouldDrawBadgeForContent = (content) => {
    // Empty string should show a badge, as it's just setting the attribute.
    if (content == "")
        return true;
    // Other falsy values should hide the badge.
    if (!content || content == 'false')
        return false;
    // Non falsy values should show a badge.
    return true;
};
const shouldDrawTextForContent = (content) => {
    // If the content coerces to a falsy value, don't show the content.
    return content != false;
};
class FavIcon extends HTMLElement {
    constructor() {
        super();
        this.link = document.createElement('link');
        this.link.setAttribute("rel", "shortcut icon");
        this.image = document.createElement('img');
        this.image.onload = () => this.updateIcon();
        this.badgeBackgroundImage = document.createElement('img');
        this.badgeBackgroundImage.onload = () => this.updateIcon();
        this.canvas = document.createElement('canvas');
        this.canvas.width = FavIcon.favIconSize;
        this.canvas.height = FavIcon.favIconSize;
        document.head.appendChild(this.link);
        this.updateSrc();
        this.updateBadgeBackgroundSrc();
    }
    static get observedAttributes() {
        return ["src", "badge", "badgeBackgroundSrc", "badgeColor", "textColor"];
    }
    ;
    get src() {
        return this.getAttribute('src');
    }
    set src(value) {
        this.setAttribute('src', value);
    }
    get badgeBackgroundSrc() {
        return this.getAttribute("badgeBackgroundSrc");
    }
    set badgeBackgroundSrc(value) {
        this.setAttribute('badgeBackgroundSrc', value);
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
            case "badgeBackgroundSrc":
                this.updateBadgeBackgroundSrc();
                break;
            case "badge":
            case "badgeColor":
            case "textColor":
                this.updateIcon();
                break;
        }
    }
    updateSrc() {
        this.image.src = this.src;
    }
    updateBadgeBackgroundSrc() {
        this.badgeBackgroundImage.src = this.badgeBackgroundSrc;
    }
    updateIcon() {
        const context = this.canvas.getContext('2d');
        context.clearRect(0, 0, FavIcon.favIconSize, FavIcon.favIconSize);
        context.drawImage(this.image, 0, 0, FavIcon.favIconSize, FavIcon.favIconSize);
        const badgeSize = 10;
        if (shouldDrawBadgeForContent(this.badge)) {
            if (this.badgeBackgroundSrc) {
                context.drawImage(this.badgeBackgroundImage, this.canvas.width - badgeSize, this.canvas.height - badgeSize, badgeSize, badgeSize);
            }
            else {
                drawBadgeCircle(context, this.badgeColor, badgeSize);
            }
            if (shouldDrawTextForContent(this.badge)) {
                context.textAlign = 'center';
                context.textBaseline = 'middle';
                context.fillStyle = this.textColor;
                context.fillText(this.badge.slice(0, 2), this.canvas.width - badgeSize / 2, this.canvas.height - badgeSize / 2);
            }
        }
        this.link.href = this.canvas.toDataURL('image/png');
    }
}
FavIcon.favIconSize = 16;
customElements.define('fav-icon', FavIcon);
