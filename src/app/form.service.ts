import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

@Injectable()
export class FormBullhornService {
  constructor(private http: Http) {
  }

  public saveForm(formData) {
    console.log(JSON.stringify(formData));
  }
}
