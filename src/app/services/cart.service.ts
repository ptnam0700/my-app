import { Injectable } from "@angular/core";
import { CartProduct } from "../models/product.model";
import { BehaviorSubject, Observable } from "rxjs";
import { DeliveryOption } from "../models/delivery.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  mockDeliveryOptions: DeliveryOption[] =  [
    {
      id: 1,
      name: "Fedex Delivery",
      duration: "2-4 Days",
      price: 5,
      url: "https://cdn.sanity.io/images/kts928pd/production/c423a9d143ae2a03c1e7076e9abf851a19fceaec-1600x900.png"
    },
    {
      id: 2,
      name: "ninjavan",
      duration: "1-2 Days",
      price: 10,
      url: "https://cdn.haitrieu.com/wp-content/uploads/2022/05/Logo-Ninjavan-V-Red-.png"
    }
  ];

  private cartProductsSubject: BehaviorSubject<CartProduct[]> = new BehaviorSubject<CartProduct[]>([]);
  private _deliveryOption?: DeliveryOption;

  get deliveryOption() {
    return this._deliveryOption;
  }

  set deliveryOption(val) {
    this._deliveryOption = val;
  }

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {
    const cartProductsFromStorage = localStorage.getItem('cartProducts');
    const initCardProduct = cartProductsFromStorage ? JSON.parse(cartProductsFromStorage) : [];
    this.cartProductsSubject.next(initCardProduct);
  }

  private saveCart(items: CartProduct[]): void {
    localStorage.setItem('cartProducts', JSON.stringify(items));
  }

  public getCartProducts(): Observable<CartProduct[]> {
    return this.cartProductsSubject.asObservable();
  }

  public addToCart(item: CartProduct) {
    const currentCartProducts = this.cartProductsSubject.value;

    const existingItem = currentCartProducts.find(x => x.id == item.id);

    if(existingItem) {
      existingItem.quantity = item.quantity;
    } else {
      currentCartProducts.push(item)
    }

    this.cartProductsSubject.next(currentCartProducts);
    this.saveCart(currentCartProducts);
  }

  public removeFromCart(item: CartProduct) {
    const updatedCartProducts = this.cartProductsSubject.value.filter(cartProduct => cartProduct.id !== item.id);

    this.cartProductsSubject.next(updatedCartProducts);
    this.saveCart(updatedCartProducts);
  }

  public clearCart() {
    this.cartProductsSubject.next([]);
    localStorage.removeItem('cart');
  }

  public getDeliveryOptions(): DeliveryOption[] {
    return this.mockDeliveryOptions;
  }

  public calculateSubTotalAmount(): number {
    return this.cartProductsSubject.value.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  public calculateTotalAmount(): number {
    const deliveryPrice = this.deliveryOption?.price || 0;
    return this.calculateSubTotalAmount() + deliveryPrice;
  }
}
