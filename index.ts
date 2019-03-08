// import or require express.
import * as express from "express";
// create our express app
const app = express();
// import or require our swagger middleware
import * as swaggerExpress from "swagger-express-mw";
const port = 4200;

const swaggerConfig = {
	appRoot: __dirname,
	swaggerFile: 'config/swagger.yaml'
}

// tells swagger where to find the definition of the API
swaggerExpress.create(swaggerConfig, (error, swagger) => {
	if(error) {
		console.log("there was an error with swagger", { error: error });
		throw error;
	}
	swagger.register(app);
});

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
