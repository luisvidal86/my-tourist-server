import { Request, Response } from "express";

export function getAPI (req:Request, res: Response) {
    res.status(200).end();
}