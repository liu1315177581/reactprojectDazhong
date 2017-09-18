import { createStore } from 'redux';
import rootReducers from '@/reducers';

export default function(initState){
	const store = createStore(
		rootReducers,
		initState
	)
	return store
}