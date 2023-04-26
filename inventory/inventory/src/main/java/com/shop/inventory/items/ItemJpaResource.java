package com.shop.inventory.items;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.hibernate.cache.spi.support.AbstractReadWriteAccess.Item;
//import org.hibernate.cache.spi.support.AbstractReadWriteAccess.Item;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.shop.inventory.jpa.CategoriesRepository;
import com.shop.inventory.jpa.ItemObjectRepository;
import com.shop.inventory.jpa.ItemRepository;
import com.shop.inventory.jpa.StoreRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
public class ItemJpaResource {
	private ItemRepository itemRepository;
	private StoreRepository storeRepository;
	private CategoriesRepository categoriesRepository;
	private ItemObjectRepository itemObjectRepository;
	
	public ItemJpaResource(ItemRepository itemRepository,StoreRepository storeRepository,CategoriesRepository categoriesRepository,ItemObjectRepository itemObjectRepository) {
		this.itemRepository=itemRepository;
		this.categoriesRepository=categoriesRepository;
		this.storeRepository=storeRepository;
		this.itemObjectRepository=itemObjectRepository;
	}
	
	@GetMapping("/user/{storename}/inventory")
	public List<Items> retrieveAllUsers(@PathVariable String storename) {
//		return itemRepository.findAll();
		System.out.println(storename+"dddddddd");
		Stores store= storeRepository.findByStoreName(storename);
		if(store!=null) {
			int storeId=store.getStoreId();
			return itemRepository.findByStoreStoreId(storeId);
			
		}else {
			return new ArrayList<Items>();
		}
		
		
	}
	
	@PutMapping("/user/{username}/invoice")
	public void updateInventoryAfterInvoice(@PathVariable String username,@Valid @RequestBody List<ItemObject> cartItems){
		System.out.println("1");
		cartItems.forEach(item->{
			System.out.println("2");
			Items items=itemRepository.findByItem(item.getItem());
			if(items.getQuantity()-item.getQuantity()==0) {
				itemRepository.delete(items);
			}else {
				items.setQuantity(items.getQuantity()-item.getQuantity());
				itemRepository.save(items);
			}
			System.out.println("3 "+ items);
			
			
		});
	}
	
	
	@PostMapping("/user/{storename}/inventory")
	public Items createItem(@Valid @RequestBody ItemForm itemForm,@PathVariable String storename) {
		String category=itemForm.getCategory();
		//System.out.println("1111"+category);
		Categories categories=categoriesRepository.findByCategoryName(category);
		//System.out.println("2222"+categories);
		int categoryId;
		
		if(categories==null) {
		//	System.out.println("33333");
			categoriesRepository.save(new Categories(0,category));
			categoryId=categoriesRepository.findByCategoryName(category).getCategoryId();
			
		}else {
			categoryId=categories.getCategoryId();
			//System.out.println("44444"+categoryId);
		}
		
		//Stores store= storeRepository.findByStoreName(storename);
		int storeId=storeRepository.findByStoreName(storename).getStoreId();
		Items items=new Items();
		items.setId(itemForm.getId());
		items.setItem(itemForm.getItem());
		items.setPrice(itemForm.getPrice());
		items.setQuantity(itemForm.getQuantity());
		items.setCategory(new Categories(categoryId,category));
		items.setStore(new Stores(storeId,storename));
		items.setUnit(itemForm.getUnit());
		
		System.out.println("CONTROLLED "+items);
		itemRepository.save(items);
		return items;
		
		
	}
	
	
	@PostMapping("/user/{storename}/cart")
	public ItemObject addItemToCart(@Valid @RequestBody ItemObject itemObject,@PathVariable  String storename) {
		System.out.println(itemObject);
		int storeId=storeRepository.findByStoreName(storename).getStoreId();
		itemObject.setStore(new Stores(storeId,storename));
		itemObjectRepository.save(itemObject);
		return itemObject;
	}
	
	@GetMapping("/user/{storename}/cart")
	public List<ItemObject> getCartItem(@PathVariable String storename) {
		int storeId=storeRepository.findByStoreName(storename).getStoreId();
		System.out.println(itemObjectRepository.findByStoreStoreId(storeId).toString());
		return  itemObjectRepository.findByStoreStoreId(storeId);
		
	}
	
	@DeleteMapping("/user/{username}/inventory/{id}")
	public boolean deleteItem(@PathVariable String username,@PathVariable int id) {
		
		Optional<Items> item=itemRepository.findById(id);
		if(item==null) {
			return false;
		}else {
			List<Items> itemArray=itemRepository.findByCategoryCategoryId(item.get().getCategory().getCategoryId());
			itemRepository.deleteById(id);
			
			if(itemArray.size()==1) {
				categoriesRepository.deleteById(item.get().getCategory().getCategoryId());
			}
			return true;
			
		}
	
	}
	@DeleteMapping("/user/{username}/cart/{id}")
	public boolean deleteItemFromCart(@PathVariable String username,@PathVariable int id)
	{
		Optional<ItemObject> itemObject=itemObjectRepository.findById(id);
		if(itemObject==null) {
			return false;
		}else {
			itemObjectRepository.deleteById(id);
			return true;
			
		}
	}
	

	@GetMapping("/jpa/items/{id}")
	public Optional<Items> retrieveItem(@PathVariable int id) {
		return itemRepository.findById(id);
	}

	
	@PostMapping("/jpa/items")
	public ResponseEntity<Items> createItem(@Valid @RequestBody Items item) {
		
		@Valid Items savedUser = itemRepository.save(item);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest()
						.path("/{id}")
						.buildAndExpand(savedUser.getId())
						.toUri();   
		
		return ResponseEntity.created(location).build();
	}
	

	@DeleteMapping("/jpa/items/{id}")
	public void deleteItem(@PathVariable int id) {
		itemRepository.deleteById(id);
	}
	@Transactional
	@DeleteMapping("/user/{storename}/inventory")
	public void deleteCart(@PathVariable String storename) {
		int storeId=storeRepository.findByStoreName(storename).getStoreId();
		System.out.println(storeId);
		 itemObjectRepository.deleteAllByStoreStoreId(storeId);
		
	}
	@PutMapping("/jpa/items/{id}")
	public void updateItem(@PathVariable int id,@RequestBody Items item) {
		
		itemRepository.save(item);
		
		
	}
	
}
//select * from INVENTORY_ITEMS
// "quantity":525,"price":254,"item":"dairymilk"
// "quantity":25,"price":25,"item":"20-20"
// "quantity":5,"price":10,"item":"kitkat"

