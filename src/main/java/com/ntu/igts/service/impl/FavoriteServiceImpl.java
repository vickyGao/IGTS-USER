package com.ntu.igts.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Service;

import com.ntu.igts.constants.Constants;
import com.ntu.igts.model.Favorite;
import com.ntu.igts.model.container.Pagination;
import com.ntu.igts.service.FavoriteService;
import com.ntu.igts.utils.ConfigManagmentUtil;
import com.ntu.igts.utils.InvocationUtil;
import com.ntu.igts.utils.JsonUtil;

@Service
public class FavoriteServiceImpl implements FavoriteService {

    @Override
    public Favorite createFavorite(String token, Favorite favorite) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        String postBody = JsonUtil.getJsonStringFromPojo(favorite);
        String response = InvocationUtil.sendPostRequest(Constants.URL_FAVORITE_ENTITY, header, MediaType.APPLICATION_JSON,
                        postBody, MediaType.APPLICATION_JSON);
        return JsonUtil.getPojoFromJsonString(response, Favorite.class);
    }

    @Override
    public Favorite updateFavorite(String token, Favorite favorite) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void deleteFavorite(String token, String favoriteId) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        String path = Constants.URL_FAVORITE_ENTITY + "/" + favoriteId;
        InvocationUtil.sendDeleteRequest(path, header, MediaType.TEXT_PLAIN);
    }

    @Override
    public Favorite getFavoriteById(String token, String favoriteId) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<Favorite> getFavoriteByUserId(String token) {
        // TODO Auto-generated method stub
        return null;
    }

    @SuppressWarnings("unchecked")
    @Override
    public Pagination<Favorite> getPaginatedFavoritesByUserId(String token, int currentPage, int pageSize) {
        Map<String, String> header = new HashMap<String, String>();
        header.put(Constants.HEADER_X_AUTH_HEADER, token);
        Map<String, String> queryParams = new HashMap<String, String>();
        queryParams.put(Constants.PAGE, String.valueOf(currentPage));
        if (pageSize > 0) {
            queryParams.put(Constants.SIZE, String.valueOf(pageSize));
        } else {
            queryParams.put(Constants.SIZE, ConfigManagmentUtil.getConfigProperties(Constants.DEFAULT_PAGINATION_SIZE));
        }
        String response = InvocationUtil.sendGetRequest(Constants.URL_FAVORITE_DETAIL, header,
                        MediaType.APPLICATION_JSON, queryParams);
        return JsonUtil.getPojoFromJsonString(response, Pagination.class);
    }}
