package com.ntu.igts.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Service;

import com.ntu.igts.constants.Constants;
import com.ntu.igts.enums.IndentStatusEnum;
import com.ntu.igts.enums.PayTypeEnum;
import com.ntu.igts.model.Indent;
import com.ntu.igts.model.container.Pagination;
import com.ntu.igts.service.IndentService;
import com.ntu.igts.utils.ConfigManagmentUtil;
import com.ntu.igts.utils.InvocationUtil;
import com.ntu.igts.utils.JsonUtil;
import com.ntu.igts.utils.StringUtil;

@Service
public class IndentServiceImpl implements IndentService {

    @Override
    public Indent createIndent(String token, Indent indent, String commodityId) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        String postBody = JsonUtil.getJsonStringFromPojo(indent);
        String path = Constants.URL_INDENT_ENTITY + "/" + commodityId;
        String response = InvocationUtil.sendPostRequest(path, header, MediaType.APPLICATION_JSON, postBody,
                        MediaType.APPLICATION_JSON);
        return JsonUtil.getPojoFromJsonString(response, Indent.class);
    }

    @Override
    public Indent updateIndent(String token, IndentStatusEnum statusEnum, String indentId, PayTypeEnum payTypeEnum) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        // Map<String, String> payTypeParam = new HashMap<String, String>();
        if(payTypeEnum != null){
            header.put(Constants.PAYTYPE, payTypeEnum.name());
        }
        String path = Constants.URL_INDENT_ENTITY + "/" + statusEnum + "/" + indentId;
        String response = InvocationUtil.sendPutRequest(path, header, MediaType.APPLICATION_JSON, StringUtil.EMPTY,
                        MediaType.APPLICATION_JSON);
        return JsonUtil.getPojoFromJsonString(response, Indent.class);
    }

    @Override
    public boolean deleteIndent(String token, String indentId) {
        return false;
    }

    @Override
    public List<Indent> getIndentByUserId(String token, String userId) {
        return null;
    }

    @Override
    public Indent getIndentById(String token, String indentId) {
        return null;
    }

    @SuppressWarnings("unchecked")
    @Override
    public Pagination<Indent> getPaginatedIndentByUserId(String token, int currentPage, int pageSize) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        Map<String, String> queryParams = new HashMap<String, String>();
        queryParams.put(Constants.PAGE, String.valueOf(currentPage));
        if (pageSize > 0) {
            queryParams.put(Constants.SIZE, String.valueOf(pageSize));
        } else {
            queryParams.put(Constants.SIZE, ConfigManagmentUtil.getConfigProperties(Constants.DEFAULT_PAGINATION_SIZE));
        }
        String response = InvocationUtil.sendGetRequest(Constants.URL_INDENT_ENTITY, header,
                        MediaType.APPLICATION_JSON, queryParams);
        return JsonUtil.getPojoFromJsonString(response, Pagination.class);
    }

    @Override
    public Indent getIndentByCommodityId(String token, String commodityId) {
        return null;
    }

    @SuppressWarnings("unchecked")
    @Override
    public Pagination<Indent> getPaginatedIndentBySellerId(String token, int currentPage, int pageSize) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        Map<String, String> queryParams = new HashMap<String, String>();
        queryParams.put(Constants.PAGE, String.valueOf(currentPage));
        if (pageSize > 0) {
            queryParams.put(Constants.SIZE, String.valueOf(pageSize));
        } else {
            queryParams.put(Constants.SIZE, ConfigManagmentUtil.getConfigProperties(Constants.DEFAULT_PAGINATION_SIZE));
        }
        String response = InvocationUtil.sendGetRequest(Constants.URL_INDENT_ENTITY_SELLER, header,
                        MediaType.APPLICATION_JSON, queryParams);
        return JsonUtil.getPojoFromJsonString(response, Pagination.class);
    }

}
