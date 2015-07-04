package com.ntu.igts.resource;

import javax.annotation.Resource;
import javax.ws.rs.BeanParam;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Component;

import com.ntu.igts.constants.Constants;
import com.ntu.igts.enums.ActiveStateEnum;
import com.ntu.igts.enums.OrderByEnum;
import com.ntu.igts.enums.SortByEnum;
import com.ntu.igts.model.Commodity;
import com.ntu.igts.model.container.CommodityQueryResult;
import com.ntu.igts.model.container.Pagination;
import com.ntu.igts.model.container.Query;
import com.ntu.igts.service.CommodityService;
import com.ntu.igts.utils.JsonUtil;
import com.ntu.igts.validator.CommodityValidator;

@Component
@Path("commodity")
public class CommodityResource {

    @Resource
    private CommodityService commodityService;
    @Resource
    private CommodityValidator commodityValidator;

    @GET
    @Path("detail/{commodityid}")
    public String getCommodityById(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token,
                    @PathParam("commodityid") String commodityId) {
        Commodity returnCommodity = commodityService.getCommodityById(token, commodityId);
        return JsonUtil.getJsonStringFromPojo(returnCommodity);
    }

    @GET
    @Path("search_term")
    @Produces(MediaType.APPLICATION_JSON)
    public String getCommoditiesBySearchTerm(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token,
                    @BeanParam Query query) {
        if (query != null) {
            if (query.getActiveYN() != null) {
                query.setActiveYN(null);
            }
            if (query.getSortBy() == null) {
                query.setSortBy(SortByEnum.LAST_UPDATED_TIME);
            }
            if (query.getOrderBy() == null) {
                query.setOrderBy(OrderByEnum.DESC);
            }
        }

        CommodityQueryResult commodityQueryResult = commodityService.getCommoditiesBySearchTerm(token, query);
        return JsonUtil.getJsonStringFromPojo(commodityQueryResult);
    }

    @POST
    @Path("entity")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String createCommodity(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token, String inString) {
        commodityValidator.validateCreate(inString);
        Commodity commodity = JsonUtil.getPojoFromJsonString(inString, Commodity.class);
        Commodity createdCommodity = commodityService.createCommodity(token, commodity);
        return JsonUtil.getJsonStringFromPojo(createdCommodity);
    }

    @GET
    @Path("detail")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllCommodititesForUser(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token,
                    @QueryParam("page") int currentPage, @QueryParam("size") int pageSize,
                    @QueryParam("activestate") ActiveStateEnum activeState) {
        Pagination<Commodity> pagination = commodityService.getAllCommodititesForUser(token, currentPage, pageSize,
                        activeState);
        return JsonUtil.getJsonStringFromPojo(pagination);
    }

    @PUT
    @Path("activestate/{requeststate}/{commodityid}")
    @Produces(MediaType.APPLICATION_JSON)
    public String updateCommodityActiveState(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token,
                    @PathParam("requeststate") ActiveStateEnum requestActiveState,
                    @PathParam("commodityid") String commodityId) {
        // TODO: add the validator
        Commodity updatedCommodity = commodityService
                        .updateCommodityActiveState(token, requestActiveState, commodityId);
        return JsonUtil.getJsonStringFromPojo(updatedCommodity);
    }

    @DELETE
    @Path("entity/{commodityid}")
    @Produces(MediaType.TEXT_PLAIN)
    public void deleteIndent(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token,
                    @PathParam("commodityid") String commodityid) {
        commodityService.deleteCommodity(token, commodityid);
    }
}
