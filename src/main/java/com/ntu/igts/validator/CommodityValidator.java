package com.ntu.igts.validator;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;

import com.ntu.igts.constants.Constants;
import com.ntu.igts.exception.ServiceWarningException;
import com.ntu.igts.i18n.MessageKeys;
import com.ntu.igts.utils.ValidationUtil;

@Component
public class CommodityValidator {

    public void validateCreate(String postBody) {
        JSONObject jsonPostBody = JSONObject.fromObject(postBody).optJSONObject(Constants.COMMODITY);
        if (!ValidationUtil.hasKey(jsonPostBody, Constants.COMMODITY_TITLE)
                        || ValidationUtil.isFieldEmpty(jsonPostBody, Constants.COMMODITY_TITLE)) {
            String[] param = { MessageKeys.COMMODITY_TITLE };
            throw new ServiceWarningException("Commodity title is required.", MessageKeys.FIELD_REQUIRED, param);
        } else if (!ValidationUtil.hasKey(jsonPostBody, Constants.COMMODITY_PRICE)
                        || ValidationUtil.isFieldEmpty(jsonPostBody, Constants.COMMODITY_PRICE)) {
            String[] param = { MessageKeys.COMMODITY_PRICE };
            throw new ServiceWarningException("Commodity price is required.", MessageKeys.FIELD_REQUIRED, param);
        } else if (!ValidationUtil.hasKey(jsonPostBody, Constants.COMMODITY_DISTRICT)
                        || ValidationUtil.isFieldEmpty(jsonPostBody, Constants.COMMODITY_DISTRICT)) {
            String[] param = { MessageKeys.COMMODITY_DISTRICT };
            throw new ServiceWarningException("Commodity district is required.", MessageKeys.FIELD_REQUIRED, param);
        } else if (!ValidationUtil.isFieldNumeric(jsonPostBody, Constants.COMMODITY_PRICE)) {
            String[] param = { MessageKeys.COMMODITY_PRICE };
            throw new ServiceWarningException("Commodity price must be number.", MessageKeys.FIELD_MUST_BE_NUMBER,
                            param);
        } else if (ValidationUtil.hasKey(jsonPostBody, Constants.COMMODITY_CARRIAGE)
                        && !ValidationUtil.isFieldNumeric(jsonPostBody, Constants.COMMODITY_CARRIAGE)) {
            String[] param = { MessageKeys.COMMODITY_CARRIAGE };
            throw new ServiceWarningException("Commodity carriage must be number.", MessageKeys.FIELD_MUST_BE_NUMBER,
                            param);
        }
    }
}
