"use strict";

import { PlaceRepository } from "./infrastructure/place-repository";

export class Bootstrap {
    constructor(private readonly serverHost: string) { }

    async start(): Promise<void> {
        module.exports.placeRepository = new PlaceRepository(this.serverHost);
    }
}