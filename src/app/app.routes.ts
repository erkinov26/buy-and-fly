import { Routes } from '@angular/router';
import { PATHS } from '../core/navigation';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/ui/layout/layout').then((m) => m.Layout),
    children: [
      {
        path: PATHS.search,
        loadChildren: () =>
          import('../routes/search.routes').then((m) => m.searchRoutes),
      },
    ],
  },
];
