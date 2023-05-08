package com.shop.inventory.items;


import java.io.IOException;
import java.net.URI;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
//import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shop.inventory.jpa.CategoriesRepository;
import com.shop.inventory.jpa.InvoiceRepository;
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
	private InvoiceRepository invoiceRepository;

	
	public ItemJpaResource(ItemRepository itemRepository,StoreRepository storeRepository,CategoriesRepository categoriesRepository,ItemObjectRepository itemObjectRepository,InvoiceRepository invoiceRepository) {
		this.itemRepository=itemRepository;
		this.categoriesRepository=categoriesRepository;
		this.storeRepository=storeRepository;
		this.itemObjectRepository=itemObjectRepository;
		this.invoiceRepository=invoiceRepository;
//		this.convertToDatabaseColumn=convertToDatabaseColumn;
	}
	
	@GetMapping("/user/{storename}/inventory")
	public List<Items> retrieveAllUsers(@PathVariable String storename) {
//		return itemRepository.findAll();
		
		Stores store= storeRepository.findByStoreName(storename);
		if(store!=null) {
			int storeId=store.getStoreId();
			return itemRepository.findByStoreStoreId(storeId);
			
		}else {
			return new ArrayList<Items>();
		}
		
		
	}
	
	@PutMapping("/user/{username}/invoice")
	public void updateInventoryAfterInvoice(@PathVariable String username,@Valid @RequestBody RequestBodyInvoiceGenerator request) throws StreamReadException, DatabindException, IOException{
		
		ObjectMapper objectMapper = new ObjectMapper();
		InvoiceHistory invoiceHistory=new InvoiceHistory();
		
		String d=objectMapper.writeValueAsString(request.getCartItems());
		
		invoiceHistory.setData(d);
		invoiceHistory.setGrandTotal(request.getGrandTotal());
		long mills=System.currentTimeMillis();
		
		
		invoiceHistory.setDate(new Date(mills));
		invoiceHistory.setTime(java.time.LocalTime.now());
		
		Stores store= storeRepository.findByStoreName(username);
		
		invoiceHistory.setStore(store);
		invoiceRepository.save(invoiceHistory);
			


		
			

     
     
		request.getCartItems().forEach(item->{
			
			Items items=itemRepository.findByItem(item.getItem());
//			if(items.getQuantity()-item.getQuantity()==0) {
//				itemRepository.delete(items);
//			}else {
				items.setQuantity(items.getQuantity()-item.getQuantity());
				itemRepository.save(items);
//			}
		
			
			
		});
	}
	
	@GetMapping("/user/{storename}/invoice_history")
	public List<InvoiceHistory>  getInvoiceHistoryList(@PathVariable String storename){
		Stores store= storeRepository.findByStoreName(storename);
		int storeId=store.getStoreId();
		List<InvoiceHistory> list=invoiceRepository.findByStoreStoreId(storeId);
		
		
		return list;
 
		
		
		
	}
	
	@PostMapping("/user/{storename}/inventory")
	public Items createItem(@Valid @RequestBody ItemForm itemForm,@PathVariable String storename) {
		String category=itemForm.getCategory();
		
		Categories categories=categoriesRepository.findByCategoryName(category);
		
		int categoryId;
		
		if(categories==null) {
		
			categoriesRepository.save(new Categories(0,category));
			categoryId=categoriesRepository.findByCategoryName(category).getCategoryId();
			
		}else {
			categoryId=categories.getCategoryId();
			
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
		

		itemRepository.save(items);
		return items;
		
		
	}
	
	
	@PostMapping("/user/{storename}/cart")
	public ItemObject addItemToCart(@Valid @RequestBody ItemObject itemObject,@PathVariable  String storename) {
		System.out.println(itemObject.getQuantity());
		int storeId=storeRepository.findByStoreName(storename).getStoreId();
		itemObject.setStore(new Stores(storeId,storename));
		itemObjectRepository.save(itemObject);
		return itemObject;
	}
	
	@GetMapping("/user/{storename}/cart")
	public List<ItemObject> getCartItem(@PathVariable String storename) {
		int storeId=storeRepository.findByStoreName(storename).getStoreId();
		
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

