package com.shop.inventory.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.inventory.items.InvoiceHistory;
import com.shop.inventory.items.Items;

public interface InvoiceRepository extends JpaRepository<InvoiceHistory, Integer>{
	List<InvoiceHistory> findByStoreStoreId(int id);

	
}
