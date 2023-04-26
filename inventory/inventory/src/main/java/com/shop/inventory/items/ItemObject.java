package com.shop.inventory.items;

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
	private int quantity;
	private int price;
	private int totalRate;
	private String category;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Stores store;

	public ItemObject(int id, String item, int quantity, int price, int totalRate, String category, Stores store) {
		super();
		this.id = id;
		this.item = item;
		this.quantity = quantity;
		this.price = price;
		this.totalRate = totalRate;
		this.category = category;
		this.store = store;
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

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getTotalRate() {
		return totalRate;
	}

	public void setTotalRate(int totalRate) {
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
	
	
	
}
