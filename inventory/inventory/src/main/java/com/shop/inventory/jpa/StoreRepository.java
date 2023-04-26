package com.shop.inventory.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.inventory.items.Stores;

public interface StoreRepository extends JpaRepository<Stores, Integer>{
	Stores findByStoreName(String storeName);
}
