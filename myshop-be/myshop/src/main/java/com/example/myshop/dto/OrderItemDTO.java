package com.example.myshop.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class OrderItemDTO {
	private int orderIdx;
	private String orderDate;
	private String userName;
	private int money;
	private int delivery;
	private int totalMoney;
	private String method;
	private String cardNumber;
	private int zipcode;
	private String address1;
	private String address2;
	private String tel;
	private String status;
	private String cancelReason;
}