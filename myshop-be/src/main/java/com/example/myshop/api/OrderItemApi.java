package com.example.myshop.api;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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

import com.example.myshop.dto.OrderDetailDTO;
import com.example.myshop.dto.OrderItemDTO;
import com.example.myshop.entity.Cart;
import com.example.myshop.entity.Member;
import com.example.myshop.entity.OrderDetail;
import com.example.myshop.entity.OrderItem;
import com.example.myshop.entity.Product;
import com.example.myshop.repository.CartRepository;
import com.example.myshop.repository.MemberRepository;
import com.example.myshop.repository.OrderDetailRepository;
import com.example.myshop.repository.OrderItemRepository;
import com.example.myshop.repository.ProductRepository;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/api/order/*")
public class OrderItemApi {
	@Autowired
	ProductRepository productRepository;

	@Autowired
	OrderItemRepository orderItemRepository;

	@Autowired
	OrderDetailRepository orderDetailRepository;

	@Autowired
	CartRepository cartRepository;

	@Autowired
	MemberRepository memberRepository;

	@Autowired
	ModelMapper modelMapper;

	@GetMapping("list")
	public Map<String, Object> list(@RequestParam(name = "userid") String userid) {
		Optional<Member> result = memberRepository.findByUserid(userid);
		Map<String, Object> map = new HashMap<>();
		if (result.isPresent()) {
			Member m = result.get();
			int level = m.getLevel();
			List<OrderItem> orderItemList;
			if (level == 10) {
				orderItemList = orderItemRepository.findAll();
			} else {
				orderItemList = (List<OrderItem>) result.get().getOrderItemList();
			}
			List<OrderItemDTO> items = new ArrayList<>();
			for (OrderItem row : orderItemList) {
				OrderItemDTO dto = new OrderItemDTO();
				DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				String strDate = dateFormat.format(row.getOrderDate());
				dto.setUserName(row.getMember().getName());
				dto.setOrderIdx(row.getOrderIdx());
				dto.setOrderDate(strDate);
				dto.setTotalMoney(row.getTotalMoney());
				dto.setMethod(row.getMethod());
				dto.setStatus(row.getStatus());
				dto.setAddress1(row.getAddress1());
				dto.setAddress2(row.getAddress2());
				items.add(dto);
			}
			map.put("list", items);
			map.put("count", items.size());
		} else {
			map.put("count", 0);
		}
		return map;
	}

	@RequestMapping("detail/{orderIdx}")
	public Map<String, Object> detail(@PathVariable(name = "orderIdx") int orderIdx) {
		Optional<OrderItem> result = orderItemRepository.findById(orderIdx);
		Map<String, Object> map = new HashMap<>();
		if (result.isPresent()) {
			OrderItem order = result.get();
			OrderItemDTO dto = new OrderItemDTO();
			dto.setMethod(order.getMethod());
			dto.setCardNumber(order.getCardNumber());
			dto.setCancelReason(order.getCancelReason());
			dto.setMoney(order.getMoney());
			dto.setDelivery(order.getDelivery());
			dto.setTotalMoney(order.getTotalMoney());
			DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			String strDate = dateFormat.format(order.getOrderDate());
			dto.setOrderDate(strDate);
			dto.setOrderIdx(order.getOrderIdx());
			dto.setStatus(order.getStatus());
			dto.setZipcode(order.getZipcode());
			dto.setAddress1(order.getAddress1());
			dto.setAddress2(order.getAddress2());
			dto.setTel(order.getTel());
			map.put("dto", dto);

			List<OrderDetail> detailList = order.getDetailList();
			List<OrderDetailDTO> items = new ArrayList<>();
			for (OrderDetail row : detailList) {
				OrderDetailDTO dto2 = new OrderDetailDTO();
				dto2.setProductCode(row.getProduct().getProductCode());
				dto2.setProductName(row.getProduct().getProductName());
				dto2.setPrice(row.getProduct().getPrice());
				dto2.setAmount(row.getAmount());
				dto2.setMoney(row.getProduct().getPrice() * row.getAmount());
				items.add(dto2);
			}
			map.put("detailList", items);
		}
		return map;
	}

	@Transactional
	@PostMapping("insert")
	public void insert(@RequestParam(name = "userid") String userid, OrderItemDTO dto,
			@RequestParam(name = "productCode", defaultValue = "0") int productCode,
			@RequestParam(name = "amount", defaultValue = "0") int amount) {
		OrderItem o = modelMapper.map(dto, OrderItem.class);
		o.setMember(new Member(userid));
		o.setOrderDate(new Date());
		o.setStatus("주문접수");
		OrderItem order = orderItemRepository.save(o);

		if (productCode > 0) {
			// 상품목록에서 직접 주문한 경우
			OrderDetail od = new OrderDetail();
			od.setOrder(new OrderItem(order.getOrderIdx()));
			od.setProduct(new Product(productCode));
			od.setAmount(amount);
			orderDetailRepository.save(od);
		} else {
			// 장바구니 목록에서 주문한 경우
			Optional<Member> result = memberRepository.findByUserid(userid);
			List<Cart> cartList = (List<Cart>) result.get().getCartList();
			for (Cart c : cartList) {
				OrderDetail od = new OrderDetail();
				od.setOrder(new OrderItem(order.getOrderIdx()));
				od.setProduct(new Product(c.getProduct().getProductCode()));
				od.setAmount(c.getAmount());
				orderDetailRepository.save(od);
				cartRepository.deleteById(c.getCartId());
			}
		}
	}

	@Transactional
	@PostMapping("cancel")
	public void cancel(@RequestParam(name = "userid") String userid, @RequestParam(name = "orderIdx") int orderIdx,
			@RequestParam(name = "cancelReason") String cancelReason) {
		Optional<OrderItem> result = orderItemRepository.findById(orderIdx);
		OrderItem o = result.get();
		o.setMember(new Member(userid));
		o.setStatus("주문취소요청");
		o.setCancelReason(cancelReason);
		orderItemRepository.save(o);
	}

	@PostMapping("changeStatus")
	public void changeStatus(@RequestParam(name = "orderIdx") int orderIdx,
			@RequestParam(name = "status") String status) {
		Optional<OrderItem> result = orderItemRepository.findById(orderIdx);
		OrderItem o = result.get();
		o.setStatus(status);
		orderItemRepository.save(o);
	}

	@Transactional
	@GetMapping("cancel/{orderIdx}")
	public void cancel(@PathVariable(name = "orderIdx") int orderIdx,
			@RequestParam(name = "cancelReason") String cancelReason) {
		Optional<OrderItem> result = orderItemRepository.findById(orderIdx);
		OrderItem o = result.get();
		o.setStatus("주문취소요청");
		o.setCancelReason(cancelReason);
		orderItemRepository.save(o);
	}
}