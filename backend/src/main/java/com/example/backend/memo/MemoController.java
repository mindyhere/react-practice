package com.example.backend.memo;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MemoController {
	@Autowired
	MemoDAO memoDao;

	@RequestMapping("/memo")
	public List<Map<String, Object>> list(@RequestParam(name = "memo", defaultValue = "") String memo) {
//	defaultValue = "" 생략 시 에러발생
		System.out.println("list...");
		return memoDao.list(memo);
	}

	@RequestMapping("/memo/insert")
	public void insert(@RequestParam Map<String, Object> map) {
		memoDao.insert(map);
	}

	@RequestMapping("/memo/detail/{idx}")
	public Map<String, Object> detail(@PathVariable(name = "idx") int idx) {
		return memoDao.detail(idx);
	}

	@RequestMapping("/memo/update")
	public void update(@RequestParam Map<String, Object> map) {
		memoDao.update(map);
	}

	@RequestMapping("/memo/delete")
	public void delete(@RequestParam(name = "idx") int idx) {
		memoDao.delete(idx);
	}
}
