import { CourseItemComponent } from './../course/components/course-item/course-item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseContainerComponent } from './pages/course-container/course-container.component';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { CourseRoutes } from './course.routing';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [CourseItemComponent, CourseContainerComponent],
  imports: [
    CommonModule,
    CourseRoutes,
    ToastrModule,
    NgxBootstrapIconsModule.pick(allIcons),
    NgxUiLoaderModule,
  ]
})
export class CourseModule { }
