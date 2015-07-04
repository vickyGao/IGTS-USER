package com.ntu.igts.service;

import com.ntu.igts.enums.ActiveStateEnum;
import com.ntu.igts.model.Commodity;
import com.ntu.igts.model.container.CommodityQueryResult;
import com.ntu.igts.model.container.Pagination;
import com.ntu.igts.model.container.Query;

public interface CommodityService {

    public Commodity getCommodityById(String token, String commodityId);

    public CommodityQueryResult getCommoditiesBySearchTerm(String token, Query query);

    public Commodity createCommodity(String token, Commodity commodity);

    public Commodity updateCommodity(String token, Commodity commodity);

    public Commodity updateCommodityActiveState(String token, ActiveStateEnum activeState, String commodityId);

    public Pagination<Commodity> getAllCommodititesForUser(String token, int currentPage, int pageSize,
                    ActiveStateEnum activeState);

    public void deleteCommodity(String token, String commodity);

}
