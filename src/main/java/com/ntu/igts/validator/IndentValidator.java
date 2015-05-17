package com.ntu.igts.validator;

import net.sf.json.JSONObject;

import org.springframework.stereotype.Component;

import com.ntu.igts.constants.Constants;
import com.ntu.igts.exception.ServiceWarningException;
import com.ntu.igts.i18n.MessageKeys;
import com.ntu.igts.utils.ValidationUtil;

@Component
public class IndentValidator {

    public void validateCreate(String postBody) {
        JSONObject jsonPostBody = JSONObject.fromObject(postBody).optJSONObject(Constants.INDENT);
        if (!ValidationUtil.hasKey(jsonPostBody, Constants.INDENTADDRESS)
                        || ValidationUtil.isFieldEmpty(jsonPostBody, Constants.INDENTADDRESS)) {
            String[] param = { MessageKeys.INDENT_ADDRESS };
            throw new ServiceWarningException("Indent address is required.", MessageKeys.FIELD_REQUIRED, param);
        } else if (!ValidationUtil.hasKey(jsonPostBody, Constants.PHONENUMBER)
                        || ValidationUtil.isFieldEmpty(jsonPostBody, Constants.PHONENUMBER)) {
            String[] param = { MessageKeys.INDENT_PHONENUMBER };
            throw new ServiceWarningException("Indent phone number is required.", MessageKeys.FIELD_REQUIRED, param);
        } else if (!ValidationUtil.hasKey(jsonPostBody, Constants.INDENTMESSAGE)
                         || ValidationUtil.isFieldEmpty(jsonPostBody, Constants.INDENTMESSAGE)) {
            String[] param = { MessageKeys.INDENT_MESSAGE };
            throw new ServiceWarningException(
                    "Indent message is required.", MessageKeys.FIELD_REQUIRED, param);
        }
    }

    public void validateUpdate(String putBody) {
        
    }

}
