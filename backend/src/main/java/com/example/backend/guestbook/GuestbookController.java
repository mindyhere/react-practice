package com.example.backend.guestbook;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GuestbookController {
	@Autowired
	GuestBookDAO gbDao;

	@RequestMapping("/guestbook")
	public List<Map<String, Object>> list(@RequestParam(name = "searchkey", defaultValue = "name") String searchkey,
			@RequestParam(name = "search", defaultValue = "") String search) {
		System.out.println("searchkey: " + searchkey);
		System.out.println("search: " + search);
		return gbDao.list(searchkey, search);
	}

	@RequestMapping("/guestbook/insert")
	public void insert(@RequestParam Map<String, Object> map) {
		gbDao.insert(map);
	}

	@RequestMapping("/guestbook/detail/{idx}")
	public Map<String, Object> detail(@PathVariable(name = "idx") int idx) {
		return gbDao.detail(idx);
	}

	@RequestMapping("/guestbook/update")
	public Map<String, Object> update(@RequestParam Map<String, Object> map) {
		System.out.println("수정할 데이터: " + map);
		Map<String, Object> result_map = new HashMap<>();
		// HashMap으로 받을 경우, 자료형 고정되지 X → String은 정수로 변환하는 단계 필요
		int idx = Integer.parseInt(String.valueOf(map.get("idx")));
		String passwd = String.valueOf(map.get("passwd"));
		if (gbDao.check_pwd(idx, passwd)) {
			gbDao.update(map);
			result_map.put("result", "success");
		} else {
			result_map.put("result", "fail");
		}
		return result_map; // 리액트로 넘길 결과데이터
	}

	@RequestMapping("/guestbook/delete")
	public Map<String, Object> delete(@RequestParam(name = "idx") int idx,
			@RequestParam(name = "passwd") String passwd) {
		System.out.println("삭제test : idx=" + idx + ", passwd=" + passwd);
		Map<String, Object> result_map = new HashMap<>();
		if (gbDao.check_pwd(idx, passwd)) {
			gbDao.delete(idx);
			result_map.put("result", "success");
		} else {
			result_map.put("result", "fail");
		}
		return result_map; // 리액트로 넘길 결과데이터
	}

}
