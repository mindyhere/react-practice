package com.example.myshop.api;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.myshop.dto.ProductDTO;
import com.example.myshop.entity.Product;
import com.example.myshop.repository.ProductRepository;

@RestController
@RequestMapping("/api/product/*")
public class ProductApi {
	@Autowired
	ProductRepository productRepository;

	@Autowired
	ModelMapper modelMapper;

	@RequestMapping(value = "list", method = { RequestMethod.GET, RequestMethod.POST })
	public List<Product> list(@RequestParam(name = "productName", defaultValue = "") String productName) {
		List<Product> items = null;
		if (productName.equals("")) {
			items = productRepository.findAll(Sort.by(Sort.Direction.ASC, "productName"));
		} else {
			items = productRepository.findByProductNameContaining(productName, Sort.by(Sort.Direction.ASC, "productName"));
		}
		return items;
//		List<ProductDTO> new_items = new ArrayList<>();
//		for (Product p : items) {
//			ProductDTO dto = modelMapper.map(p, ProductDTO.class);
//			new_items.add(dto);
//		}
//		return new_items;
	}
}