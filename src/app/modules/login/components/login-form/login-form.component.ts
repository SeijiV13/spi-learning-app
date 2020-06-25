import { AuthService } from './../../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  constructor(private router: Router,
              private fb: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
    this.animateForm();
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  animateForm() {
    let current = null;
    document.querySelector('#email').addEventListener('focus', (e) => {
      if (current) { current.pause(); }
      current = anime({
        targets: 'path',
        strokeDashoffset: {
          value: 0,
          duration: 700,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '240 1386',
          duration: 700,
          easing: 'easeOutQuart'
        }
      });
    });
    document.querySelector('#password').addEventListener('focus', (e) => {
      if (current) { current.pause(); }
      current = anime({
        targets: 'path',
        strokeDashoffset: {
          value: -336,
          duration: 700,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '240 1386',
          duration: 700,
          easing: 'easeOutQuart'
        }
      });
    });
    document.querySelector('#submit').addEventListener('focus', (e) => {
      if (current) { current.pause(); }
      current = anime({
        targets: 'path',
        strokeDashoffset: {
          value: -730,
          duration: 700,
          easing: 'easeOutQuart'
        },
        strokeDasharray: {
          value: '530 1386',
          duration: 700,
          easing: 'easeOutQuart'
        }
      });
    });

  }

  login() {
    if(this.form.valid) {
      const user = this.form.getRawValue();
      this.authService.login(user).subscribe((data) => {
        localStorage.setItem('token', data.jwt);
        localStorage.setItem('userk', data.userk);
        localStorage.setItem('name', data.name);
        this.router.navigate(['/home/courses']);
      },
      error => {
        console.log(error);
      });
    }

    //  this.router.navigate(['/home/courses']);
  }


}
