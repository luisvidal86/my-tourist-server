"use strict";

import * as os from "os";

export class ServerAddress {
    public static readonly port: number = 4200;
    public static readonly schema: string = "http://";

    static getFullHostUrl(): URL {
        const networkInterfaces = os.networkInterfaces();
        for(let networkInterface in networkInterfaces) {
            for(let networkAddress in networkInterfaces[networkInterface]){
                const networkInfo = networkInterfaces[networkInterface][networkAddress];
                if (networkInfo.family === "IPv4" && !networkInfo.internal) {
                    return new URL(`${ServerAddress.schema}${networkInfo.address}:${ServerAddress.port}`);
                }
            }
        }

        return undefined;
    }
}