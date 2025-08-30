import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app';
import { ThankYouComponent } from './app/thank-you';
import { AppShellComponent } from './app/app-shell';
import { appProviders } from './app/app.config';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'thanks', component: ThankYouComponent },
];
bootstrapApplication(AppShellComponent, {
  providers: [
    appProviders,
    provideRouter(routes),
  ],
}).catch(err => console.error(err));