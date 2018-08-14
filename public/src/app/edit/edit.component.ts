import { Component, OnInit } from '@angular/core';
import { HttpService } from "../http.service";
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  product: any = null;
  errors: any = [];

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      this.getProductById(params["id"]);
    });
  }

  getProductById(id) {
    let observable = this._httpService.getProductIdFromServer(id);
    observable.subscribe(data => {
      this.product = data;
    })
  }

  editProduct(id) {
    let observable = this._httpService.editProductInServer(id, this.product);
    observable.subscribe(data => {
      if(!data.hasErrors) {
        this._router.navigate(['/list']);
      }

      this.errors = data.errors;
    })
  }

}
