import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GlobalErrorComponent } from './errors/global-error/global-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  { 
    path: 'home',
    loadChildren: () => import('./home/home.module')
                        .then(m => m.HomeModule)
  }, 
  { 
    path: 'goals',
    loadChildren: () => import('./goals/goals.module')
                        .then(m => m.GoalsModule),
  }, 
  { 
    path: 'uploads',
    loadChildren: () => import('./uploads/uploads.module')
                        .then(m => m.UploapsModule),
  }, 
  { 
    path: 'tasks',
    loadChildren: () => import('./tasks/tasks.module')
                        .then(m => m.TasksModule),
  }, 
  { 
    path: 'error', 
    component: GlobalErrorComponent,
    data: {
      title: 'error'
    } 
  },  
  { 
    path: '**', 
    component: NotFoundComponent ,
    data: {
      title: 'notfound'
    } 
  }  
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes) 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
