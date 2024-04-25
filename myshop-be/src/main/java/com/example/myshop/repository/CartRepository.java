package com.example.myshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.myshop.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer> {
}