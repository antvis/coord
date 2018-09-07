module.exports = blocks => `
const coord = require('./core');
${blocks}
module.exports = coord;
`;
