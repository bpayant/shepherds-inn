import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FacebookLink } from '../facebook-link/facebook-link';

@Component({
  selector: 'app-header',
  imports: [RouterLink, FacebookLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {}