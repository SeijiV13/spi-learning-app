import { UcService } from './../../../../core/services/uc.service';
import { VideoService } from './../../../../core/services/video.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lesson-container',
  templateUrl: './lesson-container.component.html',
  styleUrls: ['./lesson-container.component.scss']
})
export class LessonContainerComponent implements OnInit {
  selectedCourse: any;
  videos: any;
  lessonNumber;
  description = '';
  constructor(private videoService: VideoService, private router: Router, private ucService: UcService) { }

  ngOnInit() {
    this.selectedCourse = localStorage.getItem('selectedCourse') ? JSON.parse(localStorage.getItem('selectedCourse') ) : '';
    if(this.selectedCourse) {
      this.videoService.lessons.next(this.selectedCourse);
      this.videos =  this.selectedCourse.videos.filter(data2 => data2.uc === '1');
    }
    this.listenToLesson();
  }

  listenToLesson() {
    this.videoService.selectLesson.subscribe((data) => {
       this.videos =  this.selectedCourse.videos.filter(data2 => data2.uc === data.toString());
    });
  }



  goToVideo(data) {
    localStorage.setItem('selectedVideo', JSON.stringify(data));
    this.router.navigate(['/home/videos']);
  }


  back() {
    this.router.navigate(['/home/courses']);
  }
}
