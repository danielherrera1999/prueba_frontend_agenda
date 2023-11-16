import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule, Routes } from '@angular/router';
import { Routing } from 'src/app/modules/routing';
import { ContentComponent } from './components/content/content.component';



const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: Routing
  }
]


@NgModule({
  declarations: [
    LayoutComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LayoutModule { }
