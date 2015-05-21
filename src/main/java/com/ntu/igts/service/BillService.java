package com.ntu.igts.service;

import com.ntu.igts.model.Bill;
import com.ntu.igts.model.container.Pagination;

public interface BillService {

    public void delete(String token, String billId);

    public Bill getById(String token, String billId);

    public Pagination<Bill> getPaginatedBillsByUserId(String token, int currentPage, int pageSize);
}
