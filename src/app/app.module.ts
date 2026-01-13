import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorsComponent } from './authors/authors.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { InserthasoneComponent } from './inserthasone/inserthasone.component';
import { AxiopostComponent } from './axiopost/axiopost.component';
import { PostestComponent } from './postest/postest.component';
import { GetmanyComponent } from './getmany/getmany.component';
import { InsertmanyComponent } from './insertmany/insertmany.component';
import { InsertmtomComponent } from './insertmtom/insertmtom.component';
import { GetmtomComponent } from './getmtom/getmtom.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './interceptor/http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
   AuthorsComponent,
    InserthasoneComponent,
    //AxiopostComponent,
   // PostestComponent,
    GetmanyComponent,
    InsertmanyComponent,
    InsertmtomComponent,
    GetmtomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
   providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
