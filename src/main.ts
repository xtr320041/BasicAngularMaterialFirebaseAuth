import 'hammerjs';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

// Amplify Configuration
import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';
//It takes awsmobile for AWSConfig
import myConfig from './aws-exports';

Storage.configure(myConfig);
Auth.configure(myConfig);
// End Amplify Configuration

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
