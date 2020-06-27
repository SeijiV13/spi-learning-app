import { VideoRoutes } from './pages/video.routing';
import { VideoContainerComponent } from './pages/video-container/video-container.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'ng-sidebar';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiKeyInterceptor } from 'src/app/core/interceptors/apikey.interceptor';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [VideoContainerComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    VideoRoutes,
    NgxUiLoaderModule,
    NgxBootstrapIconsModule.pick(allIcons),
    SidebarModule.forRoot()
  ], providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiKeyInterceptor,
    multi: true}]
})
export class VideoModule { }
