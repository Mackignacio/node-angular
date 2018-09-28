import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
// Forms
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserAddComponent } from "./components/user-add/user-add.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
import { DatabaseService } from "./services/database.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
@NgModule({
  declarations: [AppComponent, UserListComponent, UserAddComponent, UserEditComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, MaterialModule, FormsModule, ReactiveFormsModule, MatFormFieldModule],
  providers: [DatabaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
