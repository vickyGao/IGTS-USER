package com.ntu.igts.resource;

import javax.annotation.Resource;
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
import com.ntu.igts.enums.IndentStatusEnum;
import com.ntu.igts.enums.PayTypeEnum;
import com.ntu.igts.model.Indent;
import com.ntu.igts.model.container.Pagination;
import com.ntu.igts.service.IndentService;
import com.ntu.igts.utils.JsonUtil;
import com.ntu.igts.validator.IndentValidator;

@Component
@Path("indent")
public class IndentResource {

    @Resource
    private IndentService indentService;
    @Resource
    private IndentValidator indentValidator;

    /**
     * Create Indent, necessary fields are (indentaddress, phonenumber, indentmessage)
     * 
     * @param token
     *            The x-auth-token
     * @param commodityId
     *            The id of Commodity
     * @param inString
     *            The post body
     * @return The created Indent
     */
    @POST
    @Path("entity/{commodityId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String create(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token,
                    @PathParam("commodityId") String commodityId, String inString) {
        indentValidator.validateCreate(inString);
        Indent indent = JsonUtil.getPojoFromJsonString(inString, Indent.class);
        Indent createdIndent = indentService.createIndent(token, indent, commodityId);
        return JsonUtil.getJsonStringFromPojo(createdIndent);
    }

    /**
     * Update the indent's status, if the operation is to update the status to PAID, will set pay type together
     * 
     * @param token
     *            The x-auth-token
     * @param inString
     *            The put body
     * @return The updated Indent
     */
    @PUT
    @Path("entity/{status}/{indentId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String update(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token,
                    @PathParam("status") IndentStatusEnum statusEnum, @PathParam("indentId") String indentId,
                    @QueryParam("paytype") PayTypeEnum payTypeEnum) {
        indentValidator.validateUpdate(statusEnum);// TODO:need check the status
        Indent updatedIndent = indentService.updateIndent(token, statusEnum, indentId, payTypeEnum);
        return JsonUtil.getJsonStringFromPojo(updatedIndent);
    }

    @PUT
    @Path("price")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String updateIndentPrice(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token, String inString) {
        return null;
    }

    @PUT
    @Path("paytype")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String updatePayType(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token, String inString) {
        return null;
    }

    @PUT
    @Path("status")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String updateIndentStatus(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token, String inString) {
        return null;
    }

    @DELETE
    @Path("entity/{indentid}")
    @Produces(MediaType.TEXT_PLAIN)
    public String deleteIndent(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token,
                    @PathParam("indentid") String indentId) {
        return null;
    }

    @GET
    @Path("entity/{indentid}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getIndentById(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token,
                    @PathParam("indentid") String indentId) {
        Indent indent = indentService.getIndentById(token, indentId);
        return JsonUtil.getJsonStringFromPojo(indent);
    }

    @GET
    @Path("entity")
    @Produces(MediaType.APPLICATION_JSON)
    public String getIndentsForUser(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token,
                    @QueryParam("page") int currentPage, @QueryParam("size") int pageSize) {
        Pagination<Indent> pagination = indentService.getPaginatedIndentByUserId(token, currentPage, pageSize);
        return JsonUtil.getJsonStringFromPojo(pagination);
    }

    @GET
    @Path("entity/seller")
    @Produces(MediaType.APPLICATION_JSON)
    public String getIndentsForSeller(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token,
                    @QueryParam("page") int currentPage, @QueryParam("size") int pageSize) {
        Pagination<Indent> pagination = indentService.getPaginatedIndentBySellerId(token, currentPage, pageSize);
        return JsonUtil.getJsonStringFromPojo(pagination);
    }
}
