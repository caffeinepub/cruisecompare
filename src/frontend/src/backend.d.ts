import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CruiseDeal {
    id: string;
    destination: string;
    departurePort: string;
    shipName: string;
    durationNights: bigint;
    pricePerPerson: number;
    highlights: Array<string>;
    discountPct: bigint;
    currency: string;
    rating: number;
    cruiseLine: string;
}
export interface Carrier {
    id: string;
    name: string;
}
export interface Destination {
    id: string;
    name: string;
    description: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllDeals(): Promise<Array<CruiseDeal>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCarriers(): Promise<Array<Carrier>>;
    getDeal(id: string): Promise<CruiseDeal | null>;
    getDealsByCarrier(carrier: string): Promise<Array<CruiseDeal>>;
    getDealsByDestination(destination: string): Promise<Array<CruiseDeal>>;
    getDestinations(): Promise<Array<Destination>>;
    getSavedDeals(): Promise<Array<string>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    removeSavedDeal(dealId: string): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveDeal(dealId: string): Promise<boolean>;
}
