import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Eleve } from 'src/app/interfaces/Eleve';
import { ClasseService } from 'src/app/services/classe.service';
import { EleveService } from 'src/app/services/eleve.service';
import { ConfirmDialogModel, ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.scss']
})
export class EleveComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  displayedColumns= ['nom', 'classe', 'edit', 'delete', 'details'];
  add : boolean;
  eleves : MatTableDataSource<Eleve>;
  result: string = '';
  classesList;

  formEleve = new FormGroup({
    name : new FormControl(''),
    classe : new FormControl('')
  })

  constructor(private eleveService : EleveService, private classeService : ClasseService, private router : Router, private snackBar: MatSnackBar, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.eleveService.getEleves().subscribe(result => {
      console.log(result);
      this.eleves = new MatTableDataSource(result);
    });
    this.getClasses();
  }

  /*ngAfterViewInit() {
    this.classes.paginator = this.paginator;
    this.classes.sort = this.sort;
  }*/

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.eleves.filter = filterValue.trim().toLowerCase();

    if (this.eleves.paginator) {
      this.eleves.paginator.firstPage();
    }
  }

  createEleve() {

    const data = this.formEleve.value;
    console.log(data);
    this.eleveService.createEleve({name : data.name, classe : data.classe}).subscribe(result => {
      console.log(result);
      this.snackBar.openFromComponent(NotificationComponent, {
        duration: 3000, data : 'Elève créé!'
      });
      setTimeout(() => {
        this.router.navigate(['/eleves']);
      }, 3000);
    })
  }

  deleteClass(id : string) {
    this.eleveService.deleteEleve(id).subscribe(result => {
      console.log(result);
      this.snackBar.openFromComponent(NotificationComponent, {
        duration: 3000, data : 'Elève supprimé!'
      });
      setTimeout(() => {
        this.router.navigate(['/eleves']);
      }, 3000);
    })
  }

  confirmDialog(id): void {
    const message = `Etes-vous sûr de vouloir supprimer cet élève?`;

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
  }

  getClasses() {
    this.classeService.getClasses().subscribe(result => {
      console.log(result);
      this.classesList = result;
    })
  }

}
