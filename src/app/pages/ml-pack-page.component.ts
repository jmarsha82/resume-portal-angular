import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ml-pack-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="page-heading ml-pack-heading">
      <a class="button ghost compact" routerLink="/games">Back to Games</a>
      <h1>ML Pack</h1>
      <p>Interactive machine-learning experiments powered by the original mlpack Studio interface.</p>
    </section>
    <section class="ml-pack-stage panel" aria-label="ML Pack application">
      <iframe
        src="/mlpack-studio/index.html"
        title="mlpack Studio machine-learning workbench"
        sandbox="allow-downloads allow-forms allow-modals allow-same-origin allow-scripts"
        referrerpolicy="no-referrer"
      ></iframe>
    </section>
  `
})
export class MlPackPageComponent {}
