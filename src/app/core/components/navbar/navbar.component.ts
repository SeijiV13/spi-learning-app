import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter();
  user = '';
  constructor(private router: Router) { }

  ngOnInit() {
    this.user = localStorage.getItem('name');
  }
  toggle() {
    this.toggleSidebar.emit();
 }

 logoutApp() {
   this.router.navigate(['/']);
 }
}
