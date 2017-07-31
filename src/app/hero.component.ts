import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgForm } from "@angular/forms"; 
import { Hero }    from './hero';
@Component({
  selector: 'hero-form',
  templateUrl: './hero.component.html'
  
})
export class HeroFormComponent {
   public powers =["eat","drink","sleep"];
   public submitted:boolean = false;
   model = new Hero(18, 'tangmin', this.powers[0], 'Chuck Overstreet');
   public onSubmit() { this.submitted = true; }
   get diagnostic() { return JSON.stringify(this.model); }
   newHero() {
  this.model = new Hero(42, '', '');
}

heroForm: NgForm;
@ViewChild('heroForm') currentForm: NgForm;

ngAfterViewChecked() {
  this.formChanged();
}

formChanged() {//这是查看是否有新heroForm对象的最佳时机。
  if (this.currentForm === this.heroForm) { return; }
  this.heroForm = this.currentForm;
  if (this.heroForm) {
    this.heroForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }
}



onValueChanged(data?: any) {
  if (!this.heroForm) { return; }
  const form = this.heroForm.form;

  for (const field in this.formErrors) {
    // clear previous error message (if any)
    this.formErrors[field] = '';
    const control = form.get(field);

    if (control && control.dirty && !control.valid) {
      const messages = this.validationMessages[field];
      for (const key in control.errors) {
        this.formErrors[field] += messages[key] + ' ';
      }
    }
  }
}

formErrors = {//当英雄数据有效时，这些消息的值为空字符串。
  'name': '',//这里的name是name=的那个结果
  'power': ''
};

validationMessages = {
  'name': {
    'required':      'Name is required.',
    'minlength':     'Name must be at least 4 characters long.',
    'maxlength':     'Name cannot be more than 24 characters long.',
    'forbiddenName': 'Someone named "Bob" cannot be a hero.'
  },
  'power': {
    'required': 'Power is required.'
  }
};

}
