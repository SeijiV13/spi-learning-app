import { VideoService } from './../../../../core/services/video.service';
import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent implements OnInit {
  opened = false;
  courses: any  = [];
  showMenu = true;
  lessons = [];
  lessonNumber = 1;
  sidebarTitle = '';
  overview = '';
  videos = [];
  video;
  selectedCourse;

  constructor(private videoService: VideoService, private router: Router, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.listenToRouter();
    this.listenToLessons();
    this.checkUrl();
  }


  checkUrl() {
    if (this.router.url === '/home/courses') {
      this.showMenu = false;
   } else {
     this.showMenu = true;
     if (this.router.url === '/home/lessons') {
      this.opened = true;
      this.sidebarTitle = 'Lessons';
      this.getCourseTitle();
     } else if (this.router.url === '/home/videos') {
      this.opened = true;
      this.sidebarTitle = 'Videos';
      this.getVideos();
     }
   }
  }

  getVideos() {
    this.videos = JSON.parse(localStorage.getItem('selectedVideos'));
    this.video = JSON.parse(localStorage.getItem('selectedVideo'));
  }

  getCourseTitle() {
    this.selectedCourse = JSON.parse(localStorage.getItem('selectedCourse'));
  }

  listenToLessons() {
    this.videoService.lessons.subscribe((data) => {
      this.lessons = data;
      this.cd.detectChanges();
    });

    this.videoService.selectLesson.subscribe((data) => {
      this.lessonNumber = data;
    });
  }

  listenToRouter() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.opened = false;
        if (event.url === '/home/courses') {
          this.showMenu = false;
       } else {
         this.showMenu = true;
         if (event.url === '/home/lessons') {
           this.opened = true;
           this.sidebarTitle = 'Lessons';
           this.getCourseTitle();
         }

         if (event.url === '/home/videos') {
          this.opened = true;
          this.sidebarTitle = 'Videos';
          this.getVideos();
        }
       }
      }
    });
  }

  toggleSidebar() {
    this.opened = !this.opened;
  }

  selectLesson(lessonNumber) {
    this.videoService.selectLesson.next(lessonNumber);
  }

  goToVideo(data) {
    localStorage.setItem('selectedVideo', JSON.stringify(data));
    this.video = JSON.parse(localStorage.getItem('selectedVideo'));
    this.videoService.restartVideoPage.next();
    this.router.navigate(['/home/videos']);
  }

}
