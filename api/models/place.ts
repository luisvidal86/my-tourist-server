"use strict";

export type PlaceGroup = "monument" | "cathedral" | "garden" | "castle" | "palace" | "fountain" | "church" | "restaurant" | "hotel"; 
export type PlaceTag = "sightseeing" | "eat" | "sleep" | "activity";

export interface IBasicPlace {
    id: string;
    name: string;
    description: string;
    address: string;
    image: string;
    group: PlaceGroup;
    tag: PlaceTag;
}

export interface IExtendedPlace extends IBasicPlace {
    web?: string;
    phone?: string;
    thumbnail?: string;
    gallery?: string[];
}