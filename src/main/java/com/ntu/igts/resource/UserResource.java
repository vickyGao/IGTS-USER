package com.ntu.igts.resource;

import javax.annotation.Resource;
import javax.ws.rs.Consumes;
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
import com.ntu.igts.exception.ServiceWarningException;
import com.ntu.igts.i18n.MessageKeys;
import com.ntu.igts.model.User;
import com.ntu.igts.service.UserService;
import com.ntu.igts.utils.JsonUtil;
import com.ntu.igts.utils.StringUtil;
import com.ntu.igts.validator.UserValidator;

@Component
@Path("user")
public class UserResource {

    @Resource
    private UserService userService;
    @Resource
    private UserValidator userValidator;

    @POST
    @Path("entity")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String create(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token, String inString) {
        userValidator.validateCreate(inString);
        User User = JsonUtil.getPojoFromJsonString(inString, User.class);
        User createdUser = userService.create(token, User);
        return JsonUtil.getJsonStringFromPojo(createdUser);
    }

    @GET
    @Path("detail/{userid}")
    @Produces(MediaType.APPLICATION_JSON)
    public String getUserDetailById(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token,
                    @PathParam("userid") String userId) {
        User returnUser = userService.GetDetailById(token, userId);
        return JsonUtil.getJsonStringFromPojo(returnUser);
    }

    @GET
    @Path("detail/token")
    public String getUserDetailByToken(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token) {
        User returnUser = userService.getUserByToken(token);
        returnUser.setPassword(StringUtil.EMPTY);
        return JsonUtil.getJsonStringFromPojo(returnUser);
    }

    @PUT
    @Path("entity/{formoldpassword}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String updatePassword(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token, @PathParam("formoldpassword") String formOldPassword, String inString) {
        userValidator.validateUpdate(inString);
        User user = JsonUtil.getPojoFromJsonString(inString, User.class);
        User existingUser = checkUserAvailability(token, user.getId());
        userValidator.validateUpdatePassword(inString, existingUser.getPassword(), formOldPassword);
        User updatedUser = userService.updatePassword(token, user);
        return JsonUtil.getJsonStringFromPojo(updatedUser);
    }

    private User checkUserAvailability(String token, String userId) {
        User existingUser = userService.GetDetailById(token, userId);
        if (existingUser == null) {
            String[] param = { userId };
            throw new ServiceWarningException("Cannot find user for id " + userId, MessageKeys.USER_NOT_FOUND_FOR_ID, param);
        } else {
            return existingUser;
        }
    }

}
