import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { form, FormField, pattern, required } from '@angular/forms/signals';
import { CreateLinkRequestDto, LinkResponseDto } from '../../models/link';
import { LinkService } from '../../services/link.service';

@Component({
  imports: [DatePipe, FormField],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private readonly linkService = inject(LinkService);
  protected readonly links = signal<LinkResponseDto[]>([]);

  protected readonly linkModel = signal<CreateLinkRequestDto>({ originalUrl: '' });

  protected readonly linkForm = form(this.linkModel, (link) => {
    required(link.originalUrl, { message: 'Informe uma URL.' });
    pattern(link.originalUrl, /^https?:\/\/\S+\.\S+$/, {
      message: 'A URL precisa começar com http:// ou https://',
    });
  });

  ngOnInit(): void {
    this.linkService.list().subscribe((links) => this.links.set(links));
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();

    if (this.linkForm().invalid()) {
      this.linkForm().markAsTouched();
      return;
    }

    this.linkService.create(this.linkModel()).subscribe((created) => {
      this.links.update((links) => [created, ...links]);
      this.linkForm().reset({ originalUrl: '' });
    });
  }

  protected onDelete(id: number): void {
    if (!confirm('Tem certeza que deseja excluir este link?')) {
      return;
    }

    this.linkService.delete(id).subscribe(() => {
      this.links.update((links) => links.filter((link) => link.id !== id));
    });
  }
}
