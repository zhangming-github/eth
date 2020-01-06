package com.jinhua.eth.model.test;

//import org.web3j.protocol.Web3j;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.admin.Admin;
import org.web3j.protocol.admin.methods.response.PersonalListAccounts;
import org.web3j.protocol.http.HttpService;
import org.web3j.protocol.rx.Web3jRx;


public class Web3JClient {
    private static String ip = "http://192.168.101.239:8545";

    private Web3JClient(){}

    private volatile static Web3j web3j;
    private  volatile  static Admin admin;

    public static Web3j getClient(){
        if(web3j==null){
            synchronized (Web3JClient.class){
                if(web3j==null){
                    web3j = Web3j.build(new HttpService(ip));
                }
            }
        }
        return web3j;
    }

    public static Admin getAdmin(){
        if(admin==null){
            synchronized (Web3JClient.class){
                if(admin==null){
                    admin = Admin.build(new HttpService(ip));
                }
            }
        }
        return admin;
    }
}
