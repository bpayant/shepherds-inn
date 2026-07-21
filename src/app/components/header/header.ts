import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FacebookLink } from '../facebook-link/facebook-link';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FacebookLink],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {}
