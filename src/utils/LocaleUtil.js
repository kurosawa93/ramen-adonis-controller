class LocaleUtil {
    static getLocaleData(data, locale) {
        const localeData = data.locale[locale]
        for (const key in localeData) {
            data[key] = localeData[key]
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