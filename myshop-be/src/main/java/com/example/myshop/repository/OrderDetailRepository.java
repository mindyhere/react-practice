package com.example.myshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.myshop.entity.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
}