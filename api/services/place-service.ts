"use strict";

import { IBasicPlace, IExtendedPlace } from "../models/place";

import * as uuid from "uuid/v1";

export interface IPlaceService {
    addPlace(place: IBasicPlace): IExtendedPlace;
}

export class PlaceService implements IPlaceService {
    private static _instance: PlaceService;
    private places: IExtendedPlace[];

    private constructor() {
        this.places = [];
    }

    public static get Instance() {
        return this._instance || (this._instance = new this());
    }

    public addPlace(place: IBasicPlace): IExtendedPlace {
        place.id = uuid();
        if(this.places.push(place) > 0) {
            return place;
        }

        return undefined;
    }
}