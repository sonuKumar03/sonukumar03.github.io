# Sonu Kumar — portfolio

Personal portfolio built with Angular 17, TypeScript, and SCSS. Content is drawn from the July 2026 résumé and public GitHub profile.

## Develop

```sh
npm ci
npm start
```

## Build

```sh
npm run build
```

The production site is generated directly in `docs/`, ready for a GitHub Pages configuration that serves that folder. Building updates the committed site artifacts; it does not publish them.

## Update content

- `src/app/app.component.html`: portfolio copy, project links, and experience.
- `src/app/app.component.scss`: page layout and responsive styles.
- `src/styles.scss`: theme and typography.
- `src/assets/sonu-kumar-resume.pdf`: downloadable résumé.
- `src/index.html`: metadata and page title.

The current layout uses a profile column and a project index, with no placeholder project visuals. Project descriptions follow the project READMEs; impact figures are reported resume claims. The page omits conflicting education dates; the downloadable PDF is the original supplied document.
