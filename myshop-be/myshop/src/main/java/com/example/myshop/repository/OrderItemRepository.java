package com.example.myshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.myshop.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
}