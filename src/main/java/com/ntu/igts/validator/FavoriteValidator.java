package com.ntu.igts.validator;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;

import com.ntu.igts.constants.Constants;
import com.ntu.igts.exception.ServiceWarningException;
import com.ntu.igts.i18n.MessageKeys;
import com.ntu.igts.utils.ValidationUtil;

@Component
public class FavoriteValidator {

    public void validateCreate(String postBody) {
        JSONObject jsonPostBody = JSONObject.fromObject(postBody).optJSONObject(Constants.FAVORITE);
        if (!ValidationUtil.hasKey(jsonPostBody, Constants.COMMODITY_TITLE)
                        || ValidationUtil.isFieldEmpty(jsonPostBody, Constants.COMMODITY_ID)) {
            String[] param = { MessageKeys.COMMODITY_ID };
            throw new ServiceWarningException("Commodity id is required.", MessageKeys.FIELD_REQUIRED, param);
        }
    }
}
