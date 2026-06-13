import { Component } from '@angular/core';
import { FacebookLink } from '../facebook-link/facebook-link';

@Component({
  selector: 'app-footer',
  imports: [FacebookLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {}
