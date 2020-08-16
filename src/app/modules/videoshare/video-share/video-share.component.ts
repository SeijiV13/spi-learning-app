import { NgxUiLoaderService } from 'ngx-ui-loader';
import { VideoService } from './../../../core/services/video.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-share',
  templateUrl: './video-share.component.html',
  styleUrls: ['./video-share.component.scss']
})
export class VideoShareComponent implements OnInit {
  hasAccess = true;
  video;
  url;
  videLoaded = false;
  apikey = 'hwT9meUAlHoMzfHOI9mFbKuWeCK0YNtyukZ1YYPkLBMdZjYKXbzeEaUy6mp81k9R';
  src = `https://player.vdocipher.com/playerAssets/1.x/vdo/embed/index.html`;
  constructor(private videoService: VideoService,
              private sanitize: DomSanitizer,
              private ngxLoaderService: NgxUiLoaderService,
              private toastr: ToastrService,
              private router: ActivatedRoute) { }

  ngOnInit() {
    const id = this.router.snapshot.paramMap.get('id');
    const tok = this.router.snapshot.queryParamMap.get('id');
    this.videoService.checkShareVideoAccess(tok).subscribe((data) => {
      this.getVideo(id);
    }, error => {
      this.hasAccess = false;
    })
  }


  getVideo(id) {
    this.videLoaded = false;
    this.ngxLoaderService.start();
    this.videoService.getVdoShareOtp(id, this.apikey).subscribe((data: any) => {
      const link = this.src + `#otp=${data.otp}&playbackInfo=${data.playbackInfo}`;
      this.url = this.sanitize.bypassSecurityTrustResourceUrl(this.src + `#otp=${data.otp}&playbackInfo=${data.playbackInfo}`);
      setTimeout(() =>  this.videLoaded = true);
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

}
