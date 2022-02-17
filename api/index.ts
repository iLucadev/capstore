import app from "./app";
import "./database";
/**
 * The backend Rest API is builded in node.js with the framework express.js. The database is
 * MongoDB with mongoose as connection module with CORS for requests. In addition, for
 * environmental variables we use dotENV.
 */

//Setting the server port.
app.listen(3001, () => console.log("server on port 3001"));
console.log("hey you");
