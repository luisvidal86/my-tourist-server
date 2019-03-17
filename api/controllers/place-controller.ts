"use strict";

import { PlaceService } from "../services/place-service";
import { Request, Response } from "express";

export function createPlace(req: Request, res: Response): void {
    const place = req['swagger'].params['place'].value;
    const placeService = PlaceService.Instance;

    const placeAdded = placeService.addPlace(place);
    if(placeAdded) {
        res.status(200).json(placeAdded);
    } else {
        res.status(500).end();
    }
}