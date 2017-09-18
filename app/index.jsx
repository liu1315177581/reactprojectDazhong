import React,{ Component } from 'react';
import { render } from 'react-dom';
import Rerf from 'react-addons-perf';
import { Provider } from 'react-redux';
import configStore from '@/store';


if(__DEV__){
	window.Perf = Perf;
}


import Hello from '@/containers/Test'


const store = configStore();

render(
	<Provider store={store}>
		<Hello/>
	</Provider>,
	document.getElementById('root')
)
