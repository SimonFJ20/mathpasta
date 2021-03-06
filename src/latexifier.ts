import { AST, FunctionNode, ValueNode } from "./ast";

export const latexify = (ast: AST): string => {
    return `${valueNode(ast)}`;
}

const constants: {[key: string]: string} = {
    'pi': '\\pi',
}

const valueNode = (node: ValueNode): string => {
    switch (node.type) {
        case 'equal':
            return `{${valueNode(node.left)}}={${valueNode(node.right)}}`;
        case 'inequal':
            return `{${valueNode(node.left)}}!={${valueNode(node.right)}}`;
        case 'lt':
            return `{${valueNode(node.left)}}<{${valueNode(node.right)}}`;
        case 'gt':
            return `{${valueNode(node.left)}}>{${valueNode(node.right)}}`;
        case 'lte':
            return `{${valueNode(node.left)}}<={${valueNode(node.right)}}`;
        case 'gte':
            return `{${valueNode(node.left)}}>={${valueNode(node.right)}}`;
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
            return `\\${node.name}${node.params.map(p => `{${valueNode(p)}}`).join('')}`;
        case 'name':
            return node.value in constants ? constants[node.value] : node.value;
        case 'int':
        case 'float':
            return node.value;
        default:
            throw new Error(`type '${(node as any).type}' not implemented`);
    }
}
