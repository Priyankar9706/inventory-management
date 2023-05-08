package com.shop.inventory.jpa;

import java.util.Map;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.shop.inventory.items.InvoiceHistory;

import jakarta.persistence.AttributeConverter;

public class ConvertToDatabaseColumn implements AttributeConverter<Map<String,Object>, String>{

	@Override
	public String convertToDatabaseColumn(Map<String, Object> attribute) {
		ObjectMapper objectMapper = new ObjectMapper();
			InvoiceHistory invoiceHistory=new InvoiceHistory();
		 String invoiceDetails = null;
		 try {
			invoiceDetails = objectMapper.writeValueAsString(attribute);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
			
		return null;
	}
	@Override
	public Map<String, Object> convertToEntityAttribute(String dbData) {
		// TODO Auto-generated method stub
		return null;
	}

	
}
