import { VideoService } from './../../../../core/services/video.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course-container',
  templateUrl: './course-container.component.html',
  styleUrls: ['./course-container.component.scss']
})
export class CourseContainerComponent implements OnInit {
  rawCourses: any = [];
  constructor(private router: Router,
              private videoService: VideoService,
              private ngxLoaderService: NgxUiLoaderService,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    const id = localStorage.getItem('idus');
    this.ngxLoaderService.start();
    this.videoService.getUserCourse(id).subscribe((data) => {
            this.ngxLoaderService.stop();
            localStorage.setItem('userCourses', JSON.stringify(data));
            this.videoService.getCourseGroup(data).subscribe((data2) => {
            this.rawCourses = data2;
            localStorage.setItem('rawCourses', JSON.stringify(data2));
       });
    }, error => {
      this.toastr.error('Something went wrong please contact server administrator', 'Server Errror');
      this.ngxLoaderService.stop();
    });
  }

  goToCourse(data) {
    localStorage.setItem('selectedCourse', JSON.stringify(data));
    this.router.navigate(['/home/lessons']);
  }



}
