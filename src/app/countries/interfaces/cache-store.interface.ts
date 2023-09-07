import { Country } from "./country.interface";
import { Region } from "./region.type";

export interface CacheStore {
    byCapital: TermCountries;
    byCountries: TermCountries;
    byRegion : RegionCountries;
};

interface TermCountries {
    term: string;
    countries: Country[];
};

interface RegionCountries {
    region?: Region;
    countries: Country[]
}