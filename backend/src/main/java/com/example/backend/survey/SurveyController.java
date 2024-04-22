package com.example.backend.survey;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SurveyController {
	@Autowired
	SurveyDAO surveyDao;

	@RequestMapping("/survey/view/{survey_idx}")
	public Map<String, Object> view(@PathVariable(name = "survey_idx") int survey_idx) {
		return surveyDao.view(survey_idx);
	}

	@RequestMapping("/survey/insert")
	public void insert(@RequestParam Map<String, Object> map) {
		System.out.println(map);
		surveyDao.insert(map);
	}

	@RequestMapping("/survey/summary/{survey_idx}")
	public List<Map<String, Object>> summary(@PathVariable(name = "survey_idx") int survey_idx) {
		return surveyDao.summary(survey_idx);
	}

}
