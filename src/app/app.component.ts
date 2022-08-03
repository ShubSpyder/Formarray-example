import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  productForm: FormGroup = new FormGroup({});
  products: FormArray | undefined;

  formValues: string = '';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.addProduct();
  }

  initializeForm() {
    this.productForm = this.formBuilder.group({
      products: this.formBuilder.array([]),
    });
  }

  productGetter(): FormArray {
    return this.productForm?.get('products') as FormArray;
  }

  newProduct(): FormGroup {
    return this.formBuilder.group({
      productName: ['', Validators.required],
      brand: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  addProduct() {
    this.productGetter().push(this.newProduct());
  }

  removeProduct(index: number) {
    this.productGetter().removeAt(index);
  }

  onSubmit() {
    this.formValues = JSON.stringify(this.productForm?.value, null, '\t');
    console.log('Value on submit ::', this.productForm?.value);
  }
}
