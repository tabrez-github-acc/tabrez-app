import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GithubIntegrationService {
  private backendURL = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getConnectURL(): Observable<any> {
    return this.http.get<any>(this.backendURL + '/integration/url');
  }

  getAccessID(code: any): Observable<any> {
    return this.http.get<any>(
      this.backendURL + '/integration/create?code=' + code
    );
  }

  getStatus(access_id: any): Observable<any> {
    return this.http.get<any>(
      this.backendURL + '/integration/status?access_id=' + access_id
    );
  }

  removeAccessID(access_id: any): Observable<any> {
    return this.http.get<any>(
      this.backendURL + '/integration/remove?access_id=' + access_id
    );
  }
}
