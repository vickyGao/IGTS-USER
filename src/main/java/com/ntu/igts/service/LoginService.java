package com.ntu.igts.service;

import com.ntu.igts.model.SessionContext;
import com.ntu.igts.model.User;

public interface LoginService {

    public SessionContext login(User user);
}
