package com.example.myshop.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.myshop.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	List<Product> findByProductNameContaining(String productName, Sort sort);
}