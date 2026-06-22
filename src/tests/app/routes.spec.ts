import { routes } from '../../app/app.routes';

describe('Application routes', () => {
  it('defines portfolio and game routes with titles', () => {
    const paths = routes.map((route) => route.path);

    expect(paths).toContain('');
    expect(paths).toContain('programmer');
    expect(paths).toContain('artist');
    expect(paths).toContain('games');
    expect(paths).toContain('games/mlpack');
    expect(paths).toContain('games/:id');
    expect(routes.find((route) => route.path === 'games/mlpack')?.title).toBe('ML Pack Studio');
    expect(routes.find((route) => route.path === 'games/:id')?.title).toBe('Play Game');
  });

  it('redirects about and unknown URLs to home', () => {
    expect(routes.find((route) => route.path === 'about')?.redirectTo).toBe('');
    expect(routes.find((route) => route.path === '**')?.redirectTo).toBe('');
  });
});
