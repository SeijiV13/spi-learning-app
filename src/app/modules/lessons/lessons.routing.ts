import { LessonContainerComponent } from './pages/lesson-container/lesson-container.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: LessonContainerComponent
   },
];

export const LessonsRoutes = RouterModule.forChild(routes);
