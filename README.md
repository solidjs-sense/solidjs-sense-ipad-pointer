# solidjs-sense-ipad-pointer

[context-cursor](https://github.com/PavelLaptev/context-cursor) fork for SolidJS

## Installation

`npm install solidjs-sense-ipad-pointer` or `yarn add solidjs-sense-ipad-pointer`

## Usage

``` jsx
import { IpadPointer } from 'solidjs-sense-ipad-pointer';

const App: Component = () => {
  ...

  <button data-ipad-pointer>Morph default</button>
  <button data-ipad-pointer="lift">Lift</button>
  <button data-ipad-pointer="noParallax">noParallax</button>
  <button data-ipad-pointer="noPadding">noPadding</button>

  return (
    <>
      ...
      <IpadPointer />
    </>
  );
};
```
