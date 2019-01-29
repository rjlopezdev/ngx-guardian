import { Component } from '@angular/core';

@Component({
  template: `
  <h2> Pizza Edit form </h2>
  <input class="granted" *ngxShowIfGranted="'CREATE - FOO'" type="text" value="Carbonara">
  <input class="noGranted" *ngxShowIfGranted="'UNKNOWN - FOO'" type="text" value="Pomodoro">
  <button class="blockToDisabled"> Submit </button>
  `
})
export class EditPizzaComponent { }
