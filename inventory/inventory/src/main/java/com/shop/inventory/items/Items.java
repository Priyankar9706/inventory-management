package com.shop.inventory.items;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;

@Entity(name="inventory_items")

public class Items {
	Items(){
		
	}
	@Id
	@GeneratedValue
	private int id;
	
	@Size(min=2, message = "Name should have atleast 2 characters")
	private String item;
	
//	private String storeId;
//	private String catgoryId;
	
	//shopName
	//private int categoryId; 
	private int quantity;
	private String unit;
	private int  price;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Stores store;
	
	@ManyToOne(fetch = FetchType.EAGER)
	private Categories category;
	
	
	
	
	public Items(int id, @Size(min = 2, message = "Name should have atleast 2 characters") String item, String storeId,
			String catgoryId, int quantity, int price,String unit) {
		super();
		this.id = id;
		this.item = item;
//		this.storeId = storeId;
//		this.catgoryId = catgoryId;
		this.quantity = quantity;
		this.price = price;
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



	public Stores getStore() {
		return store;
	}



	public void setStore(Stores store) {
		this.store = store;
	}



	public Categories getCategory() {
		return category;
	}



	public void setCategory(Categories category) {
		this.category = category;
	}



	public String getUnit() {
		return unit;
	}



	public void setUnit(String unit) {
		this.unit = unit;
	}

//
//
//	public String getStoreId() {
//		return storeId;
//	}
//
//
//
//	public void setStoreId(String shopId) {
//		this.storeId = shopId;
//	}
//
//
//
//	public String getCatgoryId() {
//		return catgoryId;
//	}
//
//
//
//	public void setCatgoryId(String catgoryId) {
//		this.catgoryId = catgoryId;
//	}
	
	
	
}
