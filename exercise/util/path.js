const path = require("path");
////this exports the path name for root structure of this project which is "/Users/vishnu/NodeProj/exercise"
module.exports = path.dirname(require.main.filename);
