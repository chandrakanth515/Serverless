import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TestComponent} from './components/test/test.component';
import { SummaryComponent} from './components/summary/summary.component';

import { AppService } from './services/app.service';

import { AppRoutingModule } from './app.routes';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        AppRoutingModule,
        FormsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        TestComponent,
        SummaryComponent
    ],
    providers: [
        AppService
    ],
    bootstrap: [
        AppComponent
    ],
})
export class AppModule { }
