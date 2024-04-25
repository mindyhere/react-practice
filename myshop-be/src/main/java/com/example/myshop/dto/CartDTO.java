package com.example.myshop.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CartDTO {
	private int cartId;
	private String userid;
	private String name;
	private int productCode;
	private String productName;
	private int price;
	private int amount;
	private int money;
}