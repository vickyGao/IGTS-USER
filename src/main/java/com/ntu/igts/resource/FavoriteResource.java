package com.ntu.igts.resource;

import javax.annotation.Resource;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.springframework.stereotype.Component;

import com.ntu.igts.constants.Constants;
import com.ntu.igts.model.Favorite;
import com.ntu.igts.model.container.Pagination;
import com.ntu.igts.service.FavoriteService;
import com.ntu.igts.utils.JsonUtil;

@Component
@Path("favorite")
public class FavoriteResource {

    @Resource
    private FavoriteService favoriteService;

    @POST
    @Path("entity")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String create(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token, String inString) {
        // TODO: add create validator
        Favorite favorite = JsonUtil.getPojoFromJsonString(inString, Favorite.class);
        Favorite createdFavorite = favoriteService.createFavorite(token, favorite);
        return JsonUtil.getJsonStringFromPojo(createdFavorite);
    }

    @DELETE
    @Path("entity/{favoriteid}")
    @Produces(MediaType.TEXT_PLAIN)
    public void delete(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token,
                    @PathParam("favoriteid") String favoriteId) {
        favoriteService.deleteFavorite(token, favoriteId);
    }

    @GET
    @Path("detail")
    @Produces(MediaType.APPLICATION_JSON)
    public String getFavoritesForUser(@HeaderParam(Constants.HEADER_X_AUTH_HEADER) String token,
                    @QueryParam("page") int currentPage, @QueryParam("size") int pageSize) {
        Pagination<Favorite> pagination = favoriteService.getPaginatedFavoritesByUserId(token, currentPage, pageSize);
        return JsonUtil.getJsonStringFromPojo(pagination);
    }
}
