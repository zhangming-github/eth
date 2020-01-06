package com.jinhua.eth.model.ethapi.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jinhua.eth.model.core.BaseController;
@RequestMapping("/number")
@RestController 
public class NumberController extends BaseController {
   @GetMapping("/blockNumber")
   public ResponseEntity<?> getBlockNumber(){
	   return new ResponseEntity<Integer>(ethApiService.getLockNumebr(),HttpStatus.OK);
   }
}
