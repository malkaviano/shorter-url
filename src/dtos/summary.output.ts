import { Url } from "@entities/url.entity";

export interface SummaryOutput {
    userId: string,
    topUrls: Url[];
    hits: number;
    urlCount: number;
}