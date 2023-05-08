package com.shop.inventory.items;

import java.util.List;

public class RequestBodyInvoiceGenerator {

	List<ItemObject> cartItems;
	double grandTotal;
	public List<ItemObject> getCartItems() {
		return cartItems;
	}
	public void setCartItems(List<ItemObject> cartItems) {
		this.cartItems = cartItems;
	}
	public double getGrandTotal() {
		return grandTotal;
	}
	public void setGrandTotal(double grandTotal) {
		this.grandTotal = grandTotal;
	}
	@Override
	public String toString() {
		return "RequestBodyInvoiceGenerator [cartItems=" + cartItems + ", grandTotal=" + grandTotal + "]";
	}
	
	
}
