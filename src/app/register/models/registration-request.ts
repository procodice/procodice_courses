import { PersonalData } from './personal-data';

export class RegistrationRequest {
    personalData: PersonalData
    preferredDays: string[];
    preferredHours: string[];
    recommendedPeople: PersonalData[];
}