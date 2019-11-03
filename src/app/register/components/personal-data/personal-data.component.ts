import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss'],
})
export class PersonalDataComponent implements OnInit {

  @Input()
  formData: any;

  constructor() { }

  ngOnInit() {}

}
