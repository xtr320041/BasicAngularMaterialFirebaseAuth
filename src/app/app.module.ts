import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { HomeComponent } from './mainPages/home/home.component';
import { MessageBoxComponent } from './commonUI/message-box/message-box.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { LoadingComponent } from './commonUI/loading/loading.component';
import { AuthComponent } from './auth/auth.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { CountryCodeSelectComponent } from './auth/country-code-select/country-code-select.component';
import { FilterPipe } from './auth/country-code-select/filter.pipe';
import { ConfirmCodeComponent } from './auth/confirm-code/confirm-code.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { AvatarComponent } from './auth/profile/avatar/avatar.component';

//import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatDialog, MAT_DATE_LOCALE} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MessageBoxComponent,
    LoadingComponent,
    AuthComponent,
    SignInComponent,
    SignUpComponent,
    CountryCodeSelectComponent,
    FilterPipe,
    ConfirmCodeComponent,
    ProfileComponent,
    AvatarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    MaterialModule,

    FormsModule, //for reactive forms
    ReactiveFormsModule //for reactive forms
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MessageBoxComponent, LoadingComponent, CountryCodeSelectComponent]
})
export class AppModule { }
