package com.example.myshop.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ProductDTO {
	private int productCode;
	private String productName;
	private int price;
	private String description;
	private String fileName;
	private MultipartFile img;

	public ProductDTO(int productCode, String productName, int price, String description, String fileName) {
		this.productCode = productCode;
		this.productName = productName;
		this.price = price;
		this.description = description;
		this.fileName = fileName;
	}
}