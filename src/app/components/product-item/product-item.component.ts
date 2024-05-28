import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: Product;
  quantity: number = 1;

  constructor(private cartService: CartService) {}

  addToCart() {
    const cartProduct = {
      ...this.product,
      quantity: this.quantity
    }
    this.cartService.addToCart(cartProduct);
  }
}
