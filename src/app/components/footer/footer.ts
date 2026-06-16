import { Component } from '@angular/core';
import { FacebookLink } from '../facebook-link/facebook-link';
import { SITE_INFO } from '../../shared/site-info';

@Component({
  selector: 'app-footer',
  imports: [FacebookLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  siteInfo = SITE_INFO;
}
