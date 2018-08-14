import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products: any = [];

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    let observable = this._httpService.getProductsFromServer();
    observable.subscribe(data => {
      this.products = data;
    })
  }

  deleteProduct(id) {
    let observable = this._httpService.deleteProductInServer(id);
    observable.subscribe(data => {});
    this.getProducts();
  }
}
