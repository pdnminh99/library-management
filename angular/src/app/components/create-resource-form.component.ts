import {Component} from '@angular/core';
import {ToolbarMode} from './toolbar.component';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'create-resource-component',
  template: `
    <div>
      <toolbar-component [mode]="mode"></toolbar-component>
      Create something!
    </div>`,
})
export class CreateResourceFormComponent {
  public mode = ToolbarMode.CREATE;
}
