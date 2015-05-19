package com.ntu.igts.validator;

import net.sf.json.JSONArray;
import net.sf.json.JSONNull;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;

import com.ntu.igts.constants.Constants;
import com.ntu.igts.exception.ServiceWarningException;
import com.ntu.igts.i18n.MessageKeys;
import com.ntu.igts.utils.StringUtil;

@Component
public class CoverValidator {

    public void validateCreate(String commodityId, String postBody) {
        JSONNull jsonNull = JSONNull.getInstance();

        if (StringUtil.isEmpty(commodityId)) {
            String[] param = { MessageKeys.COMMODITY_ID };
            throw new ServiceWarningException("Commodity id is required", MessageKeys.FIELD_REQUIRED, param);
        }

        JSONArray imageArray = JSONObject.fromObject(postBody).optJSONArray(Constants.IMAGES);
        if (!jsonNull.equals(imageArray)) {
            for (Object imageObject : imageArray) {
                JSONObject imageJsonObject = JSONObject.fromObject(imageObject);
                if (StringUtil.isEmpty(imageJsonObject.optString(Constants.ID))) {
                    String[] param = { MessageKeys.IMAGE_ID };
                    throw new ServiceWarningException("Image id is required", MessageKeys.FIELD_REQUIRED, param);
                }
            }
        }
    }
}
