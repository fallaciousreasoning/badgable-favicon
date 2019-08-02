declare const shouldDrawBadgeForContent: (content: string) => boolean;
declare const shouldDrawTextForContent: (content: string) => boolean;
declare class BadgeableFavIcon extends HTMLElement {
    private static favIconSize;
    static readonly observedAttributes: string[];
    private canvas;
    private link;
    private image;
    private badgeBackgroundImage;
    constructor();
    src: string;
    badgeBackgroundSrc: string;
    badgeSize: number;
    badge: string;
    badgeColor: string;
    textColor: string;
    attributeChangedCallback(name: any, oldValue: any, newValue: any): void;
    private updateSrc;
    private updateBadgeBackgroundSrc;
    private updateIcon;
    private drawBadgeCircle;
}
