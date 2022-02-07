import { Grammar, Parser } from "nearley";
import { AST } from "./ast";
import LangGrammar from "./grammar.gen";

export const parse = (equation: string): AST => {
    const parser = new Parser(Grammar.fromCompiled(LangGrammar));
    try {
        parser.feed(equation);
        return parser.results[0];
    } catch (catched) {
        throw catched;
    }
}