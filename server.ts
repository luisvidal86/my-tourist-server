"use strict";

// import or require express.
import * as express from "express";
// import or require our swagger middleware
import * as swaggerExpress from "swagger-express-mw";

const port = 4200;

const swaggerConfig = {
	appRoot: __dirname,
	swaggerFile: 'config/swagger.yaml'
}

export class Server {
    private app: express.Application;
    
    constructor() {
        this.app = express();
    }

    start(): void {
        swaggerExpress.create(swaggerConfig, (error, swagger) => {
            if(error) {
                console.log("there was an error with swagger", { error: error });
                throw error;
            }
            swagger.register(this.app);
        });
        
        // Start the server
        this.app.listen(port, () => console.log(`Server running on port ${port}`));
    }
}