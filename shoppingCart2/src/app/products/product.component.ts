import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'product-list',
  templateUrl: './product.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pagetitle: string = "Product List";
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  _listFilter: string;
  errorMsg: string;

  constructor(private prodService: ProductService) {
    console.log("contructor called " + this.products.length);
  }

  onRatingClicked(message: string): void {
    this.pagetitle = 'Product List : ' + message;
  }


  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value:string) {
    this._listFilter = value;
    this.filteredProduct = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProduct: IProduct[]=[];

  products: IProduct[] = [];

  toggleImage(): void{
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    console.log("nginit called");
    this.prodService.getProducts().subscribe({
      next: products => {
        products => this.products = products;
        this.filteredProduct = this.products; 
      },
          error:err =>  this.errorMsg = err 
      });
  }

  performFilter(listFilter: string): IProduct[] {
    listFilter = listFilter.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(listFilter) !== -1);
    }
}
