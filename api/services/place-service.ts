"use strict";

import { IExtendedPlace } from "../models/place";
import { IPlaceRepository } from "../infrastructure/place-repository";
import { BootstrapResolver } from "../infrastructure/bootstrap-resolver";

export class PlaceService {
    private static placeRepository(): IPlaceRepository { return BootstrapResolver.placeRepository(); }

    public static async addPlace(place: string, placeImg: Express.Multer.File): Promise<IExtendedPlace> {
        return this.placeRepository().store(place, placeImg);
    }
}