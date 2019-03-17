"use strict";

import { IPlaceRepository } from "./place-repository";

export class BootstrapResolver {
    private static bootstrap() { return require("../bootstrap"); }

    static placeRepository(): IPlaceRepository {
        return BootstrapResolver.bootstrap().placeRepository;
    }
}