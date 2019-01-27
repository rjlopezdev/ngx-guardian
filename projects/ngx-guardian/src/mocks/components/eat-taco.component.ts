import { Component } from '@angular/core';

@Component({
  template: `
  <h2> Eat Taco form </h2>
  <input class="blockToManage" *ngxShowIfGranted="EAT - TACO" type="text" value="Chicken & Beef">
  `
})
export class EatTacoComponent { }
