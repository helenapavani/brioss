import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
	selector: 'app-snackbar',
	templateUrl: './snackbar.component.html',
	styleUrls: ['./snackbar.component.scss'],
	standalone: true,
	imports: [MatButtonModule, MatSnackBarModule],
})
export class SnackbarComponent {

	snackBarRef = inject(MatSnackBarRef);

}
