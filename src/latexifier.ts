import { AST, ValueNode } from "./ast";

export const latexify = (ast: AST): string => {
    return `$$${valueNode(ast)}$$`;
}

const valueNode = (node: ValueNode): string => {
    switch (node.type) {
        case 'addition':
            return `{${valueNode(node.left)}}+{${valueNode(node.right)}}`;
        case 'subtraction':
            return `{${valueNode(node.left)}}-{${valueNode(node.right)}}`;
        case 'multiplication':
            return `{${valueNode(node.left)}}*{${valueNode(node.right)}}`;
        case 'division':
            return `\\frac{${valueNode(node.left)}}{${valueNode(node.right)}}`;
        case 'exponentation':
            return `{${valueNode(node.left)}}^{${valueNode(node.right)}}`;
        case 'parenthesis':
            return `\\left(${valueNode(node.value)}\\right)`;
        case 'function':
            return `${node.name}(${node.params.join(', ')})`;
        case 'name':
        case 'int':
        case 'float':
            return node.value;
        default:
            throw new Error(`type '${(node as any).type}' not implemented`);
    }
}
