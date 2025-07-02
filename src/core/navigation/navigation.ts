import { Route } from '@angular/router';

// --- Static PATHS
export const PATHS = {
  home: '',
  homeAvia: '',
  homeHotels: 'hotels',
  homeTours: 'tours',
  homeRailways: 'railways',

  rules: 'rules',
  terms: 'terms',
  documents: 'documents',
  faq: 'faq',
  cards: 'cards',
  login: 'login',
  registration: 'registration',

  notFound: 'not-found',
  serverError: 'server-error',
  permissionDenied: 'permission-denied',

  search: 'search',
  searchAvia: 'search/avia',
  searchHotel: 'search/hotels',
  searchTour: 'search/tours',
  searchRailway: 'search/railways',
} as const;

export type PathValues = (typeof PATHS)[keyof typeof PATHS];

// --- Extract Params from path
type Filter<T extends string> = T extends `:${infer Param}` ? Param : never;

type Split<Value extends string> =
  Value extends `${infer L}/${infer R}`
    ? Filter<L> | Split<R>
    : Filter<Value>;

export type GetPathParams<T extends string> = Record<Split<T>, string | number>;

// --- Navigation Link Interface
export interface NavigationLink<T extends PathValues = PathValues> {
  readonly label: string;
  readonly route: T;
  readonly params?: GetPathParams<T>;
  readonly suffix?: string;
}

// --- getRoute: converts path + params => [segments]
export function getRoute<T extends PathValues>(
  path: T,
  params: Record<string, string | number> = {},
): (string | number)[] {
  const segments = path.split('/').filter(Boolean);
  const result: (string | number)[] = ['/'];

  for (const segment of segments) {
    if (segment.startsWith(':')) {
      const paramName = segment.slice(1);
      result.push(params[paramName] ?? paramName);
    } else {
      result.push(segment);
    }
  }

  return result;
}

// --- Safely get child path relative to parent
export function getChildPath(path: PathValues, parent: PathValues): string {
  if (path === parent) return ''; // Same path
  if (!path.startsWith(parent)) return path; // Unrelated path
  const remainder = path.slice(parent.length);
  return remainder.startsWith('/') ? remainder.slice(1) : remainder;
}

// --- Extend Angular Route with better typings
export type NavigationChild = Route & {
  redirectTo?: string;
  path: PathValues;
};

// --- Modify route path relative to parent
export function childNavigation(
  route: NavigationChild,
  parent: PathValues,
): Route {
  const redirectTo = route.redirectTo ? `/${route.redirectTo}` : undefined;
  const path = getChildPath(route.path, parent);

  return {
    ...route,
    redirectTo,
    path,
  };
}

// --- Apply child path transform to array of routes
export function withChildNavigation(
  parent: PathValues,
): (route: NavigationChild) => Route {
  return (route) => childNavigation(route, parent);
}
