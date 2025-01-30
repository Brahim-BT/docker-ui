import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { DockerContainer } from '../model/docker-container';

@Injectable({
  providedIn: 'root'
})
export class ContainerService {
  private apiUrl = 'http://localhost:8080/api/containers';

  constructor(private http: HttpClient) { }

  getContainers(): Observable<DockerContainer[]> {
    return this.http.get<DockerContainer[]>(this.apiUrl).pipe(
      map(containers => containers.map(c => ({
        ...c,
        Id: c.Id || '',
        Names: c.Names || ['Unnamed'],
        Image: c.Image || 'Unknown',
        Status: c.Status || 'Unknown status',
        State: c.State || 'unknown'
      }))),
      catchError(err => {
        console.error('API Error:', err);
        return of([]);
      })
    );
  }

  startContainer(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/start`, {});
  }

  stopContainer(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/stop`, {});
  }

  restartContainer(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/restart`, {});
  }
}
