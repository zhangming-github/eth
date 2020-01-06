package com.jinhua.eth.model.ethapi.service;

import org.springframework.stereotype.Component;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.Request;
import org.web3j.protocol.core.methods.response.EthBlockNumber;
import org.web3j.protocol.core.methods.response.Web3ClientVersion;
import org.web3j.protocol.http.HttpService;

import java.io.IOException;

@Component
public class EthApiServiceImpl  implements EthApiService{

    public int getLockNumebr(){
        Web3j web3 = Web3j.build(new HttpService("http://192.168.101.240:8545"));  // defaults to http://localhost:8545/
        Web3ClientVersion web3ClientVersion = null;
        try {
            web3ClientVersion = web3.web3ClientVersion().send();
            String clientVersion = web3ClientVersion.getWeb3ClientVersion();
            System.out.println(clientVersion);

            Request<?, EthBlockNumber> number= web3.ethBlockNumber();
            EthBlockNumber ethblocknumber= number.send();
            String numberstr=ethblocknumber.getBlockNumber().toString();
            int lockNumber=Integer.parseInt(numberstr);
            return lockNumber;
            //System.out.println(numberstr);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return 0;
    }
}
