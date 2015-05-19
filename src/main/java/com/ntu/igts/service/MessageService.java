package com.ntu.igts.service;

import com.ntu.igts.model.Message;
import com.ntu.igts.model.container.Pagination;

public interface MessageService {

    public Message createMessage(String token, Message message);

    public boolean deleteMessage(String token, String messageId);

    public Pagination<Message> getPaginatedMessagesByCommodity(String token, int currentPage, int pageSize,
                    String commodityId);
}
