import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserListComponent } from "./components/user-list/user-list.component";
import { UserAddComponent } from "./components/user-add/user-add.component";
import { UserEditComponent } from "./components/user-edit/user-edit.component";
const routes: Routes = [
  { path: "list", component: UserListComponent },
  { path: "add", component: UserAddComponent },
  { path: "edit/:id", component: UserEditComponent },
  { path: "", redirectTo: "list", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
