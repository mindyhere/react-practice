package com.example.backend.survey;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class SurveyDAO {
	@Autowired
	SqlSession sqlSession;

	public Map<String, Object> view(int survey_idx) {
		return sqlSession.selectOne("survey.view", survey_idx);
	}

	public void insert(Map<String, Object> map) {
		sqlSession.insert("survey.insert", map);
	}

	public List<Map<String, Object>> summary(int survey_idx) {
		return sqlSession.selectList("survey.summary", survey_idx);
	}
}
