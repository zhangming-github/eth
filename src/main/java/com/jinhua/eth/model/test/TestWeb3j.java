package com.jinhua.eth.model.test;

import java.io.IOException;
import java.math.BigInteger;
import java.util.List;

import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.Request;
import org.web3j.protocol.core.methods.response.EthBlockNumber;
import org.web3j.protocol.core.methods.response.Web3ClientVersion;
import org.web3j.protocol.http.HttpService;
//com.jinhua.eth.model.test.TestWeb3j
public class TestWeb3j {

 
    public static void main(String args[]) throws IOException {
//        getBalance();
//    createAccount();
//        queryAccount();
//        getBalance();
//         Account account = new Account();
//        List<String> list= account.getAccountlist();
//        if(list==null){
//        	System.out.println("list==null,创建账户123456");
//        	createAccount();
//        }
//        list= account.getAccountlist();
//        System.out.println("再次查询 list=="+list);
        
        
        Web3j web3 = Web3j.build(new HttpService("http://192.168.101.236:8545"));  // defaults to http://localhost:8545/
        Web3ClientVersion web3ClientVersion = web3.web3ClientVersion().send();
        String clientVersion = web3ClientVersion.getWeb3ClientVersion();
        System.out.println(clientVersion);
        
       Request<?, EthBlockNumber> number= web3.ethBlockNumber();
       EthBlockNumber ethblocknumber= number.send();
       String numberstr=ethblocknumber.getBlockNumber().toString();
       System.out.println(numberstr);
        
    }

    public static void getBalance(){
        Account account = new Account();
        System.out.println("getBalance account:"+account);
        List<String> list=account.getAccountlist();
        System.out.println("getBalance list:"+list);
        if(list==null){
        	return ;
        }
        String accoundId = list.get(0);
        System.out.println("getBalance accountId:"+accoundId);
        BigInteger ba = account.getBalance(accoundId);

        System.out.print(ba);
        
        com.jinhua.eth.model.test.TestWeb3j t;
    }

    public static  void queryAccount(){
        Account account = new Account();
        List<String> accounts = account.getAccountlist();
        for(String accountId:accounts){
            System.out.println(accountId);
        }

    }

    public static void createAccount(){
        Account account = new Account();
        String accountId = account.createAccount("123456");
        System.out.println("注册账户成功:"+accountId);
//        PersonalAccountsInfo.AccountsInfo accountsInfo = account.getAccountInfo("0xad7bbca86e02e503076b06931e05938e51e49fb9");
//        System.out.println(accountsInfo.toString());
    }


}
