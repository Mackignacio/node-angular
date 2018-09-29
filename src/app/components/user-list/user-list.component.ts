import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatTableDataSource, MatSort } from "@angular/material";
import { Router } from "@angular/router";
import { DatabaseService } from "../../services/database.service";
import alertify from "alertifyjs";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"],
})
export class UserListComponent implements OnInit {
  dataSource: any;
  hasLoaded: Boolean = false;
  message = "";
  list: any = 0;
  users: any = [];
  displayedColumns = ["name","type","username","password","Action"];
  selectedFilter: any = {
    type: "",
    value: "",
  };

  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  constructor(private db: DatabaseService, private router: Router) {}

  ngOnInit() {
    this.getUserList();
  }

  changeFilterText(text: string) {
    this.selectedFilter.value = text;
    this.dataSource.filter = text;
  }

  selectFilter({ value }: any) {
    this.dataSource.filterPredicate = (data: any = this.dataSource) => {
      return data[value].toLowerCase().includes(this.selectedFilter.value.toLowerCase());
    };
    this.selectedFilter.type = value;
  }

  goto(val) {
    this.router.navigate([val]);
  }

  getUserList() {
    this.db.get("user").subscribe(
      (res: any) => {
        if (res && res.length) {
          this.setTable(res);
        } else {
          this.setTable([]);
        }
      },
      () => {
        this.setTable([]);
      }
    );
  }

  confirmDelete(obj: any) {}

  blockUser(obj: any) {
    /*  if (obj.blocked) {
      this.authService.toggleBlocked(obj.user_id, false).subscribe(
        res => {
          const updated = keyBy(this.users, "user_id");
          updated[obj.user_id]["blocked"] = false;
          this.setTable(values(updated));
          toastr.success("User was unblocked");
        },
        ex => {
          console.log(ex);
        }
      );
    } else {
      this.authService.toggleBlocked(obj.user_id, true).subscribe(() => {
        const updated = keyBy(this.users, "user_id");
        updated[obj.user_id]["blocked"] = true;
        this.setTable(values(updated));
        toastr.success("User was blocked");
      });
    } */
  }

  setTable(data: Array<Object>) {
    console.clear();
    console.log(data);
    this.list = data.length;
    this.dataSource = new MatTableDataSource(data);
    this.users = data;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.hasLoaded = true;
    }, 1000);
  }
}
