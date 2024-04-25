package com.example.myshop.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderDetailDTO {
	private int idx;
	private int productCode;
	private String productName;
	private int price;
	private int amount;
	private int money;
	private String method;
	private String cardNumber;
	private String zipcode;
	private String address1;
	private String address2;
	private String tel;
}