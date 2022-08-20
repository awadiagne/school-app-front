import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Classe } from 'src/app/interfaces/Classe';
import { Eleve } from 'src/app/interfaces/Eleve';
import { ClasseService } from 'src/app/services/classe.service';
import { EleveService } from 'src/app/services/eleve.service';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';

@Component({
  selector: 'app-eleve-details',
  templateUrl: './eleve-details.component.html',
  styleUrls: ['./eleve-details.component.scss']
})
export class EleveDetailsComponent implements OnInit {

  id;
  eleve;
  name;
  classe;
  classesList;

  formEleve = new FormGroup({
    name : new FormControl(''),
    classe : new FormControl('')
  });

  constructor(private classeService : ClasseService, private eleveService : EleveService, private snackBar: MatSnackBar, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = routeParams.get('id');

    this.eleveService.getEleve(this.id).subscribe((result : Eleve) => {
        console.log(result);
        if(result.hasOwnProperty('error')){
          console.log('Elève inexistant');
        } else {
          this.eleve = result;
          this.name = this.eleve.name;
          this.classe = this.eleve.classe;
        }
    });
    this.classeService.getClasses().subscribe(result => {
      this.classesList = result;
    })
  }

  editEleve(){
    console.log(this.classe);
    this.eleveService.updateEleve({_id : this.id, classe : this.classe, name : this.name}).subscribe((result : Classe) => {
      console.log(result);
      if(result.hasOwnProperty('error')){
        console.log('Elève inexistant!');
      } else {
        this.eleve = result;
        this.name = this.eleve.name;
        this.classe = this.eleve.classe;
        this.snackBar.openFromComponent(NotificationComponent, {
          duration: 3000, data : 'Infos élève modifiée!'
        });
        setTimeout(() => {
          this.router.navigate(['/eleves']);
        }, 3000);
      }
    });
  }
}
