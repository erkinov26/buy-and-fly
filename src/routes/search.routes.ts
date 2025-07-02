import { Routes } from '@angular/router';
import { PATHS, withChildNavigation } from '../core/navigation/navigation';

export const searchRoutes: Routes = [
  {
    path: PATHS.searchAvia,
    title: `:Search Page:Search for cheap flights`,
    loadComponent: () =>
      import('../app/components/pages/search-avia/search-avia').then(
        (m) => m.SearchAvia,
      ),
  },
].map(withChildNavigation(PATHS.search));
