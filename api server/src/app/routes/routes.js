const projectRoutes = require('./project');
const baseRoutes = require('./base');

module.exports = (app) => {
     projectRoutes(app);
     baseRoutes(app);
};   


