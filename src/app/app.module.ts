import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ShapeFactoryService } from './services/shape-factory.service';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CanvasComponent } from './canvas/canvas.component';
import { DrawService } from './services/draw.service';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BackendCommunicatorService } from './services/backend-communicator.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CanvasComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DrawService,BackendCommunicatorService,ShapeFactoryService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
