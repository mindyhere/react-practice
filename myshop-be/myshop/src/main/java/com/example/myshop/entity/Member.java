package com.example.myshop.entity;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Member {

	@Id
	private String userid;

	private String passwd;
	private String name;

	@ColumnDefault("1")
	private int level; // 일반유저 1, 관리자 10

	private String zipcode;
	private String address1;
	private String address2;
	private String tel;

	@ToString.Exclude
	@OneToMany(mappedBy = "member")
	List<Cart> cartList = new ArrayList<>();
	
	@ToString.Exclude
	@OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
	List<OrderItem> orderItemList = new ArrayList<>();	
	public Member(String userid) {
		this.userid = userid;
	}
}