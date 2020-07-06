import { NgModule } from '@angular/core';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatButtonModule,
  MatCardModule,
  MatSnackBarModule,
  MatIconModule,
  MatCheckboxModule
} from '@angular/material';

@NgModule({
  imports: [
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    MatCheckboxModule
  ],
  exports: [
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    MatCheckboxModule
  ]
})
export class MaterialModule { }
