package com.ntu.igts.validator;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;

import com.ntu.igts.constants.Constants;
import com.ntu.igts.exception.ServiceWarningException;
import com.ntu.igts.i18n.MessageKeys;
import com.ntu.igts.utils.ValidationUtil;

@Component
public class UserValidator {

    public void validateCreate(String putBody) {
        JSONObject jsonPutBody = JSONObject.fromObject(putBody).optJSONObject(Constants.USER);
        if (!ValidationUtil.hasKey(jsonPutBody, Constants.PASSWORD)
                        || ValidationUtil.isFieldEmpty(jsonPutBody, Constants.PASSWORD)) {
            String[] param = { MessageKeys.USER_PASSWORD };
            throw new ServiceWarningException("Password is required.", MessageKeys.FIELD_REQUIRED, param);
        } else if (!ValidationUtil.hasKey(jsonPutBody, Constants.USERNAME)
                        || ValidationUtil.isFieldEmpty(jsonPutBody, Constants.USERNAME)) {
            String[] param = { MessageKeys.USER_NAME };
            throw new ServiceWarningException("User name is required.", MessageKeys.FIELD_REQUIRED, param);
        }
    }

    public void validateUpdate(String putBody) {
        JSONObject jsonPutBody = JSONObject.fromObject(putBody).optJSONObject(Constants.USER);
        if (!ValidationUtil.hasKey(jsonPutBody, Constants.FIELD_ID)
                        || ValidationUtil.isFieldEmpty(jsonPutBody, Constants.FIELD_ID)) {
            String[] param = { Constants.ID };
            throw new ServiceWarningException("ID is required.", MessageKeys.FIELD_REQUIRED, param);
        }
    }

    public void validateUpdatePassword(String putBody) {
        JSONObject jsonPutBody = JSONObject.fromObject(putBody).optJSONObject(Constants.UPDATEPASSWORD);
        if (!ValidationUtil.hasKey(jsonPutBody, Constants.PASSWORD)
                        || ValidationUtil.isFieldEmpty(jsonPutBody, Constants.PASSWORD)) {
            String[] param = { MessageKeys.USER_PASSWORD };
            throw new ServiceWarningException("Password is required.", MessageKeys.FIELD_REQUIRED, param);
        } else if (!ValidationUtil.hasKey(jsonPutBody, Constants.PASSWORD1)
                        || ValidationUtil.isFieldEmpty(jsonPutBody, Constants.PASSWORD1)) {
            String[] param = { MessageKeys.USER_PASSWORD1 };
            throw new ServiceWarningException("New password is required.", MessageKeys.FIELD_REQUIRED, param);
        } else if (!ValidationUtil.hasKey(jsonPutBody, Constants.PASSWORD2)
                        || ValidationUtil.isFieldEmpty(jsonPutBody, Constants.PASSWORD2)) {
            String[] param = { MessageKeys.USER_PASSWORD2 };
            throw new ServiceWarningException("Sure password is required.", MessageKeys.FIELD_REQUIRED, param);
        } else if (!jsonPutBody.optString(Constants.PASSWORD1).equals(jsonPutBody.optString(Constants.PASSWORD2))) {
            throw new ServiceWarningException("New password and sure password need to be equal.",
                            MessageKeys.PASSWORD1_PASSWORD2_NOT_EQUALS);
        }
    }
}
