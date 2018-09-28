import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DatabaseService } from "../../services/database.service";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"],
})
export class UserEditComponent implements OnInit {
  edit: any = {};
  submitLoading: Boolean = false;
  form: FormGroup;
  loading: Boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private db: DatabaseService) {
    this.createForm();
  }

  ngOnInit() {
    const userId = this.route.snapshot.params.id;

    this.db.get(userId).subscribe((res: any) => {
      const userData = res;
      this.form.controls["Email"].setValue(userData.email || "");
      this.form.controls["PhoneNumber"].setValue(userData.phone_number || "");
      this.form.controls["Username"].setValue(userData.username || "");
    });
  }

  createForm() {
    this.form = this.fb.group({
      Email: ["", Validators.compose([Validators.required, this.validateLetters])],
      PhoneNumber: ["", Validators.compose([Validators.required, this.validateLetters])],
      Username: ["", Validators.compose([Validators.required, this.validateLetters])],
    });
  }

  validateLetters(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9_\-.\s]+$/);

    if (regExp.test(controls.value)) {
    } else {
      return { validateLetters: { value: true } };
    }
  }

  goto(val) {
    this.router.navigate([val]);
  }

  cleanForm() {
    this.submitLoading = false;
    this.form.reset();
    this.form.markAsPristine();
    this.form.markAsUntouched();
    this.form.updateValueAndValidity();
  }

  editUser() {
    this.submitLoading = false;

    const userData = {
      email: this.form.controls["Email"].value,
      phone_number: this.form.controls["PhoneNumber"].value,
      username: this.form.controls["Username"].value,
      connection: "Username-Password-Authentication",
    };

    this.db.patch(this.route.snapshot.params.id, userData).subscribe(
      (data: any) => {
        console.log(data);
        this.cleanForm();
        toastr.success("User successfully edited");
        this.router.navigate(["/admin/users/list"]);
      },
      (error: any) => {
        console.log(error);
        this.submitLoading = false;
        toastr.clear();
        if (typeof error.error.message !== `undefined`) {
          toastr.error(error.error.message);
        } else {
          toastr.error(`Something went wrong`);
        }
      }
    );
  }
}
