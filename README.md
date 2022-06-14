# Breakpoint

[![Version](https://flat.badgen.net/npm/v/@unsass/breakpoint)](https://www.npmjs.com/package/@unsass/breakpoint)
[![Downloads](https://flat.badgen.net/npm/dt/@unsass/breakpoint)](https://www.npmjs.com/package/@unsass/breakpoint)
[![License](https://flat.badgen.net/npm/license/@unsass/breakpoint)](https://www.npmjs.com/package/@unsass/breakpoint)

## Introduction

Easily manage your CSS breakpoint rules.

> **Note:** this is new code moved
> from [`@sass-collective/breakpoint`](https://github.com/sass-collective/sass-collective/tree/master/packages/breakpoint)
> repository.

## Installing

```shell
npm install @unsass/breakpoint
```

## Usage

```scss
@use "@unsass/breakpoint";

.foo {
    @include breakpoint.up(lg) {
        // ...
    }
}
```

### Configuration

```scss
@use "@unsass/breakpoint" with (
    $screens: (
        "lg": 1024px
    )
);
```

### Options

| Variable   | Default               | Description                                                                                       |
|------------|-----------------------|---------------------------------------------------------------------------------------------------|
| `$screens` | See `Tokens` section. | Sets a list of breakpoint tokens.                                                                 |
| `$reset`   | `false`               | Erase the default `$screens` config for helping you on a fresh start with your own custom tokens. |

### Tokens

| Key   | Value    |
|-------|----------|
| `xs`  | `360px`  |
| `sm`  | `480px`  |
| `md`  | `768px`  |
| `lg`  | `960px`  |
| `xl`  | `1200px` |
| `2xl` | `1400px` |

You can also define new size:

```scss
@use "@unsass/breakpoint" with (
    $screens: (
        "3xl": 1920px
    )
);
```

The new token named `3xl` will be added to the default tokens list.

### Top-level config override

If variables are already configured on top-level using `@use ... with`, by another dependency for example, you can't use
this solution anymore, because the module can only be setup once, this is a Sass restriction with **Module System**, but
another solution exist for override the main configuration, with a mixin!

See [official documentation](https://sass-lang.com/documentation/at-rules/use#with-mixins) about override configuration
with mixins.

| Mixin                      | Description                              |
|----------------------------|:-----------------------------------------|
| `config($screens, $reset)` | Override top-level `with` configuration. |

#### Declare config with `breakpoint.config()`

```scss
@use "@unsass/breakpoint";

// Extend the default list...
@include breakpoint.config((
    "3xl": 1980px
));

// ... or reset for fresh start...
@include breakpoint.config((
    "tablet": 768px,
    "desktop": 960px
), true);
```

## API

### Sass mixins

| Mixin                 | Description                                                                                                                    |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------|
| `up($token)`          | Sets media rule for minimum with only.                                                                                         |
| `down($token)`        | Sets media rule for maximum with only.                                                                                         |
| `only($token)`        | Sets media rule for between minimum and maximum widths, but the maximum will be automatically set with next value of `$token`. |
| `between($min, $max)` | Sets media rule for between minimum and maximum widths.                                                                        |

#### Up rule with `breakpoint.up()`

The following Sass...

```scss
@use "@unsass/breakpoint";

.foo {
    @include breakpoint.up(lg) {
        color: darkcyan;
    }
}
```

...will produce the following CSS...

```css
@media (min-width: 960px) {
    .foo {
        color: darkcyan;
    }
}
```

#### Down rule with `breakpoint.down()`

The following Sass...

```scss
@use "@unsass/breakpoint";

.foo {
    @include breakpoint.down(lg) {
        color: darkcyan;
    }
}
```

...will produce the following CSS...

```css
@media (max-width: 959px) {
    .foo {
        color: darkcyan;
    }
}
```

#### Only rule with `breakpoint.only()`

The following Sass...

```scss
@use "@unsass/breakpoint";

.foo {
    @include breakpoint.only(lg) {
        color: darkcyan;
    }
}
```

...will produce the following CSS...

```css
@media (min-width: 960px) and (max-width: 1199px) {
    .foo {
        color: darkcyan;
    }
}
```

#### Between rule with `breakpoint.between()`

The following Sass...

```scss
@use "@unsass/breakpoint";

.foo {
    @include breakpoint.between(md, xl) {
        color: darkcyan;
    }
}
```

...will produce the following CSS...

```css
@media (min-width: 768px) and (max-width: 1199px) {
    .foo {
        color: darkcyan;
    }
}
```

### Sass functions

| Function            | Description                                |
|---------------------|--------------------------------------------|
| `get-value($token)` | Get value from the configured tokens list. |
| `get-screens()`     | Get list of screens tokens.                |

#### Get token value with `breakpoint.get-value()`

The following Sass...

```scss
@use "@unsass/breakpoint";

.foo {
    width: breakpoint.get-value(lg);
}
```

...will produce the following CSS...

```css
.foo {
    width: 960px;
}
```
