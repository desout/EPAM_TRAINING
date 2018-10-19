import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {EditorFormComponent} from './editor-form/editor-form.component';
import {AgeDirective} from './validators/age.directive';
import {DateDirective} from './validators/date.directive';
import {UserNameDirective} from './validators/user-name.directive';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    EditorFormComponent,
    AgeDirective,
    DateDirective,
    UserNameDirective
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
