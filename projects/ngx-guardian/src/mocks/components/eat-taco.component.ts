import { Component } from '@angular/core';

@Component({
  template: `
  <h2> Eat Taco form </h2>
  <input class="blockToBeEnabled" ngxDisableIfNoGranted="READ - FOO" type="text" value="Chicken & Beef">
  <input class="blockToDisable" ngxDisableIfNoGranted="DELETE - FOO" type="text" value="Chicken & Beef">
  <button class="blockToDisableTypeSubmit" type="submit" ngxDisableIfNoGranted="DELETE - FOO" value="Chicken & Beef"> Submit </button>
  <button class="blockToDisableTypeButton" type="button" ngxDisableIfNoGranted="DELETE - FOO" value="Chicken & Beef"> Submit </button>
  <div class="blockToBeEnabledNoInputType" ngxDisableIfNoGranted="DELETE - FOO"> This is a html block </div>
  `
})
export class EatTacoComponent { }
