import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Library } from './Library';
import { LibraryService } from './library.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'library',
  templateUrl: './library.component.html'
})
export class LibraryComponent implements OnInit {
  title = 'LibraryUI';
  errorMsg: string;
  booklist: boolean = false;
  libraryId:number;

  constructor(private libraryService: LibraryService) {
    console.log(" Library Component called");
  }

  ngOnInit(): void {
    console.log("nginit  LibraryComponent called");
    this.libraryService.getLibraries().subscribe({
      next: liberaries => {
        this.libraries = liberaries;
      },
      error: err => this.errorMsg = err
    });
  }

  libraries: Library[];

  callBookService(id:number): void {
    this.booklist = true;
    this.libraryId = id;
  }
}
