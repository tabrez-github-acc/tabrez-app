import { Component, OnInit } from '@angular/core';

import {
  GithubIntegrationService,
  IntegrationURLResponse,
  IntegrationStatusResponse,
} from '../github-integration.service';

@Component({
  selector: 'app-status-github',
  templateUrl: './status-github.component.html',
  styleUrls: ['./status-github.component.css'],
})
export class StatusGithubComponent implements OnInit {
  buttonData: IntegrationURLResponse = { url: '', label: 'Loading...' };
  showStatus = false;
  accessDetails: IntegrationStatusResponse = {
    status: '',
    createdAt: '',
    scope: '',
  };
  constructor(private githubIntegration: GithubIntegrationService) {}

  ngOnInit(): void {
    const access_id = sessionStorage.getItem('access_id');
    if (access_id) {
      this.githubIntegration.getStatus(access_id).subscribe((data) => {
        this.accessDetails = data;
        this.showStatus = true;
      });
    }
    this.getConnectURL();
  }

  getConnectURL(): void {
    this.githubIntegration.getConnectURL().subscribe((data) => {
      this.buttonData = data;
    });
  }

  connectToGithub(): void {
    window.open(this.buttonData.url, '_self');
  }

  disconnectFromGithub(): void {
    const access_id = sessionStorage.getItem('access_id');
    this.githubIntegration.removeAccessID(access_id).subscribe(() => {
      sessionStorage.removeItem('access_id');
      this.showStatus = false;
    });
  }
}
