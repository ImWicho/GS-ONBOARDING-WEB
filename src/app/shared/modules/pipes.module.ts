import { NgModule } from '@angular/core';
import { FormartDatePipe } from '../pipes/formart-date.pipe';
import { ResourceSafePipe } from '../pipes/resource-safe.pipe';



@NgModule({
  declarations: [FormartDatePipe, ResourceSafePipe],
  exports: [FormartDatePipe, ResourceSafePipe]
})
export class PipesModule { }
