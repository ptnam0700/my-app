import { Component } from '@angular/core';
import { CartProduct, Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      {
        next: (products) => {
          console.log(products)
          this.products = products;
        }
      }
    )
  }

  addToCart(cartProduct: CartProduct) {
    this.cartService.addToCart(cartProduct);
  }

}
