import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        RouterModule,
        MenuModule,
        CardModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}