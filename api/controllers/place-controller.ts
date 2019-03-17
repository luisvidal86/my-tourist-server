"use strict";

import { PlaceService } from "../services/place-service";
import { Request, Response } from "express";
import { IExtendedPlace } from "../models/place";

export async function createPlace(req: Request, res: Response): Promise<void> {
    const place: string = req['swagger'].params['place'].value;
    const placeImg: Express.Multer.File = req['swagger'].params['placeImg'].value;

    try {
        const placeAdded: IExtendedPlace = await PlaceService.addPlace(place, placeImg);
        if (placeAdded) {
            res.status(200).json(placeAdded);
        } else {
            res.status(500).end({
                code: 1003,
                error: "place has not been added"
            });
        }
    } catch(error) {
        res.status(500).json({
            code: error.code,
            error: error.message
        });
    }
}

export async function retrievePlaces(req: Request, res: Response): Promise<void> {
    const places = await PlaceService.getPlaces();
    res.status(200).json(places);
}