import { CourseItemComponent } from './components/course-item/course-item.component';
import { Routes, RouterModule } from '@angular/router';
import { CourseContainerComponent } from './pages/course-container/course-container.component';

const routes: Routes = [
  {
    path: '', component: CourseContainerComponent
   },
];

export const CourseRoutes = RouterModule.forChild(routes);
