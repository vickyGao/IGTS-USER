package com.ntu.igts.service;

import java.util.List;


import com.ntu.igts.model.Favorite;
import com.ntu.igts.model.container.Pagination;

public interface FavoriteService {

    public Favorite createFavorite(String token, Favorite favorite);

    public Favorite updateFavorite(String token, Favorite favorite);

    public boolean deleteFavorite(String token, String favoriteId);

    public Favorite getFavoriteById(String token, String favoriteId);

    public List<Favorite> getFavoriteByUserId(String token);

    public Pagination<Favorite> getPaginatedFavoritesByUserId(String token, int currentPage, int pageSize);
}
