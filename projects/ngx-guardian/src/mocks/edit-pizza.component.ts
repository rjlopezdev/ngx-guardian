import { Component } from '@angular/core';

@Component({
  template: `
  <h2> Pizza Edit form </h2>
  <input class="blockToManage" *ngxShowIfGranted="EDIT - PIZZA" type="text" value="Carbonara">
  `
})
export class EditPizzaComponent { }
