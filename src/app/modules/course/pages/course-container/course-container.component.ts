import { VideoService } from './../../../../core/services/video.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-container',
  templateUrl: './course-container.component.html',
  styleUrls: ['./course-container.component.scss']
})
export class CourseContainerComponent implements OnInit {
  rawCourses: any = [];
  constructor(private router: Router, private videoService: VideoService) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    const id = localStorage.getItem('idus');
    this.videoService.getUserCourse(id).subscribe((data) => {
            localStorage.setItem('userCourses', JSON.stringify(data));
            this.videoService.getCourseGroup(data).subscribe((data2) => {
            this.rawCourses = data2;
            localStorage.setItem('rawCourses', JSON.stringify(data2));
       });
    });
  }

  goToCourse(data) {
    localStorage.setItem('selectedCourse', JSON.stringify(data));
    this.router.navigate(['/home/lessons']);
  }



}
