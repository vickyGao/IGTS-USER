package com.ntu.igts.constants;

import java.util.Locale;

public class Constants {

    /** Configuration file */
    public static final String MGMT_PROPS_FILE = "igts_user.properties";
    public static final String HTTP_PROTOCOL = "http://";
    public static final String MGMT_HOST_PROPS_KEY = "igts.host";
    public static final String MGMT_PORT_PROPS_KEY = "igts.port";
    public static final String MGMT_BASE_URI_PROPS_KEY = "igts.api.path";
    public static final String DEFAULT_PAGINATION_SIZE = "igts.pagination.size";
    public static final String DEFAULT_PASSWORD = "igts.default.password";

    /** Field name id used in BaseModel */
    public static String FIELD_ID = "id";
    /** Field name deletedYN used in BaseModel */
    public static String FIELD_DELETED_YN = "deletedYN";

    /** I18N */
    public static final String I18N_LOCALE_ATTRIBUTE = "request-locale";
    public static final String I18N_USER_LOCALE = "i18n.user.locale";
    public static final String I18N_DEFAULT_LANGUAGE = "zh-CN";
    public static final Locale I18N_DEFAULT_BUNDLE_LOCALE = Locale.ROOT;
    public static final String I18N_BUNDLE_BASE_NAME = "messages";

    /** HEADER */
    public static final String HEADER_X_AUTH_HEADER = "x-auth-token";

    /** Time format */
    public static final String DEFAULT_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";

    /** Media type */
    public static final String MEDIA_TYPE_IMAGE = "image";

    /** json keys */
    public static final String LOGIN = "login";
    public static final String USERNAME = "username";
    public static final String PASSWORD = "password";
    public static final String TAG = "tag";
    public static final String NAME = "name";
    public static final String STANDARD_NAME = "standardname";
    public static final String ID = "id";
    public static final String SEARCH_TERM = "search_term";
    public static final String PAGE = "page";
    public static final String SIZE = "size";
    public static final String SORTBY = "sortby";
    public static final String ORDERBY = "orderby";
    public static final String START_PRICE = "startprice";
    public static final String END_PRICE = "endprice";
    public static final String DISTRICT = "district";
    public static final String STATUS = "status";
    public static final String TAG_ID = "tagid";
    public static final String ACTIVE_YN = "activeyn";
    public static final String ADMIN = "admin";
    public static final String ADMIN_NAME = "adminname";
    public static final String ADMIN_PASSWORD = "adminpassword";
    public static final String NEWPWD1 = "newpwd1";
    public static final String NEWPWD2 = "newpwd2";
    public static final String FILENAME = "filename";
    public static final String SUFFIX = "suffix";
    public static final String INDENT = "indent";
    public static final String COMMODITY_ID = "commodityid";
    public static final String INDENTADDRESS = "indentaddress";
    public static final String PHONENUMBER = "phonenumber";
    public static final String INDENTMESSAGE = "indentmessage";
    public static final String PAYTYPE = "paytype";

    /** URL Authorization */
    public static final String URL_LOGIN = "authorization/user";
    public static final String URL_LOGOUT = "authorization/logout";

    /** URL Tag */
    public static final String URL_TAG_ENTITY = "tag/entity";
    public static final String URL_TAG_DETAIL = "tag/detail";

    /** URL Commodity */
    public static final String URL_COMMODITY_SEARCH_TERM = "commodity/search_term";
    public static final String URL_COMMODITY_DETAIL = "commodity/detail";
    public static final String URL_COMMODITY_ENTITY = "commodity/entity";
    public static final String URL_COMMODITY_ACTIVE_SATATE = "commodity/activestate";

    /** URL User */
    public static final String URL_USER_ENTITY = "user/entity";
    public static final String URL_USER_DETAIL = "user/detail";
    public static final String URL_USER_GET_BY_TOKEN = "user/detail/token";

    /** URL image */
    public static final String URL_IMAGE_ENTITY = "image/entity";
    public static final String URL_IMAGE_LOCATION = "image/location";

    /** URL Message */
    public static final String URL_MESSAGE_DETAIL = "message/entity";

    /** URL Image */
    public static final String URL_IMAGE_ENTITY_TOKEN = "image/entity/token";

    /** URL Address */
    public static final String URL_ADDRESS_ENTITY = "address/entity";

    /** URL Address */
    public static final String URL_INDENT_ENTITY = "indent/entity";

    /** URL Home Page */
    public static final String URL_SLICE_DETAIL = "slice/detail";
    public static final String URL_HOT_DETAIL = "hot/detail";
    public static final String URL_CUSTOM_MODULE_DETAIL = "custommodule/detail";

}
