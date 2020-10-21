export const setStateAsync = function(state) {
	const _this = this;
	return new Promise(function(resolve) {
		_this.setState(state, resolve);
	});
};