import { IExtendedPlace, IBasicPlace } from "../models/place";

import * as uuid from "uuid/v1";
import * as fs from "fs-extra";
import * as path from "path";
import { ServerError } from "../models/server-error";

export interface IPlaceRepository {
    store(place: string, placeImg: Express.Multer.File): Promise<IExtendedPlace>;
    retrieveAll(): Promise<IExtendedPlace[]>;
    retriveById(placeId: string): Promise<IExtendedPlace>;
    deleteById(placeId: string): Promise<IExtendedPlace>;
    updateById(placeId: string, place: string, placeImg?: Express.Multer.File): Promise<IExtendedPlace>;
}

export class PlaceRepository implements IPlaceRepository {
    private readonly imagesUrlBasePath: string = "img";
    private readonly imagesDiskBasePath: string = "C:\\places";

    private places: IExtendedPlace[];

    constructor(private readonly serverHost: string) {
        this.places = [];
    }

    public async store(place: string, placeImg: Express.Multer.File): Promise<IExtendedPlace> {
        const basicPlace: IBasicPlace = this.toBasicPlace(place);
        const placeId = uuid();
        const imagePath: string = await this.storeImageInDisk(placeId, basicPlace.name, placeImg);
        const extendedPlace: IExtendedPlace = {...basicPlace, id: uuid(), image: imagePath} as IExtendedPlace;

        if (this.places.push(extendedPlace) > 0) {
            return extendedPlace;
        }

        return undefined;
    }

    public async retrieveAll(): Promise<IExtendedPlace[]> {
        return this.places;
    }

    public async retriveById(placeId: string): Promise<IExtendedPlace> {
        return this.places.find((place: IExtendedPlace) => {
            return place.id === placeId;
        });
    }

    public async updateById(placeId: string, place: string, placeImg?: Express.Multer.File): Promise<IExtendedPlace> {
        const existingPlace = await this.retriveById(placeId);
        const placeIndex = this.findPlaceIndex(placeId);

        if(!existingPlace || (placeIndex < 0)) {
            return undefined;
        }

        const basicPlace: IBasicPlace = this.toBasicPlace(place);
        Object.assign(existingPlace, basicPlace);
        if(placeImg){
            const imagePath: string = await this.storeImageInDisk(placeId, basicPlace.name, placeImg);
            existingPlace.image = imagePath;
        }
        this.places[placeIndex] = existingPlace;

        return existingPlace;
    }

    public async deleteById(placeId: string): Promise<IExtendedPlace> {
        const placeIndex = this.findPlaceIndex(placeId);
        if (placeIndex < 0) {
            return undefined
        } 

        try {
            const placeToDelete = this.places[placeIndex];
            this.places.splice(placeIndex, 1);
            return placeToDelete;
        } catch (error) {
            const serverError: ServerError = new ServerError(`there was an error removing a place: ${placeId}`);
            serverError.code = 2001;
            throw serverError;
        }
    }

    private async storeImageInDisk(placeId: string, placeName: string, placeImg: Express.Multer.File): Promise<string> {
        try {
            const imageSubFolder: string = placeName.split(' ').join('_');
            const imageFileName: string = placeId;
            const imageRootFolder: string = path.resolve(this.imagesDiskBasePath, imageSubFolder);
            const imagefileExtension: string = path.extname(placeImg.originalname);
            const imageDiskFilePath: string = path.resolve(imageRootFolder, `${imageFileName}${imagefileExtension}`);
            const imageServerUrl: URL = new URL(`${this.serverHost}${this.imagesUrlBasePath}/${imageSubFolder}/${imageFileName}${imagefileExtension}`);

            await fs.mkdirp(path.resolve(imageRootFolder));
            await fs.writeFile(imageDiskFilePath, placeImg.buffer);        

            return imageServerUrl.href;
        } catch(error) {
            const serverError: ServerError = new ServerError("there was an error storing image file");
            serverError.code = 1002;
            throw serverError;
        }
    }

    private toBasicPlace(place: string): IBasicPlace {
        try {
            return JSON.parse(place);
        } catch(error) {
            const serverError: ServerError = new ServerError("there was an error parsing place, it is not a valid place");
            serverError.code = 1001;
            throw serverError;
        }
    }

    private findPlaceIndex(placeId: string): number {
        return this.places.findIndex((place: IExtendedPlace) => {
            return place.id === placeId;
        });
    }
}