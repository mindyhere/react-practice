package com.example.myshop.api;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.myshop.dto.CartDTO;
import com.example.myshop.entity.Cart;
import com.example.myshop.entity.Member;
import com.example.myshop.entity.Product;
import com.example.myshop.repository.CartRepository;
import com.example.myshop.repository.MemberRepository;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/api/cart/*")
public class CartApi {
	@Autowired
	CartRepository cartRepository;

	@Autowired
	MemberRepository memberRepository;

	@Autowired
	ModelMapper modelMapper;

	@GetMapping("delete/{cartId}")
	public void delete(@PathVariable(name = "cartId") int cartId) {
		cartRepository.deleteById(cartId);
	}

	@Transactional
	@GetMapping("deleteAll")
	public void deleteAll(@RequestParam(name = "userid") String userid) {
		Optional<Member> result = memberRepository.findByUserid(userid);
		List<Cart> cartList = (List<Cart>) result.get().getCartList();
		for (Cart c : cartList) {
			cartRepository.deleteById(c.getCartId());
		}
	}

	@Transactional
	@PostMapping("update")
	public void update(@RequestParam(name = "userid") String userid, @RequestParam(name = "cartId") int cartId,
			@RequestParam(name = "productCode") int productCode, @RequestParam(name = "amount") int amount) {
		if (amount == 0) {
			cartRepository.deleteById(cartId);
		} else {
			CartDTO dto = new CartDTO();
			dto.setUserid(userid);
			dto.setCartId(cartId);
			dto.setAmount(amount);
			dto.setProductCode(productCode);
			Cart c = modelMapper.map(dto, Cart.class);
			c.setCartId(cartId);
			c.setMember(new Member(userid));
			c.setProduct(new Product(productCode));
			c.setAmount(amount);
			cartRepository.save(c);
		}
	}

	@GetMapping("list")
	public Map<String, Object> list(@RequestParam(name = "userid") String userid) {
		Map<String, Object> map = new HashMap<>();
		Optional<Member> result = memberRepository.findById(userid);
		if (result.isPresent()) {
			List<Cart> cartList = (List<Cart>) result.get().getCartList();
			List<CartDTO> cartItem = new ArrayList<>();
			int money = 0;
			for (Cart c : cartList) {
				money += c.getProduct().getPrice() * c.getAmount();
				CartDTO dto = new CartDTO();
				dto.setCartId(c.getCartId());
				dto.setUserid(userid);
				dto.setProductCode(c.getProduct().getProductCode());
				dto.setProductName(c.getProduct().getProductName());
				dto.setPrice(c.getProduct().getPrice());
				dto.setAmount(c.getAmount());
				dto.setMoney(c.getProduct().getPrice() * c.getAmount());
				cartItem.add(dto);
			}
			int delivery = money >= 30000 ? 0 : 2500;
			map.put("money", money);
			map.put("delivery", delivery);
			map.put("totalMoney", money + delivery);
			map.put("list", cartItem);
			map.put("count", cartItem.size());
		} else {
			map.put("count", 0);
		}
		return map;
	}

	//@Transactional
	@RequestMapping("insert")
	public void insert(CartDTO dto) {
		Cart c = modelMapper.map(dto, Cart.class);
		c.setMember(new Member(dto.getUserid()));
		cartRepository.save(c);
	}
}