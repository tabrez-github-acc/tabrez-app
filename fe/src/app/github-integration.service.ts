import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env } from '../environments/environment';

export interface IntegrationURLResponse {
  label: string;
  url: string;
}

interface IntegrationCreateResponse {
  access_id: string;
  errorDesc?: string;
}

interface GithubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: null | string;
  company: null | string;
  blog: string;
  location: null | string;
  email: null | string;
  hireable: null | string;
  bio: null | string;
  twitter_username: null | string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

interface GithubUserEmail {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
}
export interface IntegrationStatusResponse {
  status: string;
  scope: string;
  createdAt: string;
  user?: GithubUser;
  userEmail?: GithubUserEmail[];
}

interface IntegrationRemoveResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class GithubIntegrationService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getConnectURL(): Observable<IntegrationURLResponse> {
    return this.http.get<IntegrationURLResponse>(
      env.apiURL + '/integration/url'
    );
  }

  getAccessID(code: null | string): Observable<IntegrationCreateResponse> {
    return this.http.get<IntegrationCreateResponse>(
      env.apiURL + '/integration/create?code=' + code
    );
  }

  getStatus(access_id: string): Observable<IntegrationStatusResponse> {
    return this.http.get<IntegrationStatusResponse>(
      env.apiURL + '/integration/status?access_id=' + access_id
    );
  }

  removeAccessID(access_id: null | string): Observable<any> {
    return this.http.get<IntegrationRemoveResponse>(
      env.apiURL + '/integration/remove?access_id=' + access_id
    );
  }
}
