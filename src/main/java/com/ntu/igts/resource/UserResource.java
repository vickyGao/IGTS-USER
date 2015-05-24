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
import com.ntu.igts.model.container.Asset;
import com.ntu.igts.model.container.UpdatePasswordForm;
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
    @Path("entity")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String updatePassword(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token, String inString) {
        userValidator.validateUpdatePassword(inString);
        UpdatePasswordForm updatePassword = JsonUtil.getPojoFromJsonString(inString, UpdatePasswordForm.class);
        User toUpdateUser = userService.getUserByToken(token);
        toUpdateUser.setPassword(updatePassword.getPassword());
        toUpdateUser.setNewPassword(updatePassword.getPassword1());
        User updatedUser = userService.updatePassword(token, toUpdateUser);
        return JsonUtil.getJsonStringFromPojo(updatedUser);
    }

    @PUT
    @Path("detail")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String updateDetail(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token, String inString) {
        userValidator.validateUpdate(inString);
        User user = JsonUtil.getPojoFromJsonString(inString, User.class);
        checkUserAvailability(token, user.getId());
        User updatedUser = userService.updateDetail(token, user);
        return JsonUtil.getJsonStringFromPojo(updatedUser);
    }

    @GET
    @Path("asset")
    @Produces(MediaType.APPLICATION_JSON)
    public String getAssetByUserId(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token) {
        Asset returnAsset = userService.getForAsset(token);
        return JsonUtil.getJsonStringFromPojo(returnAsset);
    }

    private User checkUserAvailability(String token, String userId) {
        User existingUser = userService.GetDetailById(token, userId);
        if (existingUser == null) {
            String[] param = { userId };
            throw new ServiceWarningException("Cannot find user for id " + userId, MessageKeys.USER_NOT_FOUND_FOR_ID,
                            param);
        } else {
            return existingUser;
        }
    }

}
