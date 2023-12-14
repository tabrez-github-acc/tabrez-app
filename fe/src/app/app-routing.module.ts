import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatusGithubComponent } from './status-github/status-github.component';
import { CallbackGithubComponent } from './callback-github/callback-github.component';

const routes: Routes = [
  { path: '', component: StatusGithubComponent },
  { path: 'callback', component: CallbackGithubComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
