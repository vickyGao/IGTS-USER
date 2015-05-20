package com.ntu.igts.validator;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;

import com.ntu.igts.constants.Constants;
import com.ntu.igts.exception.ServiceWarningException;
import com.ntu.igts.i18n.MessageKeys;
import com.ntu.igts.utils.ValidationUtil;

@Component
public class AddressValidator {

    public void validateCreate(String postBody) {
        JSONObject jsonPostBody = JSONObject.fromObject(postBody).optJSONObject(Constants.ADDRESS);

        if (!ValidationUtil.hasKey(jsonPostBody, Constants.ADDRESS_COUNTRY)
                        || ValidationUtil.isFieldEmpty(jsonPostBody, Constants.ADDRESS_COUNTRY)) {
            String[] param = { MessageKeys.ADDRESS_COUNTRY };
            throw new ServiceWarningException("Address country is required.", MessageKeys.FIELD_REQUIRED, param);
        } else if (!ValidationUtil.hasKey(jsonPostBody, Constants.ADDRESS_PROVINCE)
                        || ValidationUtil.isFieldEmpty(jsonPostBody, Constants.ADDRESS_PROVINCE)) {
            String[] param = { MessageKeys.ADDRESS_PROVINCE };
            throw new ServiceWarningException("Address province is required.", MessageKeys.FIELD_REQUIRED, param);
        } else if (!ValidationUtil.hasKey(jsonPostBody, Constants.ADDRESS_CITY)
                        || ValidationUtil.isFieldEmpty(jsonPostBody, Constants.ADDRESS_CITY)) {
            String[] param = { MessageKeys.ADDRESS_CITY };
            throw new ServiceWarningException("Address city is required.", MessageKeys.FIELD_REQUIRED, param);
        } else if (!ValidationUtil.hasKey(jsonPostBody, Constants.ADDRESS_DISTRICT)
                        || ValidationUtil.isFieldEmpty(jsonPostBody, Constants.ADDRESS_DISTRICT)) {
            String[] param = { MessageKeys.ADDRESS_DISTRICT };
            throw new ServiceWarningException("Address district is required.", MessageKeys.FIELD_REQUIRED, param);
        } else if (!ValidationUtil.hasKey(jsonPostBody, Constants.PHONE_NUMBER)
                        || ValidationUtil.isFieldEmpty(jsonPostBody, Constants.PHONE_NUMBER)) {
            String[] param = { MessageKeys.PHONE_NUMBER };
            throw new ServiceWarningException("Address district is required.", MessageKeys.FIELD_REQUIRED, param);
        } else if (!ValidationUtil.hasKey(jsonPostBody, Constants.ADDRESS_DETAIL)
                        || ValidationUtil.isFieldEmpty(jsonPostBody, Constants.ADDRESS_DETAIL)) {
            String[] param = { MessageKeys.ADDRESS_DETAIL };
            throw new ServiceWarningException("Address detail is required.", MessageKeys.FIELD_REQUIRED, param);
        }
    }
}
