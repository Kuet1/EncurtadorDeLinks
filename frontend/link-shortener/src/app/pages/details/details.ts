import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-details',
  styleUrl: './details.css',
  templateUrl: './details.html',
})
export class Details {
  readonly code = input.required<string>();
}
