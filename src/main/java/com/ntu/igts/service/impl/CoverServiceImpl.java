package com.ntu.igts.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Service;

import com.ntu.igts.constants.Constants;
import com.ntu.igts.model.Cover;
import com.ntu.igts.service.CoverService;
import com.ntu.igts.utils.InvocationUtil;
import com.ntu.igts.utils.JsonUtil;

@Service
public class CoverServiceImpl implements CoverService {

    @Override
    public Cover create(String token, Cover cover) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        String postBody = JsonUtil.getJsonStringFromPojo(cover);
        String response = InvocationUtil.sendPostRequest(Constants.URL_COVER_ENTITY, header,
                        MediaType.APPLICATION_JSON, postBody, MediaType.APPLICATION_JSON);
        return JsonUtil.getPojoFromJsonString(response, Cover.class);
    }

}
