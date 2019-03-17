"use strict";

import { Bootstrap } from "./api/bootstrap";
import { ServerAddress } from "./api/utils/ServerAddress";

import * as express from "express";
import * as swaggerExpress from "swagger-express-mw";
import * as path from "path";

const placeImagesRepository = "C:\\places";

const swaggerConfig = {
	appRoot: __dirname,
	swaggerFile: 'config/swagger.yaml'
}

export class Server {
    private app: express.Application;
    private bootstrap: Bootstrap;
    private serverHost: URL;
    
    constructor() {
        this.app = express();
        this.serverHost = ServerAddress.getFullHostUrl();
    }

    start(): void {
        swaggerExpress.create(swaggerConfig, (error, swagger) => {
            if(error) {
                console.log("there was an error with swagger", { error: error });
                throw error;
            }
            swagger.register(this.app);
        });

        // export static content
        this.app.use('/img', express.static(path.resolve(placeImagesRepository)));
        
        // Start the server
        this.app.listen(parseInt(this.serverHost.port), "0.0.0.0", () => {
            this.bootstrap = new Bootstrap(this.serverHost.href);
            this.bootstrap.start();
            console.log(`Server running on port ${this.serverHost.port}`)
        });
    }
}