import * as testTypes from '@/constants/test';


const initState = {a:1};

export default function userinfo(state = initState,action){
	switch(action.type){
		case testTypes.USERINFO_LOGIN:
			return action.data
		case testTypes.USERINFO_OUTPUT:
			return action.data
		default:
			return state
	}
}