package com.ntu.igts.service.impl;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Service;

import com.ntu.igts.constants.Constants;
import com.ntu.igts.model.Bill;
import com.ntu.igts.model.container.Pagination;
import com.ntu.igts.service.BillService;
import com.ntu.igts.utils.ConfigManagmentUtil;
import com.ntu.igts.utils.InvocationUtil;
import com.ntu.igts.utils.JsonUtil;

@Service
public class BillServiceImpl implements BillService {

    @Override
    public void delete(String token, String billId) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        String path = Constants.URL_BILL_ENTITY + "/" + billId;
        InvocationUtil.sendDeleteRequest(path, header, MediaType.TEXT_PLAIN);
    }

    @Override
    public Bill getById(String token, String billId) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        String path = Constants.URL_BILL_ENTITY + "/" + billId;
        String response = InvocationUtil.sendGetRequest(path, header, MediaType.APPLICATION_JSON);
        return JsonUtil.getPojoFromJsonString(response, Bill.class);
    }

    @SuppressWarnings("unchecked")
    @Override
    public Pagination<Bill> getPaginatedBillsByUserId(String token, int currentPage, int pageSize) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        Map<String, String> queryParams = new HashMap<String, String>();
        queryParams.put(Constants.PAGE, String.valueOf(currentPage));
        if (pageSize > 0) {
            queryParams.put(Constants.SIZE, String.valueOf(pageSize));
        } else {
            queryParams.put(Constants.SIZE, ConfigManagmentUtil.getConfigProperties(Constants.DEFAULT_PAGINATION_SIZE));
        }
        String response = InvocationUtil.sendGetRequest(Constants.URL_BILL_ENTITY, header,
                        MediaType.APPLICATION_JSON, queryParams);
        return JsonUtil.getPojoFromJsonString(response, Pagination.class);
    }}
