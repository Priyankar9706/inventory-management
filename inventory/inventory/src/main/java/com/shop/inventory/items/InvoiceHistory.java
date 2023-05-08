package com.shop.inventory.items;

import java.sql.Date;
import java.time.LocalTime;


import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;

@Entity(name="invoice_history")
public class InvoiceHistory {
	public InvoiceHistory() {
		// TODO Auto-generated constructor stub
	}
	@Id
	@GeneratedValue
	private int id;
	
	@Lob
	@Column(columnDefinition = "BLOB")
	private String data;
	
	@Column(columnDefinition = "Date")
	private Date date;

	@Column(columnDefinition = "Time")
	private LocalTime time;

	private double grandTotal;

	@ManyToOne(fetch = FetchType.EAGER)
	private Stores store;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getData() {
		return data;
	}

	public void setData(String data) {
		this.data = data;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	@Override
	public String toString() {
		return "InvoiceHistory [id=" + id + ", data=" + data + ", date=" + date + ", time=" + time + ", grandTotal="
				+ grandTotal + ", store=" + store + "]";
	}

	public LocalTime getTime() {
		return time;
	}

	public void setTime(LocalTime localTime) {
		this.time = localTime;
	}

	public Stores getStore() {
		return store;
	}

	public void setStore(Stores store) {
		this.store = store;
	}

	public double getGrandTotal() {
		return grandTotal;
	}

	public void setGrandTotal(double grandTotal) {
		this.grandTotal = grandTotal;
	}


	
}
