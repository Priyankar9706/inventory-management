package com.shop.inventory.items;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity(name="stores")
public class Stores {
	
	Stores(){
		
	}

	@Id
	@GeneratedValue
	private int storeId;
	
	private String storeName;

	@OneToMany(mappedBy = "store")
	List<Items> itemsList; 
	
	
	public Stores(int storeId, String storeName) {
		super();
		this.storeId = storeId;
		this.storeName = storeName;
	}
	public int getStoreId() {
		return storeId;
	}

	public void setStoreId(int storeId) {
		this.storeId = storeId;
	}

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}
	@Override
	public String toString() {
		return "Stores [storeId=" + storeId + ", storeName=" + storeName + ", itemsList=" + itemsList + "]";
	}

	
	
}
