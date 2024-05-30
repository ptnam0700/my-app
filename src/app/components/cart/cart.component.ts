import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DeliveryOption } from 'src/app/models/delivery.model';
import { CartProduct } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartProducts: CartProduct[] = [];
  deliveryOptions: DeliveryOption[] = [];

  isConfirmationVisible: boolean = false;
  totalAmount: number = 0;

  paymentForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    name: new FormControl('', Validators.required),
    cardNo: new FormControl('', [Validators.required, Validators.pattern(/^\d{16}$/)]),
    expiry: new FormControl('', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2}|[0-9]{4})$/)]),
    cvc: new FormControl('', [Validators.required, Validators.pattern(/^\d{3,4}$/)]),
    billingAddress: new FormControl('', Validators.required)
  });

  constructor(public cartService: CartService) {}

  ngOnInit(): void {
    this.deliveryOptions = this.cartService.getDeliveryOptions();

    this.cartService.getCartProducts().subscribe(
      {
        next: (cartProducts) => {
          this.cartProducts = cartProducts;
        }
      }
    );
  }

  updateProduct(cartProduct: CartProduct) {
    this.cartService.addToCart(cartProduct);
  }

  removeProduct(cartProduct: CartProduct) {
    this.cartService.removeFromCart(cartProduct);
  }

  selectDeliveryOption(option: DeliveryOption) {
    this.cartService.deliveryOption = option;
  }

  placeOrder() {
    if (this.paymentForm.valid) {
      this.totalAmount = this.cartService.calculateTotalAmount();
      this.isConfirmationVisible = true;
      this.cartService.clearCart();
    } else {
      this.paymentForm.markAllAsTouched();
    }
  }

  get email() {
    return this.paymentForm.get('email');
  }

  get name() {
    return this.paymentForm.get('name');
  }

  get address() {
    return this.paymentForm.get('billingAddress');
  }

  get cardNo() {
    return this.paymentForm.get('cardNo');
  }
  get expiry() {
    return this.paymentForm.get('expiry');
  }
  get cvc() {
    return this.paymentForm.get('cvc');
  }
}
