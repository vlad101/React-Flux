/*eslint-disable strict*/ //Disabling check because we can't run strict mode. Need global vars.

var React = require('react');
var Header = require('./common/header');
var RouteHandler = require('react-router').RouteHandler;
$ = jQuery = require('../../node_modules/jquery/dist/jquery.min.js');

var App = React.createClass({
	render: function() {
		return (
			<div>
				<Header />
				<div className="container-fluid">
					<RouteHandler />
				</div>
			</div>
		);
	}
});

module.exports = App;