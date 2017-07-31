import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
// import { HeroFormComponent } from './hero.component';
import { FormComponent } from './test.component';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    // HeroFormComponent,
    FormComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
