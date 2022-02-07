
export type AST = ValueNode

export type ValueNode =
    AdditionNode | SubtractionNode | MultiplicationNode | DivisionNode | ExponentationNode
    | ParenthesisNode | FunctionNode | Identifier | Literal

export type AdditionNode = {
    type: 'addition',
    left: ValueNode,
    right: ValueNode,
}

export type SubtractionNode = {
    type: 'subtraction',
    left: ValueNode,
    right: ValueNode,
}

export type MultiplicationNode = {
    type: 'multiplication',
    left: ValueNode,
    right: ValueNode,
}

export type DivisionNode = {
    type: 'division',
    left: ValueNode,
    right: ValueNode,
}

export type ExponentationNode = {
    type: 'exponentation',
    left: ValueNode,
    right: ValueNode,
}

export type ParenthesisNode = {
    type: 'parenthesis',
    value: ValueNode,
}

export type FunctionNode = {
    type: 'function',
    name: Identifier,
    params: ValueNode[],
}

export type Identifier = Token<'name'>

export type Literal = Token<'float' | 'int' | 'name'>

export type Token<T extends TokenType> = {
    type: T,
    value: string,
    text: string,
    offset: number,
    lineBreaks: number,
    line: number,
    col: number,
}

export type TokenType = 'ws' | 'float' | 'int' | 'name' | 'keyword' | 'dot' | 'lparen' | 'rparen' | 'plus'
    | 'minus' | 'caret' | 'asterisk' | 'slash' | 'equal' | 'inequal' | 'lte' | 'gte' | 'lt' | 'gt'
