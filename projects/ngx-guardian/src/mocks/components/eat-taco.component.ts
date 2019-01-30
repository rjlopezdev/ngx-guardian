import { Component } from '@angular/core';

@Component({
  template: `
  <h2> Eat Taco form </h2>
  <input class="blockToBeEnabled" ngxDisableIfNoGranted="READ - FOO" type="text" value="Chicken & Beef">
  <input class="blockToDisable" ngxDisableIfNoGranted="DELETE - FOO" type="text" value="Chicken & Beef">
  `
})
export class EatTacoComponent { }
