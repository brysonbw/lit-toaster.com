import type {
  ActionResult,
  Route,
  RouteContext,
  Commands,
} from '@vaadin/router';
import { APP_TITLE } from './utils/constants';

export const routes: Route[] = [
  {
    path: '/',
    async action(
      this: Route,
      _context: RouteContext,
      commands: Commands
    ): Promise<ActionResult> {
      await import('./views/home-view');
      document.title = `${APP_TITLE} | Notifications for Lit Web Components`;
      return commands.component('home-view');
    },
  },
  {
    path: '(.*)',
    async action(
      this: Route,
      _context: RouteContext,
      commands: Commands
    ): Promise<ActionResult> {
      await import('./views/not-found-view');
      document.title = `${APP_TITLE} | Page Not Found`;
      return commands.component('not-found-view');
    },
  },
];
