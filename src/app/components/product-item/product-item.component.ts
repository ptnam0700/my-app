import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartProduct, Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Output() onAddToCart: EventEmitter<CartProduct> = new EventEmitter<CartProduct>();

  quantity: number = 1;

  constructor() {}

  addToCart() {
    const cartProduct = {
      ...this.product,
      quantity: this.quantity
    } as CartProduct;

    this.onAddToCart.emit(cartProduct);
  }
}
