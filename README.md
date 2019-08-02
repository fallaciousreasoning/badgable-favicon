# Badgable FavIcon

This project makes it possible to badge the favicon of the current page. You can play with a demo [here](https://melodious-settee.glitch.me).

## Usage

Include the "BadgeableFavicon.js" file in your project.

Run
```
npm install badgable-favicon
```

and then, if using WebPack:
```js
import "BadgableFavIcon";
```

or if using VanillaJS

```html
<script type="text/javascript" src="path/to/BadgableFavIcon.js"></script>
```

To use, simply add a `<badgable-favicon/>` tag to the `<head>` of your document.

```html
<!-- Badges the favicon for the current page with a '1' -->
<badgable-favicon src="/favicon.png" badge="1" />
```

## API

The API provides methods for controlling and customizing the badge.

| Attribute          | Type       | Description                                                                                                  |
|--------------------|------------|--------------------------------------------------------------------------------------------------------------|
| src                | `string`   | The url of the favicon to display. This must be set in order for a favicon to be displayed.                  |
| badge              | `string` \|`int` \|`boolean`|The badge to display. See [badge values](#badge-values) for more detail.                   |
| badgeColor         | `string`   | A string representing the color of the badge. Defaults to `#FF0000`. Not used if `badgeBackgroundSrc is set. |
| textColor          | `string`   | A string represnting the color of the text on the badge. Defaults to `#000000`.                              |
| badgeBackgroundSrc | `string`   | Url for an image to display as the badge background. Used instead of `badgeColor`.                           |
| badgeSize          | `number`   | The size of the badge. Should be between `0` and `16`. Defaults to `10`.                                     |

### Badge Values

An attempt has been made to provide sensible defaults for different badge values.

| Badge Value | Shows Badge | Shows Text |
|-------------|-------------|------------|
| `""`        | Y           | N          |
| `true`      | Y           | N          |
| `false`     | N           | N          |
| `0`         | N           | N          |
| `[1-9]`     | Y           | Y          |
| `"\w+"`     | Y           | Y          |