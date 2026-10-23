import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { LinkResponseDto } from '../../models/link';
import { LinkService } from '../../services/link.service';

@Component({
  imports: [DatePipe],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private readonly linkService = inject(LinkService);
  protected readonly links = signal<LinkResponseDto[]>([]);

  ngOnInit(): void {
    this.linkService.list().subscribe((links) => this.links.set(links));
  }
}
