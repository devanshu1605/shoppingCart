import { Component } from '@angular/core';
import { LibraryService } from './library.service';
import { FormControl } from '@angular/forms';
import { Books } from './Books';
import { Library } from './Library';

@Component({
  templateUrl:"./addbook.component.html"
})
export class AddBookComponent {
  title: string = "Add Book";
  success: boolean = false;
  show: boolean = true;
  errorMsg: string;
  bookname = new FormControl('');
  libname = new FormControl('');
  libraries: Library[];
  constructor(private libraryService: LibraryService) {
    console.log(" Book List Component called");
  }

  ngOnInit() {
    this.libraryService.getLibraries().subscribe(data => this.libraries=data);
  }


  addBook(): void {
    const book: Books = {
      "bookId": 0,
      "bookName": this.bookname.value,
      "libraryId": this.libname.value
    };
    console.log("printing this " + this.libraryService.addBooks(book).subscribe({
      next: response => {
        console.log("this.response body " + response.message);
        if (response.message == 'success') {
          this.success = true;
          this.show = false;
        }

      },
      error: err => this.errorMsg = err
    }));
  }


}
