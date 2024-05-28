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
    cardNo: new FormControl(null, [Validators.required]),
    expiry: new FormControl('', Validators.required),
    cvc: new FormControl(null, [Validators.required]),
    billingAddress: new FormControl('', Validators.required)
  });;

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
    // if(!this.paymentForm.valid) return;
    this.totalAmount = this.cartService.calculateTotalAmount();

    this.isConfirmationVisible = true;
    this.cartService.clearCart();
  }

  get email() {
    return this.paymentForm.get('email')?.value;
  }

  get name() {
    return this.paymentForm.get('name')?.value;
  }

  get address() {
    return this.paymentForm.get('billingAddress')?.value;
  }
}
