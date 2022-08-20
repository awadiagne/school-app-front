import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, catchError, of } from 'rxjs';
import { Classe } from '../interfaces/Classe';
import { Eleve } from '../interfaces/Eleve';

@Injectable({
  providedIn: 'root'
})
export class EleveService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(
    private http : HttpClient
    ) {}

  getEleve(id : any) : Observable<any> {  
    return this.http.get<Eleve>(`http://localhost:4002/students/${id}`);
  }

  getEleves() : Observable<Eleve[]>{
    return this.http.get<Eleve[]>('http://localhost:4002/students')
      .pipe(
        tap(_ => console.log('Eleves retrieved')),
        catchError(this.handleError<Eleve[]>('getEleves'))
      );
  }

  createEleve(eleve : Eleve) : Observable<Eleve>{
    return this.http.post<Eleve>('http://localhost:4002/students', eleve, this.httpOptions).pipe(
      tap((eleve: Eleve) => console.log(`Added eleve with id=${eleve._id}`)),
      catchError(this.handleError<Eleve>('createEleve'))
    );
  }

  updateEleve(eleve : Eleve) : Observable<any>{
    return this.http.put(`http://localhost:4002/students/${eleve._id}`, eleve, this.httpOptions).pipe(
      tap(_ => console.log(`Updated Eleve id=${eleve._id}`)),
      catchError(this.handleError<any>('updateEleve'))
    );
  }

  deleteEleve(id : any) : Observable<Eleve>{
    return this.http.delete<Eleve>(`http://localhost:4002/students/${id}`, this.httpOptions)
    .pipe(
      tap(_ => console.log(`Deleted Eleve with id=${id}`)),
      catchError(this.handleError<Eleve>('deleteEleve'))
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
