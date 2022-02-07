// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }
declare var name: any;
declare var int: any;
declare var float: any;
declare var ws: any;
declare var nl: any;

import { compile, keywords } from 'moo';
const lexer = compile({
    ws:         {match: /[\s]+/, lineBreaks: true},
    float:      /\-?(?:(?:0|(?:[1-9][0-9]*))\.[0-9]+)/,
    int:        /0|(?:[1-9][0-9]*)/,
    name:       {match: /[a-zA-Z0-9_]+/, type: keywords({
        keyword: []
    })},
    lparen:     '(',
    rparen:     ')',
    
    plus:       '+',
    minus:      '-',
    caret:      '^',
    asterisk:   '*',
    slash:      '/',

    equal:      '=',
    inequal:    '!=',
    lte:        '<=',
    gte:        '>=',
    lt:         '<',
    gt:         '>',
});

interface NearleyToken {
  value: any;
  [key: string]: any;
};

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: never) => string;
  has: (tokenType: string) => boolean;
};

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
};

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
};

const grammar: Grammar = {
  Lexer: lexer,
  ParserRules: [
    {"name": "value", "symbols": ["AS"]},
    {"name": "AS", "symbols": ["AS", "_", {"literal":"+"}, "_", "MD"], "postprocess": v => ({type: 'addition', left: v[0], right: v[4]})},
    {"name": "AS", "symbols": ["AS", "_", {"literal":"-"}, "_", "MD"], "postprocess": v => ({type: 'subtraction', left: v[0], right: v[4]})},
    {"name": "AS", "symbols": ["MD"], "postprocess": id},
    {"name": "MD", "symbols": ["MD", "_", {"literal":"*"}, "_", "E"], "postprocess": v => ({type: 'multiplication', left: v[0], right: v[4]})},
    {"name": "MD", "symbols": ["MD", "_", {"literal":"/"}, "_", "E"], "postprocess": v => ({type: 'division', left: v[0], right: v[4]})},
    {"name": "MD", "symbols": ["E"], "postprocess": id},
    {"name": "E", "symbols": ["P", "_", {"literal":"^"}, "_", "E"], "postprocess": v => ({type: 'exponentation', left: v[0], right: v[4]})},
    {"name": "E", "symbols": ["P"], "postprocess": id},
    {"name": "P", "symbols": [{"literal":"("}, "_", "value", "_", {"literal":")"}], "postprocess": v => v[0]},
    {"name": "P", "symbols": ["function"], "postprocess": id},
    {"name": "function", "symbols": [(lexer.has("name") ? {type: "name"} : name), "_", {"literal":"("}, "params", {"literal":")"}], "postprocess": v => ({type: 'function', name: v[0], params: v[3]})},
    {"name": "function", "symbols": ["literal"], "postprocess": id},
    {"name": "params$ebnf$1$subexpression$1$ebnf$1", "symbols": []},
    {"name": "params$ebnf$1$subexpression$1$ebnf$1$subexpression$1", "symbols": ["_", {"literal":","}, "_", "value"]},
    {"name": "params$ebnf$1$subexpression$1$ebnf$1", "symbols": ["params$ebnf$1$subexpression$1$ebnf$1", "params$ebnf$1$subexpression$1$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "params$ebnf$1$subexpression$1", "symbols": ["_", "value", "params$ebnf$1$subexpression$1$ebnf$1"]},
    {"name": "params$ebnf$1", "symbols": ["params$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "params$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "params$ebnf$2$subexpression$1", "symbols": [{"literal":","}, "_"]},
    {"name": "params$ebnf$2", "symbols": ["params$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "params$ebnf$2", "symbols": [], "postprocess": () => null},
    {"name": "params", "symbols": ["params$ebnf$1", "_", "params$ebnf$2"], "postprocess": v => v[0] ? [v[0][1], ...v[0][2].map((v: any) => v[3])] : []},
    {"name": "literal", "symbols": [(lexer.has("int") ? {type: "int"} : int)], "postprocess": id},
    {"name": "literal", "symbols": [(lexer.has("float") ? {type: "float"} : float)], "postprocess": id},
    {"name": "literal", "symbols": [(lexer.has("name") ? {type: "name"} : name)], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": ["__"], "postprocess": id},
    {"name": "_$ebnf$1", "symbols": [], "postprocess": () => null},
    {"name": "_", "symbols": ["_$ebnf$1"]},
    {"name": "__$ebnf$1$subexpression$1", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "__$ebnf$1$subexpression$1", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1$subexpression$1"]},
    {"name": "__$ebnf$1$subexpression$2", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)]},
    {"name": "__$ebnf$1$subexpression$2", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl)]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "__$ebnf$1$subexpression$2"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "__", "symbols": ["__$ebnf$1"]}
  ],
  ParserStart: "value",
};

export default grammar;
