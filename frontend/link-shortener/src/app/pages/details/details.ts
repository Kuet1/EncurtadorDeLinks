import { DatePipe } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkStatsResponseDto } from '../../models/link';
import { LinkService } from '../../services/link.service';

@Component({
  imports: [DatePipe, RouterLink],
  selector: 'app-details',
  styleUrl: './details.css',
  templateUrl: './details.html',
})
export class Details implements OnInit {
  readonly code = input.required<string>();

  private readonly linkService = inject(LinkService);

  protected readonly stats = signal<LinkStatsResponseDto | null>(null);

  protected readonly errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.linkService.stats(this.code()).subscribe({
      next: (stats) => this.stats.set(stats),
      error: () => this.errorMessage.set('Link não encontrado'),
    });
  }
}
