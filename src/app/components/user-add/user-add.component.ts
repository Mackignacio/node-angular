import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { DatabaseService } from "../../services/database.service";
import * as toastr from "toastr";
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
    Name: "",
    Type: "",
    Username: "",
    Password: ""
  };


  userTypes=["User","Admin","Finance"];
  selectedType= "User";

  constructor(private router: Router, private db: DatabaseService) {
    this.createForm();
  }

  ngOnInit(): void {
    //this.getAccountList();
  }

  createForm() {
    this.form = new FormGroup({
      Name: new FormControl(this.data.Name, [Validators.required, this.validateLetters]),
      Type: new FormControl(this.data.Type, [Validators.required, this.validatePassword]),
      Username: new FormControl(this.data.Username, [Validators.required]),
      Password: new FormControl(this.data.Password, [Validators.required]),
    });
  }

  get Name() {
    return this.form.get("Name");
  }

  get Type() {
    return this.form.get("Type");
  }

  get Username() {
    return this.form.get("Username");
  }

  get Password() {
    return this.form.get("Password");
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
      name: this.form.controls["Name"].value,
      type: this.selectedType,
      username: this.form.controls["Username"].value,
      password: this.form.controls["Password"].value,
    };


    console.log(userData);
    this.db.post("user", userData).subscribe(  
      (data: any) => {
        console.log(userData);
        this.cleanForm();
        toastr.success("User Created");
        this.router.navigate(["/list"]);
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
}
