import { VideoService } from './../../../../core/services/video.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-video-container',
  templateUrl: './video-container.component.html',
  styleUrls: ['./video-container.component.scss']
})
export class VideoContainerComponent implements OnInit {
  video;
  url;
  shareUrl;
  videLoaded = false;
  watchVideos;
  src = `https://player.vdocipher.com/playerAssets/1.x/vdo/embed/index.html`;
  constructor(private videoService: VideoService,
              private sanitize: DomSanitizer,
              private ngxLoaderService: NgxUiLoaderService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
    this.getVideo();
    this.restartPage();
    this.createUrl();
  }

  createUrl() {
    this.shareUrl = `${location.origin}/share/${this.video.id}`;
  }

  checkIfWatched(id) {
    if (this.watchVideos.includes(id)) {
        return true;
      } else {
        return false;
      }

  }

  updateWatched() {
    const id = localStorage.getItem('idus');
    this.videoService.getUserWatchedVideos(id).subscribe((data) => {
      this.watchVideos = data;
      if (!this.checkIfWatched(this.video.id)) {
        this.videoService.updateWatchedVideos(id, this.video.id).subscribe(() => {
          this.videoService.watchVideoEmitter.emit('');
        });
      }
    });

  }

  getVideo() {

    this.videLoaded = false;
    this.ngxLoaderService.start();
    this.video = JSON.parse(localStorage.getItem('selectedVideo'));
    this.videoService.getVdoOtp(this.video.id).subscribe((data: any) => {
      const link = this.src + `#otp=${data.otp}&playbackInfo=${data.playbackInfo}`;
      this.url = this.sanitize.bypassSecurityTrustResourceUrl(this.src + `#otp=${data.otp}&playbackInfo=${data.playbackInfo}`);
      setTimeout(() =>  {this.videLoaded = true,    this.updateWatched();});
      this.ngxLoaderService.stop();
    }, error => {
      if(error.error) {
        this.toastr.error(error.error.message, 'Server Errror');
      } else {
        this.toastr.error('Something went wrong please contact server administrator', 'Server Errror');
      }
      this.ngxLoaderService.stop();
    });
  }

  restartPage() {
    this.videoService.restartVideoPage.subscribe((data) => {
      this.getVideo();
      this.ngxLoaderService.stop();
    });
  }

  back() {
    this.router.navigate(['/home/lessons']);
  }

}
