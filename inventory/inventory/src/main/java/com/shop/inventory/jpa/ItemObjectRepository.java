package com.shop.inventory.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.inventory.items.ItemObject;
import com.shop.inventory.items.Items;

public interface ItemObjectRepository extends JpaRepository<ItemObject, Integer>{
	List<ItemObject> findByStoreStoreId(int id);
	
	void deleteAllByStoreStoreId(int id);
}
