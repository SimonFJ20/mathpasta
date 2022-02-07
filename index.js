const { parse } = require('./dist/parser');
const { calculate } = require('./dist/calculator');
const { latexify } = require('./dist/latexifier');

module.exports = {parse, calculate, latexify};
