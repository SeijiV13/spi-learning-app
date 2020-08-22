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
  watchVideos: any= [];
  unitLength = [];
  constructor(private videoService: VideoService, private router: Router, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.listenToRouter();
    this.listenToLessons();
    this.listenToWatchedVideos();
    this.getWatchedVideos();
    this.checkUrl();
  }


  checkUrl() {
    if (this.router.url === '/home/courses') {
      this.showMenu = false;
   } else {
     this.showMenu = true;
     if (this.router.url === '/home/lessons') {
      this.opened = false;
      this.sidebarTitle = 'Unit Competencies';
      this.getCourseTitle();
     } else if (this.router.url === '/home/videos') {
      this.opened = false;
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

  listenToWatchedVideos() {
    this.videoService.watchVideoEmitter.subscribe(() => {
      this.getWatchedVideos();
    });
  }

  listenToLessons() {
    this.videoService.lessons.subscribe((data) => {
      this.createUnitCompLength(data);
      this.lessons = data;
      this.cd.detectChanges();
    });

    this.videoService.selectLesson.subscribe((data) => {
      this.lessonNumber = data;
    });
  }

  createUnitCompLength(tags) {
    const array = [];
    for (let tag of tags) {
      // const splittedtag =  tag.group.charAt(tag.group.length - 4)
      const splittedtag = tag.group.split("uc")[1].split("lo")[0];

      if(!array.includes(splittedtag)) {
        array.push(splittedtag);
      }
    }
    this.unitLength = array;
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
           this.opened = false;
           this.sidebarTitle = 'Unit Competencies';
           this.getCourseTitle();
         }

         if (event.url === '/home/videos') {
          this.opened = false;
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

  convertTime(val, pad, length) {
    return (new Array(length + 1).join(pad) + val).slice(-length);
  }

  getTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;

    return  this.convertTime(minutes, '0', 2) + ':' + this.convertTime(seconds, '0', 2);
  }

  getWatchedVideos() {
    const id = localStorage.getItem('idus');
    this.videoService.getUserWatchedVideos(id).subscribe((data) => {
      console.log(data);
      this.watchVideos = data;
    });
  }
  checkIfWatched(id) {
    if (this.watchVideos) {
       if (this.watchVideos.includes(id)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }

  }
}
