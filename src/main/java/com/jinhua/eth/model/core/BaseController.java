package com.jinhua.eth.model.core;

import org.springframework.beans.factory.annotation.Autowired;

import com.jinhua.eth.model.ethapi.service.EthApiService;

public abstract class BaseController {
	@Autowired
	protected EthApiService ethApiService;
}
