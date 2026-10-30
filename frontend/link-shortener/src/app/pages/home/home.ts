import { DatePipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { form, FormField, pattern, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { CreateLinkRequestDto, LinkResponseDto } from '../../models/link';
import { LinkService } from '../../services/link.service';

@Component({
  imports: [DatePipe, FormField, RouterLink],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private readonly linkService = inject(LinkService);
  private readonly shortUrlBase = 'http://localhost:8080';

  protected readonly links = signal<LinkResponseDto[] | null>(null);

  protected readonly linkModel = signal<CreateLinkRequestDto>({ originalUrl: '' });

  protected readonly errorMessage = signal<string | null>(null);

  protected readonly createErrorMessage = signal<string | null>(null);

  protected readonly linkForm = form(this.linkModel, (link) => {
    required(link.originalUrl, { message: 'Informe uma URL.' });
    pattern(link.originalUrl, /^https?:\/\/\S+\.\S+$/, {
      message: 'A URL precisa começar com http:// ou https://',
    });
  });

  ngOnInit(): void {
    this.linkService.list().subscribe({
      next: (links) => this.links.set(links),
      error: () =>
        this.errorMessage.set('Não foi possível carregar os links. Tente novamente mais tarde.'),
    });
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();

    this.createErrorMessage.set(null);

    if (this.linkForm().invalid()) {
      this.linkForm().markAsTouched();
      return;
    }

    this.linkService.create(this.linkModel()).subscribe({
      next: (created) => {
        this.links.update((links) => [created, ...(links ?? [])]);
        this.linkForm().reset({ originalUrl: '' });
      },
      error: () =>
        this.createErrorMessage.set(
          'Não foi possível encurtar o link. Tente novamente mais tarde.',
        ),
    });
  }

  protected onDelete(id: number): void {
    if (!confirm('Tem certeza que deseja excluir este link?')) {
      return;
    }

    this.linkService.delete(id).subscribe(() => {
      this.links.update((links) => (links ?? []).filter((link) => link.id !== id));
    });
  }

  protected onCopy(code: string): void {
    navigator.clipboard.writeText(`${this.shortUrlBase}/${code}`);
  }
}
