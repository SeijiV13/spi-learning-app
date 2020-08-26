import { CourseService } from './../../../../core/services/course.service';
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
              private toastr: ToastrService,
              private courseService: CourseService) { }

  ngOnInit() {
    this.getUserCourses();
  }

  getUserCourses() {
    const id = localStorage.getItem('idus');
    this.ngxLoaderService.start();
    this.videoService.getUserCourse(id).subscribe((data) => {

            this.ngxLoaderService.stop();
            this.getCourses(data);
    }, error => {
      this.toastr.error('Something went wrong please contact server administrator', 'Server Errror');
      this.ngxLoaderService.stop();
    });
  }

  getCourses(userCourses) {
    this.courseService.getCourses().subscribe((data: any) => {
      for(const course of userCourses) {
        data.find((data2) => data2.name === course.desc) ? this.rawCourses.push( data.find((data2) => data2.name === course.desc)) : ''
      }
    });
  }

  goToCourse(data) {
    localStorage.setItem('selectedCourse', JSON.stringify(data));
    this.router.navigate(['/home/lessons']);
  }

  getTotalVideos() {
    let  total = 0;
    for(const course of this.rawCourses) {
     total =  total + course.video.length;
    }
    return total;
  }


}
