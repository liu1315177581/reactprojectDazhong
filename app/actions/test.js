import * as testTypes from '@/constants/test';

export function loggin(data) {
	return {
		type: testTypes.USERINFO_LOGIN,
		data
	}
}

export function updateCityName(data) {
    return {
        type: testTypes.UPDATE_CITYNAME,
        data
    }
}