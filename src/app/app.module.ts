import { ChartsModule } from 'ng2-charts';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule,
  MatCheckboxModule,
  MatGridListModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatNativeDateModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashComponent } from './dash/dash.component';
import { ChartDbVerComponent } from './chart-db-ver/chart-db-ver.component';
import { InitChartComponent } from './init-chart/init-chart.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  {path: '1', component: DashComponent},
  {path: '2', component: InitChartComponent},
  {path: '3', component: ChartDbVerComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DashComponent,
    ChartDbVerComponent,
    InitChartComponent,
  ],

  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatNativeDateModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ChartDbVerComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngChartJS() {
    const el = createCustomElement(ChartDbVerComponent, {injector: this.injector});
    customElements.define('chartDbVer', el);
  }
}
export class PizzaPartyAppModule { }
