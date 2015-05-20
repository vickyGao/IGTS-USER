package com.ntu.igts.resource;

import java.util.List;

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
import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Component;

import com.ntu.igts.constants.Constants;
import com.ntu.igts.model.Address;
import com.ntu.igts.service.AddressService;
import com.ntu.igts.utils.JsonUtil;
import com.ntu.igts.validator.AddressValidator;

@Component
@Path("address")
public class AddressResource {

    @Resource
    private AddressService addressService;
    @Resource
    private AddressValidator addressValidator;

    @POST
    @Path("entity")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String create(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token, String inString) {
        addressValidator.validateCreate(inString);
        Address address = JsonUtil.getPojoFromJsonString(inString, Address.class);
        Address createdAddress = addressService.create(token, address);
        return JsonUtil.getJsonStringFromPojo(createdAddress);
    }

    @PUT
    @Path("entity")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String udpate(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token, String inString) {
        return null;
    }

    @DELETE
    @Path("entity/{addressid}")
    @Produces(MediaType.TEXT_PLAIN)
    public void delete(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token,
                    @PathParam("addressid") String addressId) {
        addressService.delete(token, addressId);
    }

    @GET
    @Path("entity/{addressid}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAddressById(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token,
                    @PathParam("addressid") String addressId) {
        Address returnAddress = addressService.getById(token, addressId);
        return JsonUtil.getJsonStringFromPojo(returnAddress);
    }

    @GET
    @Path("entity")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAddressesForUser(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token) {
        List<Address> addressList = addressService.getByUserId(token);
        return JsonUtil.getJsonStringFromPojo(addressList);
    }
}
