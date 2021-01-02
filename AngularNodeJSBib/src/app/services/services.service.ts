import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Book, BookPage} from '../model/book.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  public host:string="http://localhost:7777";

  constructor(private http: HttpClient) { }

  public searchBooks(keyword:string,page:number,size:number):Observable<BookPage>{
return this.http.get<BookPage>(this.host+"/books-search?kw="+keyword+"&page="+page+"&size="+size)


  }

  public saveBooks(book:Book):Observable<Book>{
    return this.http.post<Book>(this.host+"/books",book);
  }

}
