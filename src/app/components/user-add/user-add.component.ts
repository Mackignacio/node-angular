import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { DatabaseService } from "../../services/database.service";

@Component({
  selector: "app-user-add",
  templateUrl: "./user-add.component.html",
  styleUrls: ["./user-add.component.scss"],
})
export class UserAddComponent implements OnInit {
  submitLoading: Boolean = false;
  form: FormGroup;
  loading: Boolean = false;
  data = {
    Password: "",
    Email: "",
    PhoneNumber: "",
    Username: "",
  };
  accountList: any;
  selectedAccountId: any;

  constructor(private router: Router, private db: DatabaseService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.getAccountList();
  }

  createForm() {
    this.form = new FormGroup({
      Email: new FormControl(this.data.Email, [Validators.required, this.validateLetters]),
      Password: new FormControl(this.data.Password, [Validators.required, this.validatePassword]),
      PhoneNumber: new FormControl(this.data.PhoneNumber, [Validators.required]),
      Username: new FormControl(this.data.Username, [Validators.required]),
    });
  }

  get Email() {
    return this.form.get("Email");
  }

  get Password() {
    return this.form.get("Password");
  }

  get PhoneNumber() {
    return this.form.get("PhoneNumber");
  }

  get Username() {
    return this.form.get("Username");
  }

  validateLetters(controls) {
    const regExp = new RegExp(/^[a-zA-Z0-9_\-.\s]+$/);

    if (!regExp.test(controls.value)) {
      return { validateLetters: { value: true } };
    }
  }

  validatePassword(controls) {
    const regExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,100})/);

    if (!regExp.test(controls.value)) {
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

  addUser() {
    this.submitLoading = true;

    const userData = {
      email: this.form.controls["Email"].value,
      password: this.form.controls["Password"].value,
      phoneNumber: this.form.controls["PhoneNumber"].value,
      username: this.form.controls["Username"].value,
      accountId: this.selectedAccountId,
      connection: "Username-Password-Authentication",
    };

    this.db.post("", userData).subscribe(
      (data: any) => {
        this.cleanForm();
        toastr.success("User Created");
        this.router.navigate(["/admin/users/list"]);
      },
      (error: any) => {
        this.submitLoading = false;
        toastr.clear();
        console.log(error);
        if (typeof error.error.message !== `undefined`) {
          toastr.error(error.error.message);
        } else {
          toastr.error(`Something went wrong`);
        }
      }
    );
  }

  getAccountList() {
    this.db.get(`accounts`).subscribe((res: any) => {
      this.accountList = res.data;
    });
  }
}
