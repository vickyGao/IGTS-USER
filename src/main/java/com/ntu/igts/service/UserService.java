package com.ntu.igts.service;

import com.ntu.igts.model.User;

public interface UserService {

    public User create(String token, User user);

    public User getUserByToken(String token);

    public User GetDetailById(String token, String userId);

    public User updatePassword(String token, User user) ;
}
