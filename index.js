// import or require express.
const express = require("express");
// create our express app
const app = express();
// import or require our swagger middleware
const swaggerExpress = require("swagger-express-mw");
const port = 4200;

const swaggerConfig = {
	appRoot: __dirname,
	swaggerFile: 'config/swagger.yaml'
}

// tells swagger where to find the definition of the API
swaggerExpress.create(swaggerConfig, (error, swagerExpress) => {
	if(error) {
		console.log("there was an error with swagger", { error: error });
		throw error;
	}
	swagerExpress.register(app);
});

// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
