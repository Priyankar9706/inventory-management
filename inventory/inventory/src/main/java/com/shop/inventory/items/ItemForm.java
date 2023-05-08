package com.shop.inventory.items;

public class ItemForm {
	private int id;
	private String item;
	private String category;
	private double price;
	private double quantity;
	private String unit;
	
	ItemForm(){
		
	}
	
	
	
	
	public ItemForm(int id,String item, String category, double price, double quantity,String unit) {
		super();
		this.id=id;
		this.item = item;
		this.category = category;
		this.price = price;
		this.quantity = quantity;
		this.unit=unit;
	}





	public String getCategory() {
		return category;
	}



	public void setCategory(String category) {
		this.category = category;
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



	public String getUnit() {
		return unit;
	}



	public void setUnit(String unit) {
		this.unit = unit;
	}




	public double getPrice() {
		return price;
	}




	public void setPrice(double price) {
		this.price = price;
	}




	public double getQuantity() {
		return quantity;
	}




	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}
	
	
}
