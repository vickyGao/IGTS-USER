package com.ntu.igts.service;

import com.ntu.igts.model.container.CustomModuleList;
import com.ntu.igts.model.container.HotList;
import com.ntu.igts.model.container.SliceList;

public interface HomePageServcie {

    public HotList getAllHotCommodities(String token);

    public CustomModuleList getAllCustomModules(String token);

    public SliceList getAllSlices(String token);

}
