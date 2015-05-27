package com.ntu.igts.service;

import java.util.List;

import com.ntu.igts.enums.IndentStatusEnum;
import com.ntu.igts.enums.PayTypeEnum;
import com.ntu.igts.model.Indent;
import com.ntu.igts.model.container.Pagination;

public interface IndentService {

    public Indent createIndent(String token, Indent indent, String commodityId);

    public Indent updateIndent(String token, IndentStatusEnum statusEnum, String indentId, PayTypeEnum payTypeEnum);

    public boolean deleteIndent(String token, String indentId);

    public List<Indent> getIndentByUserId(String token, String userId);

    public Indent getIndentById(String token, String indentId);

    public Pagination<Indent> getPaginatedIndentByUserId(String token, int currentPage, int pageSize);

    public Indent getIndentByCommodityId(String token, String commodityId);

    public Pagination<Indent> getPaginatedIndentBySellerId(String token, int currentPage, int pageSize);

    public Pagination<Indent> getPaginatedSpecifiedIndentBySellerId(String token, IndentStatusEnum indentStatus, int currentPage, int pageSize);
}
