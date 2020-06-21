import { LessonContainerComponent } from './pages/lesson-container/lesson-container.component';
import { LessonItemComponent } from './components/lesson-item/lesson-item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { LessonsRoutes } from './lessons.routing';


@NgModule({
  declarations: [LessonItemComponent, LessonContainerComponent],
  imports: [
    CommonModule,
    LessonsRoutes,
    NgxBootstrapIconsModule.pick(allIcons),
  ]
})
export class LessonsModule { }
