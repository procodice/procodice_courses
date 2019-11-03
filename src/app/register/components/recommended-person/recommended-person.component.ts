import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'recommended-person',
  templateUrl: './recommended-person.component.html',
  styleUrls: ['./recommended-person.component.scss'],
})
export class RecommendedPersonComponent implements OnInit {

  @Input()
  personForm: any;

  @Input()
  personId: number;

  @Output()
  deleteEvent = new EventEmitter<number>();

  isCollapsed: boolean = false;

  constructor() {}

  ngOnInit() {}

  collapseToggle() {
    this.isCollapsed = !this.isCollapsed;
  }

  delete() {
    this.deleteEvent.emit(this.personId);
  }
}
