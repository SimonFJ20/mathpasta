
# mathparsa

Math in

Latex and result out

## How use?

```ts
import { parse, latexify, calculate, AST } from 'mathparsa-latexifier-calculator-lib';
const math = '1 / a';
const ast: AST = parse(math);
const latex: string = latexify(ast);
const result: number = calculate(ast); // not implemented
```

```js
const { parse, latexify, calculate } = require('mathparsa-latexifier-calculator-lib');

const math = '1 / a';
const ast = parse(math);
const latex = latexify(ast);
const result = calculate(ast); // not implemented
```

## Sources

- [Latex document docs](https://sascha-frank.com/latex.html)
- [Latex parenthesis docs](https://latex-tutorial.com/big-parentheses/)
