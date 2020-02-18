class LocaleUtil {
    static getLocaleData(data, locale, localeAttributes) {
        const localeData = data.locale[locale]
        for (const attribute of localeAttributes) {
            if (localeData[attribute])
                data[attribute] = localeData[attribute]
            else
                data[attribute] = null
        }
        delete data['locale']
        return data
    }

    static resolveLocaleQuery(locale, localeAttributes, queryParams) {
        for (const attribute of localeAttributes) {
            if (queryParams[attribute]) {
                const queryKey = 'json'
                const queryValue = 'locale.' + locale + '.' + attribute + ':' + queryParams[attribute]
                queryParams[queryKey] = queryValue

                delete queryParams[attribute]
            }
        }
        queryParams['locale'] = locale
        return queryParams
    }
}

module.exports = LocaleUtil