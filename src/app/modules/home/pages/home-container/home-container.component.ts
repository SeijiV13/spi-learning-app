import { VideoService } from './../../../../core/services/video.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.css']
})
export class HomeContainerComponent implements OnInit {
  opened = false;


  constructor(private videoService: VideoService) { }

  ngOnInit() {
    this.videoService.getVideos().subscribe((data) => {

    })
  }

  toggleSidebar() {
    this.opened = !this.opened;
  }

}
