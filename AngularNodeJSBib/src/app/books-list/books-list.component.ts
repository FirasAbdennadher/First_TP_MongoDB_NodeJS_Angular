import { Component, OnInit } from '@angular/core';
import {ServicesService} from '../services/services.service';
import {BookPage} from '../model/book.model';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
 keyword: string="";
 pageSize:number=5;
 currentPage:number=1;
 books:BookPage;
 pages:Array<number>;

  constructor(private bibService:ServicesService) { }

  ngOnInit(): void {
    this.onSearchBooks();
  }

  onSearchBooks(){
    this.bibService.searchBooks(this.keyword,this.currentPage,this.pageSize)
      .subscribe(data=>{
        this.books=data;
        this.pages=new Array<number>(data.pages);
      },err=>{
        console.log(err);
      })
  }

  onPageBooks(i:number) {
    this.currentPage=i+1;
    this.onSearchBooks();
  }

  onSearch(data) {
    console.log (data);
    this.keyword=data.keyword;
    this.onSearchBooks();
  }


}
