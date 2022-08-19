import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Classe } from 'src/app/interfaces/Classe';
import { ClasseService } from 'src/app/services/classe.service';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  displayedColumns= ['nom', 'effectif', 'edit', 'delete'];

  classes : MatTableDataSource<Classe>;

  constructor(private classeService : ClasseService) {
   }

  ngOnInit(): void {
    this.classeService.getClasses().subscribe(result => {
      console.log(result);
      this.classes = new MatTableDataSource(result);
    });
  }

  ngAfterViewInit() {
    this.classes.paginator = this.paginator;
    this.classes.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.classes.filter = filterValue.trim().toLowerCase();

    if (this.classes.paginator) {
      this.classes.paginator.firstPage();
    }
  }

/** Builds and returns a new classe. */
  createNewClasse(id: number) {
    /*const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
      ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
      '.';

    return {
      id: id.toString(),
      name: name,
      progress: Math.round(Math.random() * 100).toString(),
      fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
    };*/
    const data = {name : 'nom', size : 3};
    this.classeService.createClass({name : data.name, size : data.size}).subscribe(result => {
      console.log(result);
    })
  }

  deleteClass(id) {
    
  }
}
