import { Component } from '@angular/core';

import { currentSkills, devBooks, devLinks, education, experiences } from '../data/profile.data';

@Component({
  selector: 'app-programmer-page',
  standalone: true,
  template: `
    <section class="page-heading">
      <h1>Programmer</h1>
      <p>Current Role : Programmer at Boeing</p>
      <div class="contact-strip">
        <a href="tel:16189781469">(618)-978-1469</a>
        <a href="mailto:jmarsha82@yahoo.com">jmarsha82&#64;yahoo.com</a>
        <span>Last updated : 2025-09-19</span>
      </div>
    </section>

    <section class="content-section">
      <h2>Github Contributions</h2>
      <div class="panel github-panel">
        <img src="https://ghchart.rshah.org/1976d2/jmarsha82" alt="Github contribution chart for jmarsha82">
      </div>
    </section>

    <section class="content-section">
      <h2>Current Project(s) Tech Stack</h2>
      <div class="stack-list">
        @for (skill of skills; track skill.name) {
          <article class="panel skill-row">
            <a class="button compact" [href]="skill.url" target="_blank" rel="noopener noreferrer">{{ skill.name }}</a>
            <div>
              <strong>{{ skill.cadence }}</strong>
              <p>{{ skill.description }}</p>
            </div>
          </article>
        }
      </div>
    </section>

    <section class="content-section">
      <h2>Experience</h2>
      @for (job of jobs; track job.company + job.role) {
        <article class="panel timeline-card">
          <div class="timeline-heading">
            <h3>{{ job.company }}</h3>
            <p>{{ job.role }} · {{ job.period }} · {{ job.location }}</p>
          </div>
          <ul>
            @for (bullet of job.bullets; track bullet) {
              <li>{{ bullet }}</li>
            }
          </ul>
        </article>
      }
    </section>

    <section class="content-section">
      <h2>Education</h2>
      <div class="card-grid">
        @for (item of schools; track item.degree) {
          <a class="panel media-card text-card" [href]="item.url" target="_blank" rel="noopener noreferrer">
            <h3>{{ item.degree }}</h3>
            <p>{{ item.school }}</p>
            <span>{{ item.location }}</span>
          </a>
        }
      </div>
    </section>

    <section class="content-section">
      <h2>Dev Books</h2>
      <div class="card-grid">
        @for (book of books; track book.title) {
          <article class="panel media-card">
            <img [src]="book.image" [alt]="book.title">
            <h3>{{ book.title }}</h3>
            @for (detail of book.details; track detail) {
              <p>{{ detail }}</p>
            }
          </article>
        }
      </div>
    </section>

    <section class="content-section">
      <h2>Dev Links</h2>
      <div class="card-grid">
        @for (link of links; track link.title) {
          <a class="panel media-card link-card" [href]="link.url" target="_blank" rel="noopener noreferrer">
            <img [src]="link.image" [alt]="link.title">
            <h3>{{ link.title }}</h3>
            <p>{{ link.details[0] }}</p>
          </a>
        }
      </div>
    </section>
  `
})
export class ProgrammerPageComponent {
  readonly skills = currentSkills;
  readonly jobs = experiences;
  readonly schools = education;
  readonly books = devBooks;
  readonly links = devLinks;
}
