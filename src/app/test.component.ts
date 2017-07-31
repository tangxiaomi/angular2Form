import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormBullhornService } from "./form.service";
export class FormComponent {
  public applyForm: FormGroup;
  public submitted = false;
  rex= /^((https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?)$/;

  public authUrlControl = new FormControl("", [Validators.required, Validators.pattern(this.rex.source)]);
  //初始化放在这里，这些control组成了表单
  public formErrors = {
    authUrl: "",
  };

  constructor(private formBullhornService: FormBullhornService) { }
  ngOnInit() {
    this.buildApplyForm();
    this.bindFormErrorHandler();
  }

  private buildApplyForm() {
    this.applyForm = new FormGroup({ //组成表单
      authUrl: this.authUrlControl,
    });
  }

  validationMessages = {
    "authUrl": {
      "required": "This field is required.",
      "pattern": " url error"
    },

  };

  public onSubmit() {
    this.submitted = true;
    this.formErrorProcess();
    if (this.applyForm.valid) {
      this.formBullhornService.saveForm({ authenticationUrl: this.authUrlControl.value, });
    }
  }

private bindFormErrorHandler() {//这个是实现实时的变化
    this.applyForm.valueChanges.subscribe(data => {
      this.formErrorProcess();
    });
  }

  private formErrorProcess() {
    if (!this.applyForm) {
      return;
    }
    const form = this.applyForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = "";
      const control = form.get(field);
      if (control && (control.dirty || this.submitted) && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + " ";
        }
      }
    }
  }
}
