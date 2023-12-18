import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { GithubIntegrationService } from '../github-integration.service';

@Component({
  selector: 'app-callback-github',
  templateUrl: './callback-github.component.html',
  styleUrls: ['./callback-github.component.css'],
})
export class CallbackGithubComponent implements OnInit {
  status: undefined | string = 'Loading...';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private githubIntegration: GithubIntegrationService
  ) {}

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code');
    this.githubIntegration.getAccessID(code).subscribe((data) => {
      if (data.access_id) {
        sessionStorage.setItem('access_id', data.access_id);
        this.router.navigate(['/']);
      } else {
        this.status = data.errorDesc;
      }
    });
  }
}
