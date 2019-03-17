"use strict";

export type PlaceGroup = "monument" | "cathedral" | "garden" | "castle" | "palace" | "fountain" | "church" | "restaurant" | "hotel"; 
export type PlaceTag = "sightseeing" | "eat" | "sleep" | "activity";

export interface IBasicPlace {
    name: string;
    description: string;
    address: string;
    group: PlaceGroup;
    tag: PlaceTag;
}

export interface IExtendedPlace extends IBasicPlace {
    id: string;
    image: string;
    web?: string;
    phone?: string;
    thumbnail?: string;
    gallery?: string[];
}