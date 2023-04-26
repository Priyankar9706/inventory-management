package com.shop.inventory.jpa;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shop.inventory.items.Categories;

public interface CategoriesRepository extends  JpaRepository<Categories, Integer>{
	Categories findByCategoryName(String categoryName);
}
