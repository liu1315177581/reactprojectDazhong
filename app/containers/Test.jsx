import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as testActions from '@/actions/test';
var PureRenderMixin = require('react-addons-pure-render-mixin');
class Test extends Component{
	constructor(props,context){
	
		super(props,context)

		/*组件更新的时候，进行优化*/
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
	}
	render(){
		return(
			<div>{this.props.testinfo.a}</div>
		)
	}
}

function mapStateToProps(state){
	return {
		testinfo:state.testinfo
	}
}

function mapDispatchToProps(dispatch){
	return{
		testActions:bindActionCreators(testActions,dispatch)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Test)




