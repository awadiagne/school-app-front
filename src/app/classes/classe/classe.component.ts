import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Classe } from 'src/app/interfaces/Classe';
import { ClasseService } from 'src/app/services/classe.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  displayedColumns= ['nom', 'effectif', 'edit', 'delete', 'details'];
  add : boolean;
  classes : MatTableDataSource<Classe>;
  result: string = '';

  formClasse = new FormGroup({
    name : new FormControl(''),
    size : new FormControl('')
  })

  constructor(private classeService : ClasseService, private router : Router, private snackBar: MatSnackBar, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.classeService.getClasses().subscribe(result => {
      console.log(result);
      this.classes = new MatTableDataSource(result);
    });
  }

  /*ngAfterViewInit() {
    this.classes.paginator = this.paginator;
    this.classes.sort = this.sort;
  }*/

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.classes.filter = filterValue.trim().toLowerCase();

    if (this.classes.paginator) {
      this.classes.paginator.firstPage();
    }
  }

  createClasse() {

    const data = this.formClasse.value;
    console.log(data);
    this.classeService.createClass({name : data.name, size : data.size}).subscribe(result => {
      console.log(result);
      this.snackBar.openFromComponent(NotificationComponent, {
        duration: 3000, data : 'Classe cr????e!'
      });
      setTimeout(() => {
        this.router.navigate(['/classes']);
      }, 3000);
    })
  }

  deleteClass(id : string) {
    this.classeService.deleteClass(id).subscribe(result => {
      console.log(result);
      this.snackBar.openFromComponent(NotificationComponent, {
        duration: 3000, data : 'Classe supprim??e!'
      });
      setTimeout(() => {
        this.router.navigate(['/classes']);
      }, 3000);
    })
  }

  confirmDialog(id): void {
    const message = `Etes-vous s??r de vouloir supprimer cette classe? Les ??l??ves seront aussi supprim??s`;

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      this.result = dialogResult;
      console.log(dialogResult);
      if(dialogResult){
        this.deleteClass(id);
      }
    });
  }

  openDialog() {
    this.add = true;
    /*const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        size: this.size,
        name: this.name
    };
    
    const dialogRef = this.dialog.open(DialogClasseComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        (data) => console.log("Dialog output:", data)
    ); */
  }
}
