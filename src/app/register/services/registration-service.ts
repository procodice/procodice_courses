import { RegistrationRequest } from './../models/registration-request';

import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class RegistrationService {
    constructor(public store: AngularFirestore) { }

    async register(request: RegistrationRequest) : Promise<any> {
        let doc = this.store.doc<RegistrationRequest>(`registrations/${this.store.createId()}`);
        return await doc.set(request);
    }
}