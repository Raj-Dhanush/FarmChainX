import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then((m) => m.RegisterComponent),
  },

  {
    path: 'verify/:uuid',
    loadComponent: () =>
      import('./components/verify-product/verify-product').then((m) => m.VerifyProduct),
  },

  // User routes
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.Dashboard),
  },
  {
    path: 'upload',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/upload-product/upload-product').then((m) => m.UploadProduct),
  },
  {
    path: 'scanner',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./components/qr-scanner/qr-scanner/qr-scanner').then((m) => m.QrScanner),
  },
  {
    path: 'products/my',
    canActivate: [AuthGuard],
    loadComponent: () => import('./pages/my-products/my-products').then((m) => m.MyProducts),
  },

  // CONSUMER ROUTES (correct exported class names)
  {
    path: 'consumer',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/consumer/consumer-layout/consumer-layout.component').then(
        (m) => m.ConsumerLayoutComponent
      ),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/consumer/consumer-dashboard/consumer-dashboard.component').then(
            (m) => m.ConsumerDashboardComponent
          ),
      },
      {
        path: 'verify',
        loadComponent: () =>
          import('./pages/consumer/consumer-verify/consumer-verify.component').then(
            (m) => m.ConsumerVerifyComponent
          ),
      },
      {
        path: 'history',
        loadComponent: () =>
          import('./pages/consumer/consumer-history/consumer-history.component').then(
            (m) => m.ConsumerHistoryComponent
          ),
      },
      {
        path: 'notifications',
        loadComponent: () =>
          import('./pages/consumer/consumer-notifications/consumer-notifications.component').then(
            (m) => m.ConsumerNotificationsComponent
          ),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  // Admin routes (unchanged)
  {
    path: 'admin',
    canActivate: [AuthGuard, AdminGuard],
    loadComponent: () =>
      import('./pages/admin/admin-layout/admin-layout').then((m) => m.AdminLayout),
    children: [
      {
        path: 'overview',
        loadComponent: () =>
          import('./pages/admin/admin-overview/admin-overview').then((m) => m.AdminOverview),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./pages/admin/admin-users/admin-users').then((m) => m.AdminUsers),
      },
      {
        path: 'promotion-requests',
        loadComponent: () =>
          import('./pages/admin/admin-promotion-requests/admin-promotion-requests').then(
            (m) => m.AdminPromotionRequests
          ),
      },
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: '' },
];
