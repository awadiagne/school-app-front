import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Classe } from 'src/app/interfaces/Classe';
import { ClasseService } from 'src/app/services/classe.service';
import { NotificationComponent } from 'src/app/shared/notification/notification.component';

@Component({
  selector: 'app-classe-details',
  templateUrl: './classe-details.component.html',
  styleUrls: ['./classe-details.component.scss']
})
export class ClasseDetailsComponent implements OnInit {

  id;
  classe;
  name;
  size;
  formClasse = new FormGroup({
    name : new FormControl(''),
    size : new FormControl('')
  });

  constructor(private classeService : ClasseService, private snackBar: MatSnackBar, private route : ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.id = routeParams.get('id');
    console.log('Id class : ' + this.id);

    this.classeService.getClass(this.id).subscribe((result : Classe) => {
        console.log(result);
        if(result.hasOwnProperty('error')){
          console.log('Classe inexistante');
        } else {
          this.classe = result;
          this.name = this.classe.name;
          this.size = this.classe.size;
        }
    });
  }

  editClasse(){
    console.log('Size : ' + this.size);
    this.classeService.updateClass({_id : this.id, size : this.size, name : this.name}).subscribe((result : Classe) => {
      console.log(result);
      if(result.hasOwnProperty('error')){
        console.log('Classe inexistante');
      } else {
        this.classe = result;
        this.name = this.classe.name;
        this.size = this.classe.size;
        this.snackBar.openFromComponent(NotificationComponent, {
          duration: 3000, data : 'Classe modifiée'
        });
        setTimeout(() => {
          this.router.navigate(['/classes']);
        }, 3000);
      }
    });
  }
}
