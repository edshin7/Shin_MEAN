import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getProductsFromServer() {
    return this._http.get("http://localhost:8000/getProducts");
  }

  getProductIdFromServer(id) {
    return this._http.get("http://localhost:8000/getOneProduct/" + id);
  }

  addProductInServer(product) {
    return this._http.post("http://localhost:8000/newProduct", product);
  }

  editProductInServer(id, product) {
    return this._http.put("http://localhost:8000/editProduct/" + id, product);
  }

  deleteProductInServer(id) {
    return this._http.delete("http://localhost:8000/deleteProduct/" + id);
  }
}
