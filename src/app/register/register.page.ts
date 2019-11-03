import { RegistrationRequest } from './models/registration-request';
import { RegistrationService } from './services/registration-service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { PersonalData } from './models/personal-data';
import { map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm = this.fb.group({
    preferredHours: [''],
    preferredDays: [''],
    recommendedPeople: this.fb.array([])
  })

  constructor(private fb: FormBuilder, private registrationService: RegistrationService, private toastCtrl: ToastController) {
    this.registerForm.addControl("personalData", this.createPersonalDataControl());
  }

  ngOnInit() {
  }

  addRecommendedPerson() {
    (<FormArray>this.registerForm.controls.recommendedPeople).push(this.createPersonalDataControl());
  }

  removeRecommendedPerson(personIndex: number) {
    (<FormArray>this.registerForm.controls.recommendedPeople).removeAt(personIndex);
  }

  async postForm() {
    let request: RegistrationRequest = this.registerForm.getRawValue();
    await this.registrationService.register(request).then(_ => {
      this.resetForm();
      this.showSuccessMessage();
    })
  }

  async showSuccessMessage() {
     const msg = await this.toastCtrl.create({
      message: "Zapis zakończony sukcesem!",
      duration: 5000,
      color: "success"
    });
    msg.present();
  }

  resetForm() {
    (<FormArray>this.registerForm.controls.recommendedPeople).clear();
    this.registerForm.reset();
  }

  createPersonalDataControl() {
    return this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(9), Validators.maxLength(9)]],
      emailAddress: ['', [Validators.required, Validators.pattern("[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})")]]
    });
  }
}
