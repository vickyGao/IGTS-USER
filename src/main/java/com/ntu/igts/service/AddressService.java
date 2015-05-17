package com.ntu.igts.service;

import java.util.List;

import com.ntu.igts.model.Address;

public interface AddressService {

    public Address create(String token, Address address);

    public Address update(String token, Address address);

    public boolean delete(String token, String addressId);

    public Address getById(String token, String addressId);

    public List<Address> getByUserId(String token);
}
