package com.example.backend.memo;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MemoDAO {

	@Autowired
	SqlSession sqlSession;

	public List<Map<String, Object>> list(String memo) {
		return sqlSession.selectList("memo.list", "%" + memo + "%");
	}

	public void insert(Map<String, Object> map) {
		sqlSession.insert("memo.insert", map);
	}

	public Map<String, Object> detail(int idx) {
		return sqlSession.selectOne("memo.detail", idx);
	}

	public void update(Map<String, Object> map) {
		sqlSession.update("memo.update", map);
	}

	public void delete(int idx) {
		sqlSession.delete("memo.delete", idx);
	}
}
