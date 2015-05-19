package com.ntu.igts.resource;

import javax.annotation.Resource;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Component;

import com.ntu.igts.constants.Constants;
import com.ntu.igts.model.container.CustomModuleList;
import com.ntu.igts.model.container.HotList;
import com.ntu.igts.model.container.SliceList;
import com.ntu.igts.service.HomePageServcie;
import com.ntu.igts.utils.JsonUtil;

@Component
@Path("home")
public class HomePageResource {

    @Resource
    private HomePageServcie homePageServcie;

    @GET
    @Path("slice/detail")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllSlices(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token) {
        SliceList sliceList = homePageServcie.getAllSlices(token);
        return JsonUtil.getJsonStringFromPojo(sliceList);
    }

    @GET
    @Path("hot/detail")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAllHotCommodities(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token) {
        HotList hotList = homePageServcie.getAllHotCommodities(token);
        return JsonUtil.getJsonStringFromPojo(hotList);
    }

    @GET
    @Path("custommodule/detail")
    @Produces(MediaType.APPLICATION_JSON)
    public String getSlices(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token) {
        CustomModuleList customModuleList = homePageServcie.getAllCustomModules(token);
        return JsonUtil.getJsonStringFromPojo(customModuleList);
    }
}
