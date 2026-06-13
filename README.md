# Breakpoint

[![Version](https://flat.badgen.net/npm/v/@unsass/breakpoint)](https://www.npmjs.com/package/@unsass/breakpoint)
[![Downloads](https://flat.badgen.net/npm/dt/@unsass/breakpoint)](https://www.npmjs.com/package/@unsass/breakpoint)
[![License](https://flat.badgen.net/npm/license/@unsass/breakpoint)](https://www.npmjs.com/package/@unsass/breakpoint)

## Introduction

A small, dependency-free Sass toolkit for managing responsive breakpoints. Define named breakpoints centrally and apply
them with concise, composable mixins and helpers so media-query logic stays readable and consistent.

## Installing

```shell
npm install @unsass/breakpoint
```

## Usage

```scss
@use "@unsass/breakpoint";

.foo {
    @include breakpoint.up("lg") {
        color: darkcyan;
    }
}
```

### Options

| Option     | Description                                                                           |
|------------|---------------------------------------------------------------------------------------|
| `$screens` | Map of breakpoint tokens, merged into the defaults. Default: the tokens listed below. |
| `$reset`   | Erase the default tokens to start fresh with your own. Default: `false`.              |

```scss
@use "@unsass/breakpoint" with (
    $screens: (
        "lg": 1024px
    )
);
```

### Tokens

| Key   | Value    |
|-------|----------|
| `xs`  | `320px`  |
| `sm`  | `480px`  |
| `md`  | `768px`  |
| `lg`  | `960px`  |
| `xl`  | `1200px` |
| `2xl` | `1400px` |

A token passed through `$screens` is merged into this list, so you can add new sizes:

```scss
@use "@unsass/breakpoint" with (
    $screens: (
        "3xl": 1920px
    )
);
```

Use `$reset: true` to drop the defaults entirely and only keep your own tokens.

### Top-level config override

A module can only be configured once with `@use ... with`. If the breakpoints are already configured at the top level
(by another dependency, for example), use the `config()` mixin instead to override them at runtime.

See the [official documentation](https://sass-lang.com/documentation/at-rules/use#with-mixins) about overriding
configuration with mixins.

## Mixins

### `up($token)`

Applies a `min-width` media query from the given token.

```scss
@use "@unsass/breakpoint";

.foo {
    @include breakpoint.up("lg") {
        color: darkcyan;
    }
}
```

```css
@media (min-width: 960px) {
    .foo {
        color: darkcyan;
    }
}
```

### `down($token)`

Applies a `max-width` media query up to the given token.

```scss
@use "@unsass/breakpoint";

.foo {
    @include breakpoint.down("lg") {
        color: darkcyan;
    }
}
```

```css
@media (max-width: 959.98px) {
    .foo {
        color: darkcyan;
    }
}
```

### `only($token)`

Applies a media query bounded by the token and the next one. The last token behaves like `up()`.

```scss
@use "@unsass/breakpoint";

.foo {
    @include breakpoint.only("lg") {
        color: darkcyan;
    }
}
```

```css
@media (min-width: 960px) and (max-width: 1199.98px) {
    .foo {
        color: darkcyan;
    }
}
```

### `between($min, $max)`

Applies a media query bounded by two tokens.

```scss
@use "@unsass/breakpoint";

.foo {
    @include breakpoint.between("md", "xl") {
        color: darkcyan;
    }
}
```

```css
@media (min-width: 768px) and (max-width: 1199.98px) {
    .foo {
        color: darkcyan;
    }
}
```

### `config($screens, $reset)`

Overrides the top-level `@use ... with` configuration at runtime. Extend the current tokens, or pass `$reset: true` to
replace them entirely.

```scss
@use "@unsass/breakpoint";

// Extend the default list...
@include breakpoint.config((
    "3xl": 1980px
));

// ...or reset for a fresh start.
@include breakpoint.config((
    "tablet": 768px,
    "desktop": 960px
), true);
```

## Functions

### `get-value($token)`

Returns the value of a token from the configured tokens list.

```scss
@use "@unsass/breakpoint";

.foo {
    width: breakpoint.get-value("lg");
}
```

```css
.foo {
    width: 960px;
}
```

### `get-next($token)`

Returns the name of the token that immediately follows the given one. The last token returns `null`.

```scss
@use "@unsass/breakpoint";

$next: breakpoint.get-next("lg"); // "xl"
$last: breakpoint.get-next("2xl"); // null
```

### `get-screens($exclude…)`

Returns the map of configured tokens. Pass one or more token names to exclude them from the result.

```scss
@use "@unsass/breakpoint";

$all: breakpoint.get-screens();
// ("xs": 320px, "sm": 480px, "md": 768px, "lg": 960px, "xl": 1200px, "2xl": 1400px)

$subset: breakpoint.get-screens("xs", "2xl");
// ("sm": 480px, "md": 768px, "lg": 960px, "xl": 1200px)
```
