package com.shop.inventory.items;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity(name="invoiceCart")
public class ItemObject {
	ItemObject(){
		
	}
	
	@Id
	@GeneratedValue
	private int id;
	private String item;
	@Column(precision = 2)
	private double quantity;
	private double price;
	private double totalRate;
	private String category;
	private int grandTotal;
	private String unit;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Stores store;

	public ItemObject(int id, String item, double quantity, double price, double totalRate, String category, Stores store,String unit) {
		super();
		this.id = id;
		this.item = item;
		this.quantity = quantity;
		this.price = price;
		this.totalRate = totalRate;
		this.category = category;
		this.store = store;
		this.unit=unit;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getItem() {
		return item;
	}

	public void setItem(String item) {
		this.item = item;
	}

	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public double getTotalRate() {
		return totalRate;
	}

	public void setTotalRate(double totalRate) {
		this.totalRate = totalRate;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Stores getStore() {
		return store;
	}

	public void setStore(Stores store) {
		this.store = store;
	}

	@Override
	public String toString() {
		return "ItemObject [id=" + id + ", item=" + item + ", quantity=" + quantity + ", price=" + price
				+ ", totalRate=" + totalRate + ", category=" + category + ", grandTotal=" + grandTotal + ", unit="
				+ unit + ", store=" + store + "]";
	}

	public int getGrandTotal() {
		return grandTotal;
	}

	public void setGrandTotal(int grandTotal) {
		this.grandTotal = grandTotal;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}
	
	
	
}
