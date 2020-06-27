import { VideoService } from './../../../../core/services/video.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lesson-container',
  templateUrl: './lesson-container.component.html',
  styleUrls: ['./lesson-container.component.css']
})
export class LessonContainerComponent implements OnInit {
  selectedCourse: any;
  videos: any;
  lessonNumber;
  constructor(private videoService: VideoService, private router: Router) { }

  ngOnInit() {
    this.selectedCourse = localStorage.getItem('selectedCourse') ? JSON.parse(localStorage.getItem('selectedCourse') ) : '';
    for (const vid of this.selectedCourse.video) {
      vid.group = vid.tags.find(data => data.includes(this.selectedCourse.title));
    }
    this.groupLessons();
    this.getDefaultLesson();
    this.listenToSelectedLesson();
  }

  getDefaultLesson() {
    this.videos = this.selectedCourse.video.filter((data2) => data2.tags.some(tag => tag.includes(`lesson1`)));
    this.lessonNumber = '1';
    localStorage.setItem('selectedVideos', JSON.stringify(this.videos));
  }

  listenToSelectedLesson() {
    this.videoService.selectLesson.subscribe((data) => {
      this.lessonNumber = data;
      this.videos = this.selectedCourse.video.filter((data2) => data2.tags.some(tag => tag.includes(`lesson${data}`)));
      localStorage.setItem('selectedVideos', JSON.stringify(this.videos));
    });
  }

  groupLessons() {
    const res = this.selectedCourse.video.reduce((groups, currentValue) => {
      if ( groups.indexOf(currentValue.group) === -1 ) {
        groups.push(currentValue.group);
      }
      return groups;
   }, []).map((group) => {
      return {
          group,
          video: this.selectedCourse.video.filter((_el) => {
            return _el.group === group;
          })
      };
    });
    this.videoService.lessons.next(res);
  }

  goToVideo(data) {
    localStorage.setItem('selectedVideo', JSON.stringify(data));
    this.router.navigate(['/home/videos']);
  }
}
