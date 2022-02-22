import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';



const MODULES = [
  CommonModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatDatepickerModule,
  MatBadgeModule,
  MatCheckboxModule,
  MatIconModule
];

@NgModule({
  declarations: [],
  imports: MODULES,
  exports: MODULES,
})
export class MaterialModule {}
