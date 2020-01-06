package com.jinhua.eth.model.test;


import org.web3j.protocol.Web3j;
import org.web3j.protocol.admin.Admin;
import org.web3j.protocol.admin.methods.response.NewAccountIdentifier;
import org.web3j.protocol.admin.methods.response.PersonalListAccounts;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.DefaultBlockParameterNumber;
import org.web3j.protocol.core.Request;
import org.web3j.protocol.core.methods.response.EthGetBalance;

import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Account {
    private static Web3j web3j = Web3JClient.getClient();
    private static Admin admin = Web3JClient.getAdmin();
    public List<String> getAccountlist(){

        try{
//            return  admin.personalListAccounts().send().getAccountIds();
            Request<?, PersonalListAccounts> req= admin.personalListAccounts();
            System.out.println("getAccountlist req:"+req);
            PersonalListAccounts  pla=req.send();
            System.out.println("getAccountlist pla:"+pla);
            List<String> list= pla.getAccountIds();
            System.out.println("getAccountlist list:"+list);
            return list;
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }

    public String createAccount(String password){
        try {
            NewAccountIdentifier newAccountIdentifier = admin.personalNewAccount(password).send();
            if(newAccountIdentifier!=null){
                String accountId = newAccountIdentifier.getAccountId();
//                admin.personalSetAccountName(accountId,accountName);
//                admin.
//
//                Map<String,Object> account = new HashMap<String,Object>();
//                account.put(accountId,accountInfo);
//                parity.personalSetAccountMeta(accountId,account);account

                return  accountId;
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

//    public PersonalAccountsInfo.AccountsInfo getAccountInfo(String accountId){
//
//        try{
//            PersonalAccountsInfo personalAccountsInfo = parity.personalAccountsInfo().send();
//
//            return  personalAccountsInfo.getAccountsInfo().get(accountId);
//        }catch (Exception e){
//            e.printStackTrace();
//        }
//        return null;
//    }

    public BigInteger getBalance(String accountId){
        try {
            DefaultBlockParameter defaultBlockParameter = new DefaultBlockParameterNumber(web3j.ethBlockNumber().send().getBlockNumber());
            EthGetBalance ethGetBalance =  web3j.ethGetBalance(accountId,defaultBlockParameter).send();
            if(ethGetBalance!=null){
                return ethGetBalance.getBalance();
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return null;
    }
}
