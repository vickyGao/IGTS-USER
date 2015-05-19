package com.ntu.igts.model.container;

import java.util.ArrayList;
import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonRootName;
import com.ntu.igts.model.Cover;

@JsonRootName("covers")
public class CoverList extends ArrayList<Cover> {

    private static final long serialVersionUID = 3915920603002237849L;

    public CoverList(Collection<? extends Cover> b) {
        super(b);
    }

    public CoverList() {

    }

}
