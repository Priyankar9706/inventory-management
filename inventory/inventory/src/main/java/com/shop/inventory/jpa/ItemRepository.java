package com.shop.inventory.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.inventory.items.Items;

public interface ItemRepository extends JpaRepository<Items, Integer>{
	List<Items> findByStoreStoreId(int id);
	List<Items> findByCategoryCategoryId(int id);
	Items findByItem(String name);
	
}
