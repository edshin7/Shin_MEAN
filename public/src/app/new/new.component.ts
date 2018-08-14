import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  product: any = null;
  errors: any = [];

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.product = { name: "", price: 0, image_url: "" };
  }

  addProduct() {
    let observable = this._httpService.addProductInServer(this.product);
    observable.subscribe(data => {
      if(!data.hasErrors) {
        this._router.navigate(['/list']);
      }

      this.errors = data.errors;
    })
  }

}
