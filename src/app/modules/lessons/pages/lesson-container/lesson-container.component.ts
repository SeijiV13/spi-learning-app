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
    for (const vid of this.selectedCourse.video) {
      vid.group = vid.tags.find(data => data.includes(this.selectedCourse.title.value) ||
      data.includes((this.selectedCourse.title.value.toUpperCase())));
    }
    this.groupLessons();
    this.getDefaultLesson();
    this.listenToSelectedLesson();
    this.sortVideos();

  }

  getGroup(data) {
    const  name =  this.selectedCourse.title.value.toLowerCase() + `uc${data}`;
    this.ucService.getUc(name).subscribe((data2: any) => {
      if(data2) {
        this.description = data2.description;
      }
    });
  }

  getDefaultLesson() {
    this.videos = this.selectedCourse.video.filter((data2) => data2.tags.some(tag => tag.includes(`uc1`) ||  tag.includes(`UC1`)));
    this.lessonNumber = '1';
    this.getGroup('1');
    localStorage.setItem('selectedVideos', JSON.stringify(this.videos));
  }

  listenToSelectedLesson() {
    this.videoService.selectLesson.subscribe((data) => {
      this.lessonNumber = data;
      this.videos = this.selectedCourse.video.filter((data2) => data2.tags.some(tag => tag.includes(`uc${data}`)));
      this.sortVideos();
      localStorage.setItem('selectedVideos', JSON.stringify(this.videos));
      this.getGroup(data);
    });
  }

  sortVideos() {
    this.videos =  this.videos.sort((a, b) => parseInt(a.group.charAt(a.group.length - 1)) -   parseInt(b.group.charAt(b.group.length - 1)))
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


  back() {
    this.router.navigate(['/home/courses'])
  }
}
