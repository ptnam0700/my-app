import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartProduct, Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent {
  productId: number | undefined;
  product!: Product| undefined;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    this.productId = productId ? +productId : 0;

    if(this.productId) {
      this.productService.getProductById(this.productId).subscribe(
        {
          next: (product) => {
            this.product = product;
          }
        }
      )
    }
  }

  addToCart() {
    if(this.product) {
      const cartProduct = {
        ...this.product,
        quantity: this.quantity
      }
      this.cartService.addToCart(cartProduct);
    }
  }
}
