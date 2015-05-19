package com.ntu.igts.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Service;

import com.ntu.igts.constants.Constants;
import com.ntu.igts.model.container.CustomModuleList;
import com.ntu.igts.model.container.HotList;
import com.ntu.igts.model.container.SliceList;
import com.ntu.igts.service.HomePageServcie;
import com.ntu.igts.utils.InvocationUtil;
import com.ntu.igts.utils.JsonUtil;

@Service
public class HomePageServcieImpl implements HomePageServcie {

    @Override
    public HotList getAllHotCommodities(String token) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        String response = InvocationUtil.sendGetRequest(Constants.URL_HOT_DETAIL, header, MediaType.APPLICATION_JSON);
        return JsonUtil.getPojoFromJsonString(response, HotList.class);
    }

    @Override
    public CustomModuleList getAllCustomModules(String token) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        String response = InvocationUtil.sendGetRequest(Constants.URL_CUSTOM_MODULE_DETAIL, header,
                        MediaType.APPLICATION_JSON);
        return JsonUtil.getPojoFromJsonString(response, CustomModuleList.class);
    }

    @Override
    public SliceList getAllSlices(String token) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        String response = InvocationUtil.sendGetRequest(Constants.URL_SLICE_DETAIL, header, MediaType.APPLICATION_JSON);
        return JsonUtil.getPojoFromJsonString(response, SliceList.class);
    }

}
