package com.ntu.igts.resource;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.ws.rs.Consumes;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import net.sf.json.JSONArray;
import net.sf.json.JSONNull;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;

import com.ntu.igts.constants.Constants;
import com.ntu.igts.model.Cover;
import com.ntu.igts.model.container.CoverList;
import com.ntu.igts.service.CoverService;
import com.ntu.igts.utils.JsonUtil;
import com.ntu.igts.validator.CoverValidator;

@Component
@Path("cover")
public class CoverResource {

    @Resource
    private CoverService coverService;
    @Resource
    private CoverValidator coverValidator;

    @POST
    @Path("entity/{commodityid}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String createCover(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token,
                    @PathParam("commodityid") String commodityId, String inString) {
        coverValidator.validateCreate(commodityId, inString);
        List<Cover> createdCovers = new ArrayList<Cover>();
        JSONArray imageArray = JSONObject.fromObject(inString).optJSONArray(Constants.IMAGES);
        JSONNull jsonNull = JSONNull.getInstance();
        if (!jsonNull.equals(imageArray)) {
            boolean isFirstImage = true;
            for (Object imageObject : imageArray) {
                JSONObject imageJsonObject = JSONObject.fromObject(imageObject);
                Cover cover = new Cover();
                if (isFirstImage) {
                    cover.setMainCoverYN(Constants.YES);
                    isFirstImage = false;
                } else {
                    cover.setMainCoverYN(Constants.NO);
                }
                cover.setCommodityId(commodityId);
                cover.setImageId(imageJsonObject.optString(Constants.ID));
                Cover createdCover = coverService.create(token, cover);
                createdCovers.add(createdCover);
            }
        }

        return JsonUtil.getJsonStringFromPojo(new CoverList(createdCovers));
    }
}
