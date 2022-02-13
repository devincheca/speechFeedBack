import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { FeedbackInitFormComponent } from './feedback-init-form/feedback-init-form.component';
import { VoteInitFormComponent } from './vote-init-form/vote-init-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FeedbackInitFormComponent,
    VoteInitFormComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
