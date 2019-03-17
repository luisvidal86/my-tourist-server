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

export async function retrieveById(req: Request, res: Response): Promise<void> {
    const placeId: string = req['swagger'].params['placeId'].value;
    const place = await PlaceService.getPlaceById(placeId);

    if(place){
        res.status(200).json(place);
    } else {
        res.status(404).end();
    }
}

export async function removeById(req: Request, res: Response): Promise<void> {
    const placeId: string = req['swagger'].params['placeId'].value;

    try {
        const deletedPlace = await PlaceService.removePlaceById(placeId);
    
        if (deletedPlace) {
            res.status(200).json(deletedPlace);
        } else {
            res.status(404).end();
        }
    } catch(error) {
        res.status(500).json({
            code: error.code,
            error: error.message
        });
    }
}

export async function updateById(req: Request, res: Response): Promise<void> {
    const placeId: string = req['swagger'].params['placeId'].value;
    const place: string = req['swagger'].params['place'].value;
    const placeImg: Express.Multer.File = req['swagger'].params['placeImg'].value;

    try {
        const updatedPlace = await PlaceService.updatePlaceById(placeId, place, placeImg);
        if (updatedPlace) {
            res.status(200).json(updatedPlace);
        } else {
            res.status(404).end();
        }
    } catch(error) {
        res.status(500).json({
            code: error.code,
            error: error.message
        });
    }
}