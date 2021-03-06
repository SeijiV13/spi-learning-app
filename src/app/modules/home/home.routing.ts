import { HomeContainerComponent } from './pages/home-container/home-container.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: HomeContainerComponent,
    children: [
      {
       path: 'courses', loadChildren: () => import('../course/course.module').then(m => m.CourseModule),
      },
      {
        path: 'lessons', loadChildren: () => import('../lessons/lessons.module').then(m => m.LessonsModule)
      },
      {
        path: 'videos', loadChildren: () => import('../video/video.module').then(m => m.VideoModule)
      }
    ]
  },
];

export const HomeRoutes = RouterModule.forChild(routes);
