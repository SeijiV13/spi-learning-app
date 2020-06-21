import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-container',
  templateUrl: './course-container.component.html',
  styleUrls: ['./course-container.component.scss']
})
export class CourseContainerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToCourse() {
    this.router.navigate(['/home/lessons']);
  }

}
