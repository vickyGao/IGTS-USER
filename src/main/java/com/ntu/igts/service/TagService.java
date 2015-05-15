package com.ntu.igts.service;

import com.ntu.igts.model.container.TagList;

public interface TagService {

    public TagList getAllTagsWithSubTags(String token);

    public TagList getAllTopLevelTags(String token);
}
