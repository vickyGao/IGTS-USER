package com.ntu.igts.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Service;

import com.ntu.igts.constants.Constants;
import com.ntu.igts.model.Address;
import com.ntu.igts.model.container.AddressList;
import com.ntu.igts.service.AddressService;
import com.ntu.igts.utils.InvocationUtil;
import com.ntu.igts.utils.JsonUtil;

@Service
public class AddressServiceImpl implements AddressService {

    @Override
    public Address create(String token, Address address) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        String postBody = JsonUtil.getJsonStringFromPojo(address);
        String response = InvocationUtil.sendPostRequest(Constants.URL_ADDRESS_ENTITY, header,
                        MediaType.APPLICATION_JSON, postBody, MediaType.APPLICATION_JSON);
        return JsonUtil.getPojoFromJsonString(response, Address.class);
    }

    @Override
    public Address update(String token, Address address) {
        return null;
    }

    @Override
    public void delete(String token, String addressId) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        String path = Constants.URL_ADDRESS_ENTITY + "/" + addressId;
        InvocationUtil.sendDeleteRequest(path, header, MediaType.TEXT_PLAIN);
    }

    @Override
    public Address getById(String token, String addressId) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        String path = Constants.URL_ADDRESS_ENTITY + "/" + addressId;
        String response = InvocationUtil.sendGetRequest(path, header, MediaType.APPLICATION_JSON);
        return JsonUtil.getPojoFromJsonString(response, Address.class);
    }

    @Override
    public List<Address> getByUserId(String token) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        String response = InvocationUtil.sendGetRequest(Constants.URL_ADDRESS_ENTITY, header,
                        MediaType.APPLICATION_JSON);
        return JsonUtil.getPojoFromJsonString(response, AddressList.class);
    }

}
