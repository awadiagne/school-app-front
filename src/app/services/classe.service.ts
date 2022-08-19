import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, catchError, of } from 'rxjs';
import { Classe } from '../interfaces/Classe';

@Injectable({
  providedIn: 'root'
})
export class ClasseService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(
    private http : HttpClient, private router: Router
    ) {}

  getClass(id : any) : Observable<any> {
    /*this.http.get<Classe>(`http://localhost:4002/classes/${id}`)
      .pipe(
        tap((oneClass: Classe) => {
          console.log('Class retrieved : ' + { oneClass : oneClass });
          return oneClass;
        }
        ),
        catchError(this.handleError<Classe>('getClass'))
      );*/
    
    return this.http.get<Classe>(`http://localhost:4002/classes/${id}`);
      
      /*this.http.get(`http://localhost:4002/classes/${id}`).subscribe((result : Classe) => {
        console.log(result);
        if(result.hasOwnProperty('error')){
          this._snackBar.openFromComponent(NotificationComponent, {
            duration:SNACK_BAR_DURATION, data : 'Erreur lors de la création'
          });
        } else {
          this._snackBar.openFromComponent(NotificationComponent, {
            duration: SNACK_BAR_DURATION, data : 'Class retrieved!'
          });
          return result;
          setTimeout(() => {
            this.router.navigate([`details/${result._id}`]);
          }, 3000);
        }
    })*/
  }

  getClasses() : Observable<Classe[]>{
    return this.http.get<Classe[]>('http://localhost:4002/classes')
      .pipe(
        tap(_ => console.log('Classes retrieved')),
        catchError(this.handleError<Classe[]>('getClasses'))
      );
  }

  createClass(oneClass : Classe) : Observable<Classe>{
    return this.http.post<Classe>('http://localhost:4002/classes', oneClass, this.httpOptions).pipe(
      tap((newClass: Classe) => console.log(`Added class with id=${newClass._id}`)),
      catchError(this.handleError<Classe>('createClass'))
    );
  }

  updateClass(oneClass : Classe) : Observable<any>{
    return this.http.put(`http://localhost:4002/classes/${oneClass._id}`, oneClass, this.httpOptions).pipe(
      tap(_ => console.log(`Updated Class id=${oneClass._id}`)),
      catchError(this.handleError<any>('updateClass'))
    );
  }

  deleteClass(id : any) : Observable<Classe>{
    return this.http.delete<Classe>(`http://localhost:4002/classes/${id}`, this.httpOptions)
    .pipe(
      tap(_ => console.log(`Deleted Class with id=${id}`)),
      catchError(this.handleError<Classe>('deleteClass'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
