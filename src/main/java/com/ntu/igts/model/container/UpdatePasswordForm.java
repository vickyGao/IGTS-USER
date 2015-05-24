package com.ntu.igts.model.container;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonRootName;
import com.ntu.igts.model.BaseModel;

@JsonRootName("updatepassword")
public class UpdatePasswordForm extends BaseModel implements Serializable {

    private static final long serialVersionUID = 8991352547813175157L;

    @JsonProperty("password")
    private String password;
    @JsonProperty("password1")
    private String password1;
    @JsonProperty("password2")
    private String password2;

    public String getPassword1() {
        return password1;
    }

    public void setPassword1(String password1) {
        this.password1 = password1;
    }

    public String getPassword2() {
        return password2;
    }

    public void setPassword2(String password2) {
        this.password2 = password2;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
