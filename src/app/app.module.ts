import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
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
import { InitChartComponent } from './init-chart/init-chart.component';
import { HttpClientModule } from '@angular/common/http';
import { ChartComponent } from './chart/chart.component';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { MyPieChartComponent } from './my-pie-chart/my-pie-chart.component';

const appRoutes: Routes = [
  {path: '1', component: DashComponent},
  {path: '2', component: InitChartComponent},
  {path: '3', component: ChartComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DashComponent,
    InitChartComponent,
    ChartComponent,
    MyPieChartComponent
  ],

  imports: [
    ChartsModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
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
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule {
  constructor(private injector: Injector) {}
}
