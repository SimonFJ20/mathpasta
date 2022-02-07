@preprocessor typescript

@{%
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
%}

@lexer lexer

result      ->  _ value _ {% v => v[1] %}

value       ->  comparison                  {% id %}

comparison  ->  comparison _ "=" _ AS       {% v => ({type: 'equal', left: v[0], right: v[4]}) %}
            |   comparison _ "!=" _ AS      {% v => ({type: 'inequal', left: v[0], right: v[4]}) %}
            |   comparison _ "<=" _ AS      {% v => ({type: 'lte', left: v[0], right: v[4]}) %}
            |   comparison _ ">=" _ AS      {% v => ({type: 'gte', left: v[0], right: v[4]}) %}
            |   comparison _ "<" _ AS       {% v => ({type: 'lt', left: v[0], right: v[4]}) %}
            |   comparison _ ">" _ AS       {% v => ({type: 'gt', left: v[0], right: v[4]}) %}
            |   AS {% id %}

AS          ->  AS _ "+" _ MD       {% v => ({type: 'addition', left: v[0], right: v[4]}) %}
            |   AS _ "-" _ MD       {% v => ({type: 'subtraction', left: v[0], right: v[4]}) %}
            |   MD                  {% id %}

MD          ->  MD _ "*" _ E        {% v => ({type: 'multiplication', left: v[0], right: v[4]}) %}
            |   MD _ "/" _ E        {% v => ({type: 'division', left: v[0], right: v[4]}) %}
            |   E                   {% id %}

E           ->  P _ "^" _ E         {% v => ({type: 'exponentation', left: v[0], right: v[4]}) %}
            |   P                   {% id %}

P           ->  "(" _ value _ ")"   {% v => ({type: 'parenthesis', value: v[2]}) %}
            |   function            {% id %}

function    ->  %name _ "(" params ")"    {% v => ({type: 'function', name: v[0], params: v[3]}) %}
            |   literal             {% id %}

params      ->  (_ value (_ "," _ value):*):? _ ("," _):?
    {% v => v[0] ? [v[0][1], ...v[0][2].map((v: any) => v[3])] : [] %}

literal     ->  %int                {% id %}
            |   %float              {% id %}
            |   %name               {% id %}

_           ->  __:?
__          ->  (%ws|%nl):+
