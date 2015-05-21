package com.ntu.igts.resource;

import javax.annotation.Resource;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Component;

import com.ntu.igts.constants.Constants;
import com.ntu.igts.model.Bill;
import com.ntu.igts.model.container.Pagination;
import com.ntu.igts.service.BillService;
import com.ntu.igts.utils.JsonUtil;

@Component
@Path("bill")
public class BillResource {

    @Resource
    private BillService billService;

    @DELETE
    @Path("entity/{billid}")
    @Produces(MediaType.TEXT_PLAIN)
    public void delete(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token, @PathParam("billid") String billId) {
        billService.delete(token, billId);
    }

    @GET
    @Path("entity")
    @Produces(MediaType.APPLICATION_JSON)
    public String getBillsForUser(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token,
                    @QueryParam("page") int currentPage, @QueryParam("size") int pageSize) {
        Pagination<Bill> pagination = billService.getPaginatedBillsByUserId(token, currentPage, pageSize);
        return JsonUtil.getJsonStringFromPojo(pagination);
    }
}
