import { Component } from '@angular/core';

import { artwork } from '../data/artwork.data';

@Component({
  selector: 'app-artist-page',
  standalone: true,
  template: `
    <section class="page-heading">
      <h1>Artist</h1>
      <p>Original artwork gallery preserved from the existing artist profile.</p>
    </section>
    <section class="art-gallery" aria-label="Artwork gallery">
      @for (piece of pieces; track piece.image) {
        <article class="panel artwork-card">
          <img [src]="piece.image" [alt]="piece.title" loading="lazy">
          <div>
            <h2>{{ piece.title }}</h2>
            @for (detail of piece.details; track detail) {
              <p>{{ detail }}</p>
            }
          </div>
        </article>
      }
    </section>
  `
})
export class ArtistPageComponent {
  readonly pieces = artwork;
}
