import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateLinkRequestDto, LinkResponseDto, LinkStatsResponseDto } from '../models/link';

@Service()
export class LinkService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/links';

  list(): Observable<LinkResponseDto[]> {
    return this.http.get<LinkResponseDto[]>(this.baseUrl);
  }

  create(request: CreateLinkRequestDto): Observable<LinkResponseDto> {
    return this.http.post<LinkResponseDto>(this.baseUrl, request);
  }

  stats(code: string): Observable<LinkStatsResponseDto> {
    return this.http.get<LinkStatsResponseDto>(`${this.baseUrl}/${code}/stats`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
