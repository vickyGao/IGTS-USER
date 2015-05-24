package com.ntu.igts.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Service;

import com.ntu.igts.constants.Constants;
import com.ntu.igts.model.User;
import com.ntu.igts.model.container.Asset;
import com.ntu.igts.service.UserService;
import com.ntu.igts.utils.InvocationUtil;
import com.ntu.igts.utils.JsonUtil;

@Service
public class UserServiceImpl implements UserService {

    @Override
    public User getUserByToken(String token) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        String response = InvocationUtil.sendGetRequest(Constants.URL_USER_GET_BY_TOKEN, header,
                        MediaType.APPLICATION_JSON);
        return JsonUtil.getPojoFromJsonString(response, User.class);
    }

    @Override
    public User GetDetailById(String token, String userId) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        String path = Constants.URL_USER_DETAIL + "/" + userId;
        String response = InvocationUtil.sendGetRequest(path, header, MediaType.APPLICATION_JSON);
        return JsonUtil.getPojoFromJsonString(response, User.class);
    }

    @Override
    public User updatePassword(String token, User user) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        String putBody = JsonUtil.getJsonStringFromPojo(user);
        String response = InvocationUtil.sendPutRequest(Constants.URL_USER_ENTITY, header, MediaType.APPLICATION_JSON,
                        putBody, MediaType.APPLICATION_JSON);
        return JsonUtil.getPojoFromJsonString(response, User.class);
    }

    @Override
    public User create(String token, User user) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        String postBody = JsonUtil.getJsonStringFromPojo(user);
        String response = InvocationUtil.sendPostRequest(Constants.URL_USER_ENTITY, header, MediaType.APPLICATION_JSON,
                        postBody, MediaType.APPLICATION_JSON);
        return JsonUtil.getPojoFromJsonString(response, User.class);
    }

    @Override
    public User updateDetail(String token, User user) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        String putBody = JsonUtil.getJsonStringFromPojo(user);
        String response = InvocationUtil.sendPutRequest(Constants.URL_USER_DETAIL, header, MediaType.APPLICATION_JSON,
                        putBody, MediaType.APPLICATION_JSON);
        return JsonUtil.getPojoFromJsonString(response, User.class);
    }

    @Override
    public Asset getForAsset(String token) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        String response = InvocationUtil.sendGetRequest(Constants.URL_USER_GET_FOR_ASSET, header,
                        MediaType.APPLICATION_JSON);
        return JsonUtil.getPojoFromJsonString(response, Asset.class);
    }

}
