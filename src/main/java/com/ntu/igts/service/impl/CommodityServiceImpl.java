package com.ntu.igts.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Service;

import com.ntu.igts.constants.Constants;
import com.ntu.igts.enums.ActiveStateEnum;
import com.ntu.igts.model.Commodity;
import com.ntu.igts.model.container.CommodityQueryResult;
import com.ntu.igts.model.container.Pagination;
import com.ntu.igts.model.container.Query;
import com.ntu.igts.service.CommodityService;
import com.ntu.igts.utils.ConfigManagmentUtil;
import com.ntu.igts.utils.InvocationUtil;
import com.ntu.igts.utils.JsonUtil;
import com.ntu.igts.utils.StringUtil;

@Service
public class CommodityServiceImpl implements CommodityService {

    @Override
    public Commodity getCommodityById(String token, String commodityId) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        String path = Constants.URL_COMMODITY_DETAIL + "/" + commodityId;
        String response = InvocationUtil.sendGetRequest(path, header, MediaType.APPLICATION_JSON);
        return JsonUtil.getPojoFromJsonString(response, Commodity.class);
    }

    @Override
    public CommodityQueryResult getCommoditiesBySearchTerm(String token, Query query) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        Map<String, String> queryParams = new HashMap<String, String>();
        if (!StringUtil.isEmpty(query.getSearchTerm())) {
            queryParams.put(Constants.SEARCH_TERM, query.getSearchTerm());
        }
        if (!StringUtil.isEmpty(query.getDistrict())) {
            queryParams.put(Constants.DISTRICT, query.getDistrict());
        }
        if (query.getStartPrice() > 0) {
            queryParams.put(Constants.START_PRICE, String.valueOf(query.getStartPrice()));
        }
        if (query.getEndPrice() > 0) {
            queryParams.put(Constants.END_PRICE, String.valueOf(query.getEndPrice()));
        }
        if (query.getStatus() != null) {
            queryParams.put(Constants.STATUS, query.getStatus().name());
        }
        if (!StringUtil.isEmpty(query.getTagId())) {
            queryParams.put(Constants.TAG_ID, query.getTagId());
        }
        if (query.getOrderBy() != null) {
            queryParams.put(Constants.ORDERBY, query.getOrderBy().name());
        }
        if (query.getSortBy() != null) {
            queryParams.put(Constants.SORTBY, query.getSortBy().name());
        }
        if (query.getPage() > 0) {
            queryParams.put(Constants.PAGE, String.valueOf(query.getPage()));
        }
        if (query.getSize() > 0) {
            queryParams.put(Constants.SIZE, String.valueOf(query.getSize()));
        } else {
            queryParams.put(Constants.SIZE, ConfigManagmentUtil.getConfigProperties(Constants.DEFAULT_PAGINATION_SIZE));
        }
        queryParams.put(Constants.ACTIVE_YN, ActiveStateEnum.ACTIVE.name());

        String response = InvocationUtil.sendGetRequest(Constants.URL_COMMODITY_SEARCH_TERM, header,
                        MediaType.APPLICATION_JSON, queryParams);
        return JsonUtil.getPojoFromJsonString(response, CommodityQueryResult.class);
    }

    @Override
    public Commodity createCommodity(String token, Commodity commodity) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        String postBody = JsonUtil.getJsonStringFromPojo(commodity);
        String response = InvocationUtil.sendPostRequest(Constants.URL_COMMODITY_ENTITY, header,
                        MediaType.APPLICATION_JSON, postBody, MediaType.APPLICATION_JSON);
        return JsonUtil.getPojoFromJsonString(response, Commodity.class);
    }

    @Override
    public Commodity updateCommodity(String token, Commodity commodity) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        String putBody = JsonUtil.getJsonStringFromPojo(commodity);
        String response = InvocationUtil.sendPutRequest(Constants.URL_COMMODITY_ENTITY, header,
                        MediaType.APPLICATION_JSON, putBody, MediaType.APPLICATION_JSON);
        return JsonUtil.getPojoFromJsonString(response, Commodity.class);
    }

    @Override
    public Commodity updateCommodityActiveState(String token, ActiveStateEnum activeState, String commodityId) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        String path = Constants.URL_COMMODITY_ACTIVE_SATATE + "/" + activeState.name() + "/" + commodityId;
        String response = InvocationUtil.sendPutRequest(path, header, MediaType.APPLICATION_JSON, StringUtil.EMPTY,
                        MediaType.APPLICATION_JSON);
        return JsonUtil.getPojoFromJsonString(response, Commodity.class);
    }

    @SuppressWarnings("unchecked")
    @Override
    public Pagination<Commodity> getAllCommodititesForUser(String token, int currentPage, int pageSize,
                    ActiveStateEnum activeState) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        Map<String, String> queryParams = new HashMap<String, String>();
        queryParams.put(Constants.PAGE, String.valueOf(currentPage));
        if (pageSize > 0) {
            queryParams.put(Constants.SIZE, String.valueOf(pageSize));
        } else {
            queryParams.put(Constants.SIZE, ConfigManagmentUtil.getConfigProperties(Constants.DEFAULT_PAGINATION_SIZE));
        }
        queryParams.put(Constants.ACTIVESTATE, activeState.name());
        String response = InvocationUtil.sendGetRequest(Constants.URL_COMMODITY_DETAIL, header,
                        MediaType.APPLICATION_JSON, queryParams);
        return JsonUtil.getPojoFromJsonString(response, Pagination.class);
    }

    @Override
    public void deleteCommodity(String token, String commodity) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        String path = Constants.URL_COMMODITY_ENTITY + "/" + commodity;
        InvocationUtil.sendDeleteRequest(path, header, MediaType.TEXT_PLAIN);
    }

}
