import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { LibraryService } from './library.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Books } from './Books';
import { HttpHeaders } from '@angular/common/http';

@Component({
  templateUrl: "./update.component.html"
})
export class UpdateBookComponent implements OnInit{
  title: string = "Update Book";
  bookId: number;
  errorMsg: string;
  bookname = new FormControl('');
  book: Books;
  response: string;
  success: boolean = false;
  show: boolean = true;

  constructor(private libraryService: LibraryService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.bookId = +this.route.snapshot.paramMap.get("bookid");
    console.log(this.route.snapshot.paramMap.keys);
  }

  updateBook(): void {
    
    const book: Books = {
      "bookId": this.bookId,
      "bookName": this.bookname.value,
      "libraryId": 0
    };
   console.log("printing this "+this.libraryService.updateBooks(book).subscribe({
     next: response => {
       console.log("this.response body " + response.message);
       if (response.message=='success') {
         this.success = true;
         this.show = false;
       }
       
      },
      error: err => this.errorMsg = err
    }));
  }

}
