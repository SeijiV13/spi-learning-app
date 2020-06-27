import { VideoService } from './../../../../core/services/video.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-container',
  templateUrl: './video-container.component.html',
  styleUrls: ['./video-container.component.scss']
})
export class VideoContainerComponent implements OnInit {
  video;
  url;
  videLoaded = false;
  src = `https://player.vdocipher.com/playerAssets/1.x/vdo/embed/index.html`;
  constructor(private videoService: VideoService, private sanitize: DomSanitizer) { }

  ngOnInit(): void {
    this.getVideo();
    this.restartPage();
  }

  getVideo() {
    this.videLoaded = false;
    this.video = JSON.parse(localStorage.getItem('selectedVideo'));
    this.videoService.getVdoOtp(this.video.id).subscribe((data: any) => {
      const link = this.src + `#otp=${data.otp}&playbackInfo=${data.playbackInfo}`;
      this.url = this.sanitize.bypassSecurityTrustResourceUrl(this.src + `#otp=${data.otp}&playbackInfo=${data.playbackInfo}`);
      setTimeout(() =>  this.videLoaded = true);
    });
  }

  restartPage() {
    this.videoService.restartVideoPage.subscribe((data) => {
      this.getVideo();
    });
  }

}
