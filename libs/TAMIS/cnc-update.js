var _ = cc.lodash;
if ($.when.all === undefined) {
	$.when.all = function (deferreds) {
		var deferred = new $.Deferred();
		$.when.apply(jQuery, deferreds).then(
			function () {
				deferred.resolve(Array.prototype.slice.call(arguments));
			},
			function () {
				deferred.fail(Array.prototype.slice.call(arguments));
			});

		return deferred;
	};
}
/**
 * @summary CORASNow Client script library
 * @desc CORASNow Client script library
 * @version 0.1
 * @copyright Copyright &reg; CORASCloud Inc.
 * @author David Smiley <david.smiley@corascloud.com>
 * @namespace
 */
var cnc = {
	/**
	 * @desc Enumerate the functions in this namespace
	 * @summary Enumerate the functions in this namespace
	 */
	about : function () {
		cnc.fn.enumerateFunctions(this);
	},
	ready : $.Deferred()
};

/**
 *  @summary General Purpose functions.
 *  @desc General Purpose functions.
 * <br />
 * Functions in this group are synchronous.
 * @namespace
 * @example <caption>Catch Console</caption>
 * cnc.fn.catchConsole();
 * @example <caption>Enumerate Functions</caption>
 * cnc.fn.enumerateFunctions(cnc.fn);
 * @example <caption>Generate UUID</caption>
 * console.log(cnc.fn.generateUUID());
 */
cnc.fn = {
	/**
	 * @desc Enumerate the functions in this namespace
	 * @summary Enumerate the functions in this namespace
	 */
	about : function () {
		cnc.fn.enumerateFunctions(this);
	},
	/**
	 * @summary Avoid console errors in browsers that lack a console
	 * @desc Avoid console errors in browsers that lack a console.
	 * @function
	 */
	catchConsole : function () {
		var method;
		var noop = function () {};
		var methods = [
			'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
			'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
			'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
			'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
		];
		var length = methods.length;
		var console = (window.console = window.console || {});
		while (length--) {
			method = methods[length];

			// Only stub undefined methods.
			if (!console[method]) {
				console[method] = noop;
			}
		}
		console.log('Console Catcher in place');
	},
	/**
	 * @summary Enumerate the functions in a namespace
	 * @desc Enumerate the functions in a namespace
	 * @function
	 * @param {String} ns - The name of the namespace to be enumerated
	 */
	enumerateFunctions : function (ns) {
		for (var key in ns) {
			console.log(key, typeof ns[key], ns[key]);
		}
	},
	/**
	 * @summary Generate a UUID string
	 * @desc Generate a UUID string
	 * @function
	 * @returns {String} UUID - A unique ID
	 */
	generateUUID : function () {
		return kendo.guid();
	},
	/**
	 * @summary Round a numeric value to given number of places
	 * @desc Round a numeric value to given number of places
	 * <br />
	 * Adapted from
	 * <ul>
	 *     <li>
	 * <a href="http://gruik.io/view/36">http://gruik.io/view/36</a>
	 * </li>
	 * <li>
	 * <a href="http://stackoverflow.com/questions/1726630/formatting-a-number-with-exactly-two-decimals-in-javascript">
	 * http://stackoverflow.com/questions/1726630/formatting-a-number-with-exactly-two-decimals-in-javascript
	 * </a>
	 * </li>
	 * <li>
	 *     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round#Example:_Decimal_rounding">
	 *         https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round#Example:_Decimal_rounding
	 *         </a>
	 *     </li>
	 * </ul>
	 *
	 * @param {Number} numValue - Number to be rounded
	 * @param {Integer} roundTo - Number of places to round numValue
	 * @returns {Number | NaN}
	 */
	roundNum: function(numValue, roundTo) {
		if (typeof roundTo === 'undefined' || +roundTo === 0)
			return Math.round(numValue);

		numValue = +numValue;
		roundTo = +roundTo;

		if (isNaN(numValue) || !(typeof roundTo === 'number' && roundTo % 1 === 0))
			return NaN;

		// Shift
		numValue = numValue.toString().split('e');
		numValue = Math.round(+(numValue[0] + 'e' + (numValue[1] ? (+numValue[1] + roundTo) : roundTo)));

		// Shift back
		numValue = numValue.toString().split('e');
		return +(numValue[0] + 'e' + (numValue[1] ? (+numValue[1] - roundTo) : -roundTo));
	}
};

/**
 * @summary Constructor functions
 * @desc Object Constructor functions.
 * <br />
 * Functions in this group are object constructors.
 * @namespace
 */
cnc.objects = {
	/**
	 * @desc Enumerate the functions in this namespace
	 * @summary Enumerate the functions in this namespace
	 */
	about : function () {
		cnc.fn.enumerateFunctions(this);
	},
	/**
	 * @desc Represents an Action Config
	 * @summary Represents an Action Config
	 * @class
	 * @name cn.actionConfig
	 * @property {Json}  ActionConfigJSON - JSON Object of Action Configuration
	 * @property {String}  Title - Action Title
	 * @property {String}  ListTitle - List Title
	 * @property {Guid}  ListId - List Id
	 * @property {Guid}  AppId - App Id
	 * @property {Json}  ConfigJSON - Config JSON
	 * @property {Guid}  ConnectionId - Connection Id
	 * @property {Date}  CreateDate - Create Date
	 * @property {User}  CreatedBy - Created By
	 * @property {Date}  ModifiedDate - Modified Date
	 * @property {User}  ModifiedBy - Modified By
	 * @property {String}  DataSource - Data Source
	 * @property {String}  Description - Description
	 * @property {Fields}  Fields - Fields
	 * @property {Guid}  Id - Id
	 * @property {Guid}  OrginalId - Original Id
	 * @property {Guid}  Tenant - Tenant
	 * @property {Integer}  Type - Type
	 * @property {Integer}  Version - Version
	 */
	actionConfig : function (actionConfig) {

	},
	/**
	 * @desc Represents a User
	 * @summary Represents a User
	 * @class
	 * @name cn.user
	 * @property {String}  Id - The GUID for the User
	 * @property {String}  DisplayName - Display Name
	 * @property {String}  Email - The Email address of the User
	 * @property {String}  UserName - The User Name of the User
	 */
	user : function (user) {
		var odataNs = "odata";
		var odataAnnotationPrefix = odataNs + ".";
		var typeAnnotation = "@" + odataAnnotationPrefix + "type";
		this[typeAnnotation] = "#CorasWorks.Cloud.Web.Models.User";
		if (user === undefined || user === null) {
			this.Id = null;
			this.DisplayName = null;
			this.Email = null;
			this.UserName = null;
			return;
		}
		this.Id = user.Id || null;
		this.DisplayName = user.DisplayName || null;
		this.Email = user.Email || null;
		this.UserName = user.UserName || null;

	},
	/**
	 * Represents a relation/lookup.
	 * @class
	 * @name cn.relation
	 * @property {String}  Id - The GUID of the List
	 * @property {String}  ItemId - The GUID of the List Item
	 * @property {String}  Title - The Title of the List Item
	 */
	relation : function (relation) {
		var odataNs = "odata";
		var odataAnnotationPrefix = odataNs + ".";
		var typeAnnotation = "@" + odataAnnotationPrefix + "type";
		this[typeAnnotation] = "#CorasWorks.Cloud.Web.Models.Relation";
		if (relation === undefined || relation === null) {
			this.Id = null; // List Id of related item
			this.ItemId = null; // Item Id of related item
			this.Title = null; // Title of related item
			return;
		}
		this.Id = relation.Id || null;
		this.ItemId = relation.ItemId || null;
		this.Title = relation.Title || null;
	},
	/**
	 * Represents a result from a function
	 * @class
	 * @name cn.results
	 * @property {String}  type - The type of message being returned: User, System, etc.
	 * @property {String}  notificationMethod - Methods for cc.notification.trigger are: 'warning', 'info', 'success', 'error'
	 * @property {String}  msg - Plain text result message
	 */
	results : function () {
		this.type = '';
		this.notificationMethod = 'info';
		this.msg = '';
	}

};

/**
 * @summary Local Storage functions
 * @desc Local Storage functions
 * <br />
 * Functions in this group are asynchronous
 * @namespace
 * @example <caption>Set localStorage</caption>
 * var opts = new cnc.localStorage.options();
 * cnc.localStorage.set('[key]', 'your value goes here' ,opts)
 * .fail(function (results) {
 * console.log('fail:', results);
 * })
 * .then(function (results) {
 * console.log('success:', results);
 * });
 * @example <caption>Get localStorage</caption>
 * var opts = new cnc.localStorage.options();
 * cnc.localStorage.get('[key]', opts)
 * .fail(function (results) {
 * console.log('fail:', results);
 * })
 * .then(function (results) {
 * console.log('success:', results);
 * });
 * @example <caption>Remove localStorage</caption>
 * var opts = new cnc.localStorage.options();
 * cnc.localStorage.remove('[key]', opts)
 * .fail(function (results) {
 * console.log('fail:', results);
 * })
 * .then(function (results) {
 * console.log('success:', results);
 * });
 */
cnc.localStorage = {
	/**
	 * @desc Enumerate the functions in this namespace
	 * @summary Enumerate the functions in this namespace
	 */
	about : function () {
		cnc.fn.enumerateFunctions(this);
	},
	/**
	 * @summary Constructor for Local Storage options
	 * @desc Constructor for Local Storage options
	 * @class
	 * @name localStorage.options
	 * @property {String}  itemBase - The base value prepended to each local storage key
	 * @property {String}  separator - The separator used when contatenating the base value and the key name
	 */
	options : function () {
		this.itemBase = 'cc-key-value';
		this.separator = '-';
	},
	/**
	 * @summary Get Local Storage value
	 * @desc Get Local Storage value
	 * <br />
	 * key not provided, @returns array of available keys
	 * <br />
	 * key provided & key exists, @returns JSON string
	 * <br />
	 * key provided & key does not exist, @returns null
	 * @param {String} key - local storage key
	 * @param {localStorage.options} options - function options
	 * @returns {jQuery.Promise.then<cn.localStorage> | jQuery.Promise.fail<cn.results>}
	 */
	get : function (key, options) {
		var deferred = $.Deferred();
		options = options || new this.options();
		if (!(_.isEqual(_.keys(options), _.keys(new this.options())))) { // Is the structure of the options object matches what's expected
			results.notificationMethod = 'error';
			results.type = 'System';
			results.msg = 'Options object inconsistent: ' + _.keys(options);
			return deferred.reject(results);
		}
		if (!key || key === null || key === '') {
			return deferred.reject('set(key, value) required property \'key\' missing, null or blank');
		}

		var results = new cnc.objects.results();
		var lsKey = options.itemBase;
		var localDS = cc.api.getLocalStorageDS(options);
		localDS.read()
			.done(function () {
				var retval = _.find(localDS.data(), {
					'key' : key
				});
				if (retval === undefined) {
					results.notificationMethod = 'error';
					results.type = 'System';
					results.msg = 'Key \'' + key + '\' not found';
					return deferred.reject(results);
				} else {
					return deferred.resolve(retval);
				}
			}).fail(function (retval) {
				results.notificationMethod = 'error';
				results.type = 'System';
				results.msg = 'API call failed: ' + retval;
				return deferred.reject(results);
			});

		return deferred.promise();
	},
	/**
	 * @summary Set Local Storage value
	 * @desc Set Local Storage value
	 * @param {String} key - local storage key
	 * @param {String} value - value to set
	 * @param {localStorage.options} options - function options
	 * @returns {jQuery.Promise.then<JsonString> | jQuery.Promise.fail<cn.results>}
	 */
	set : function (key, value, options) {
		var deferred = $.Deferred();
		var results = new cnc.objects.results();
		options = options || new this.options();
		if (!(_.isEqual(_.keys(options), _.keys(new this.options())))) { // Is the structure of the options object matches what's expected
			results.notificationMethod = 'error';
			results.type = 'System';
			results.msg = 'Options object inconsistent: ' + _.keys(options);
			return deferred.reject(results);
		}
		if (!key || key === null || key === '') {
			results.notificationMethod = 'error';
			results.type = 'System';
			results.msg = 'set(key, value) required property \'key\' missing, null or blank';
			return deferred.reject(results);
		}
		if (!value || value === null || value === '') {
			results.notificationMethod = 'error';
			results.type = 'System';
			results.msg = 'set(key, value) required property \'value\' missing, null or blank';
			return deferred.reject(results);
		}

		if (value && value !== null && value !== '') {
			var localDS = cc.api.getLocalStorageDS(options);
			var item = localDS.add();
			item.set('key', key);
			item.set('value', value);
			localDS.sync().done(function () {
				cnc.localStorage.get(key)
					.done(function (retval) {
						return deferred.resolve(retval);
					})
					.fail(function (retval) {
						results.notificationMethod = 'error';
						results.type = 'System';
						results.msg = 'API call failed: ' + retval;
						return deferred.reject(results);
					});
			});
		}

		return deferred.promise();
	},
	/**
	 * @summary Remove Local Storage value
	 * @desc Remove Local Storage value
	 * @param {String} key - local storage key
	 * @param {localStorage.options} options - function options
	 * @returns {jQuery.Promise.then<JsonString>| jQuery.Promise.fail<cn.results>}
	 */
	remove : function (key, options) {
		var deferred = $.Deferred();
		var results = new cnc.objects.results();
		options = options || new this.options();
		if (!(_.isEqual(_.keys(options), _.keys(new this.options())))) { // Is the structure of the options object matches what's expected
			results.notificationMethod = 'error';
			results.type = 'System';
			results.msg = 'Options object inconsistent: ' + _.keys(options);
			return deferred.reject(results);
		}
		if (!key || key === null || key === '') {
			return deferred.reject('set(key, value) required property \'key\' missing, null or blank');
		}
		var localDS = cc.api.getLocalStorageDS(options);
		localDS.read().done(function () {
			var toRemove = _.find(localDS.data(), {
				'key' : key
			});
			if (toRemove === undefined) {
				results.notificationMethod = 'error';
				results.type = 'System';
				results.msg = 'Key \'' + key + '\' not found';
				return deferred.reject(results);
			}
			localDS.remove(toRemove);
			localDS.sync();
			return deferred.resolve(toRemove);

		}).fail(function (retval) {
			results.notificationMethod = 'error';
			results.type = 'System';
			results.msg = 'API call failed: ' + retval;
			return deferred.reject(results);
		});

		return deferred.promise();
	}

};



/**
 * @summary Current User functions
 * @desc Current User functions
 * <br />
 * Functions in this group are asynchronous
 * @namespace
 * @example <caption>Get Current User</caption>
 * var opts = new cnc.currentUser.options();
 * cnc.currentUser.get(opts)
 * .fail(function (results) {
 * console.log('fail:', results);
 * })
 * .then(function (results) {
 * console.log('success:', results);
 * });
 *
 */
cnc.currentUser = {
	/**
	 * @desc Enumerate the functions in this namespace
	 * @summary Enumerate the functions in this namespace
	 */
	about : function () {
		cnc.fn.enumerateFunctions(this);
	},
	/**
	 * @summary Constructor for app options
	 * @desc Constructor for app options
	 * @class
	 * @name currentUser.options
	 */
	options : function () {
	},
	/**
	 * @summary Get Current User
	 * @desc Get Current User
	 * @param {currentUser.options} options - function options
	 * @returns {jQuery.Promise.then<cn.user> | jQuery.Promise.fail<cn.results>}
	 */
	get : function (options) {
		var deferred = $.Deferred();
		var results = new cnc.objects.results();
		options = options || new this.options();
		if (!(_.isEqual(_.keys(options), _.keys(new this.options())))) { // Is the structure of the options object matches what's expected
			results.notificationMethod = 'error';
			results.type = 'System';
			results.msg = 'Options object inconsistent: ' + _.keys(options);
			return deferred.reject(results);
		}
		var userDS = cc.api.getCurrentUserDS();
		userDS.read().then(function () {
			return deferred.resolve(userDS.data()[0]);
		});
		return deferred.promise();
	}
};


/**
 * @summary Users functions
 * @desc Users functions
 * <br />
 * Functions in this group are asynchronous
 * @namespace
 * @example <caption>Get All Users</caption>
 * var opts = new cnc.users.options();
 * cnc.users.get(opts)
 * .fail(function (results) {
 * console.log('fail:', results);
 * })
 * .then(function (results) {
 * console.log('success:', results);
 * });
 *
 * @example <caption>Get Users (filtered by DisplayName)</caption>
 * var opts = new cnc.users.options();
 * opts.filter.field = 'DisplayName';
 * opts.filter.operator = 'startswith';
 * opts.filter.value = 'Da';
 * cnc.users.get(opts)
 * .fail(function (results) {
 * 	console.log('fail:', results);
 * })
 * .then(function (results) {
 * 	console.log('success:', results);
 * });
 *
 */
cnc.users = {
	/**
	 * @summary Enumerate the functions in this namespace
	 * @desc Enumerate the functions in this namespace
	 */
	about : function () {
		cnc.fn.enumerateFunctions(this);
	},
	/**
	 * @desc Constructor for Users options
	 * @summary Constructor for Action options
	 * @name ui.users.options
	 * @class
	 * @property {String} filter - Kendo filter object
	 * @property {Object} kendoFilter - Complete syntactically correct Kendo datasource filter
	 */
	options : function (field, operator, value) {
		this.filter = {
			field : field || null, // UserName, Display Name, Email, Id
			operator : operator || null, // http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-filter.operator
			value : value || null
		};
		this.kendoFilter = null; 
	},
	/**
	 * @desc Get users
	 * @summary Get users
	 * @function
	 * @param {ui.users.options} options - Users options object
	 * @returns {jQuery.Promise.then<Array<cn.user>> | jQuery.Promise.fail<cn.results>}
	 */
	get : function (options) {
		var deferred = $.Deferred();
		options = options || new this.options();
		var userDS;
		if (!(_.isEqual(_.keys(options), _.keys(new this.options())))) { // Is the structure of the options object matches what's expected
			return deferred.reject('Options object inconsistent: ' + _.keys(options));
		}
		if (options.kendoFilter !== null) {
			userDS = cc.api.getUsersDS({
				filter : options.kendoFilter
			});
			userDS.read().then(function () {
				return deferred.resolve(userDS.data());
			});
		} else {

			if (options.filter.field === null || options.filter.operator === null || options.filter.value === null) { // Filter options include at least one null... bad
				userDS = cc.api.getUsersDS();
				userDS.read().then(function () {
					return deferred.resolve(userDS.data());
				});
			} else {
				userDS = cc.api.getUsersDS({
					filter: {
						field: options.filter.field,
						operator: options.filter.operator,
						value: options.filter.value
					}
				});
				userDS.read().then(function () {
					return deferred.resolve(userDS.data());
				});
			}
		}

		return deferred.promise();
	}
};


/**
 * @summary Action Config functions
 * @desc Action Config functions
 * <br />
 * Functions in this group are asynchronous
 * @namespace
 * @example <caption>Get All Action Configs</caption>
 * var opts = new cnc.actionConfigs.options();
 * cnc.actionConfigs.get(opts)
 * .fail(function (results) {
 * console.log('fail:', results);
 * })
 * .then(function (results) {
 * console.log('success:', results);
 * });
 *
 * @example <caption>Get Action Configs (filtered by Action Title)</caption>
 * var opts = new cnc.actionConfigs.options();
 * opts.filter.field = 'Title';
 * opts.filter.operator = 'startswith';
 * opts.filter.value = 'New';
 * cnc.actionConfigs.get(opts)
 * .fail(function (results) {
 * 	console.log('fail:', results);
 * })
 * .then(function (results) {
 * 	console.log('success:', results);
 * });
 *
 * @example <caption>Get Action Configs (filtered by List Title)</caption>
 * var opts = new cnc.actionConfigs.options();
 * opts.filter.field = 'ListTitle';
 * opts.filter.operator = 'eq';
 * opts.filter.value = 'Products';
 * cnc.actionConfigs.get(opts)
 * .fail(function (results) {
 * 	console.log('fail:', results);
 * })
 * .then(function (results) {
 * 	console.log('success:', results);
 * });
 */
cnc.actionConfigs = {
	/**
	 * @desc Enumerate the functions in this namespace
	 * @summary Enumerate the functions in this namespace
	 */
	about : function () {
		cnc.fn.enumerateFunctions(this);
	},
	/**
	 * @summary Constructor for app options
	 * @desc Constructor for app options
	 * @name actionConfigs.options
	 * @class
	 * @property {String} filter - Kendo filter object
	 */
	options : function (field, operator, value) {
		this.filter = {
			field : field || null, // Title, ListTitle, etc.
			operator : operator || null, // http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-filter.operator
			value : value || null
		};
		this.kendoFilter = null; // Complete syntactically correct Kendo datasource filter
	},
	/**
	 * @summary Get Action Configs
	 * @desc Get Action Configs
	 * @param {actionConfigs.options} options - function options
	 * @returns {jQuery.Promise.then<Array<cn.actionConfig>> | jQuery.Promise.fail<cn.results>}
	 */
	get : function (options) {
		var deferred = $.Deferred();
		var results = new cnc.objects.results();
		options = options || new this.options();
		if (!(_.isEqual(_.keys(options), _.keys(new this.options())))) { // Is the structure of the options object matches what's expected
			results.notificationMethod = 'error';
			results.type = 'System';
			results.msg = 'Options object inconsistent: ' + _.keys(options);
			return deferred.reject(results);
		}
		if (options.kendoFilter !== null) {
			ds = cc.api.getActionConfigsDS({
				filter : options.kendoFilter
			});
			ds.read().then(function () {
				return deferred.resolve(ds.data());
			});
		} else {

			if (options.filter.field === null || options.filter.operator === null || options.filter.value === null) { // Filter options include at least one null... bad
				ds = cc.api.getActionConfigsDS();
				ds.read().then(function () {
					return deferred.resolve(ds.data());
				});
			} else {
				ds = cc.api.getActionConfigsDS({
					filter: {
						field: options.filter.field,
						operator: options.filter.operator,
						value: options.filter.value
					}
				});
				ds.read().then(function () {
					return deferred.resolve(ds.data());
				});
			}
		}
		return deferred.promise();
	}
};


/**
 * @summary App functions
 * @desc App functions
 * <br />
 * Functions in this group are asynchronous
 * @namespace
 * @example <caption>Get app</caption>
 * var opts = new cnc.app.options();
 * cnc.app.get(opts)
 * .fail(function (results) {
 * console.log('fail:', results);
 * })
 * .then(function (results) {
 * console.log('success:', results);
 * });
 */
cnc.app = {
	/**
	 * @desc Enumerate the functions in this namespace
	 * @summary Enumerate the functions in this namespace
	 */
	about : function () {
		cnc.fn.enumerateFunctions(this);
	},
	/**
	 * @summary Constructor for App options
	 * @desc Constructor for App options
	 * @class
	 * @name app.options
	 */
	options : function () {
	},
	/**
	 * @summary Get App
	 * @desc Get App
	 * @param {app.options} options - function options
	 * @returns {jQuery.Promise.then<cn.app> | jQuery.Promise.fail<cn.results>}
	 */
	get : function (options) {
		var deferred = $.Deferred();
		var results = new cnc.objects.results();
		options = options || new this.options();
		if (!(_.isEqual(_.keys(options), _.keys(new this.options())))) { // Is the structure of the options object matches what's expected
			results.notificationMethod = 'error';
			results.type = 'System';
			results.msg = 'Options object inconsistent: ' + _.keys(options);
			return deferred.reject(results);
		}
		var appConfig = cc.api.getAppConfigsDS();
		appConfig.read().then(function () {
			var app = appConfig.data()[0];
			return deferred.resolve(app);
		});

		return deferred.promise();
	}
};

/**
 * @summary Connections functions
 * @desc Connections functions
 * <br />
 * Functions in this group are asynchronous
 * @namespace
 * @example <caption>Get connections</caption>
 * var opts = new cnc.connections.options();
 * cnc.connections.get(opts)
 * .fail(function (results) {
 * console.log('fail:', results);
 * })
 * .then(function (results) {
 * console.log('success:', results);
 * });
 */
cnc.connections = {
	/**
	 * @desc Enumerate the functions in this namespace
	 * @summary Enumerate the functions in this namespace
	 */
	about : function () {
		cnc.fn.enumerateFunctions(this);
	},
	/**
	 * @summary Constructor for Connections options
	 * @desc Constructor for Connections options
	 * @class
	 * @name connections.options
	 * @property {Number}  depth - The number of nested levels to return
	 * 0 = Connections Only
	 * 1 = Connections and List Names
	 * 2 = Connections and List Names and List Schema
	 */
	options : function () {
		this.depth = 0;
	},
	/**
	 * @summary Get Connections
	 * @desc Get Connections
	 * @param {connections.options} options - function options
	 * @returns {jQuery.Promise.then<Array<cn.connections>> | jQuery.Promise.fail<cn.results>}
	 */
	get : function (options) {
		var deferred = $.Deferred();
		var results = new cnc.objects.results();
		var appId = null;
		var connections = [];
		options = options || new this.options();
		if (!(_.isEqual(_.keys(options), _.keys(new this.options())))) { // Is the structure of the options object matches what's expected
			results.notificationMethod = 'error';
			results.type = 'System';
			results.msg = 'Options object inconsistent: ' + _.keys(options);
			return deferred.reject(results);
		}
		var internalConnection = cc.api.getConnectionsDS();
		internalConnection.read({
			$expand : 'Capabilities'
		}).then(function () {
			connections = internalConnection.data();
			if(options.depth === 0){
				return deferred.resolve(connections);
			}
			if(options.depth >= 1){
				var i = 0;
				var connectionsDfer = [];
				$.each(connections, function(index, connection){
					connectionsDfer.push($.Deferred());
				});
				var appOpts = new cnc.app.options();
				cnc.app.get(appOpts)
				/*jshint -W083 */
					.fail(function (results) {
						console.log('fail:', results);
					})
					/*jshint -W083 */
					.then(function (results) {
						appId = results.AppId;
						for(i=0; i < connections.length; i++){
							connections[i].Lists = [];
							$.ajax({
								method: "GET",
								contentType: 'application/json',
								headers: {
									Accept: 'application/json,odata.metadata=minimal',
									AppId : appId
								},
								cache: false,
								indexValue: i,
								conns: connections,
								connsDfer: connectionsDfer,
								url: window.location.origin + "/odata/Connections('" + connections[i].Id + "')/Lists?%24orderby=Title"
							})
							/*jshint -W083 */
							.done(function( lists ) {
								this.conns[this.indexValue].Lists = lists.value;
								this.connsDfer[this.indexValue].resolve();
							})
							.fail(function (results) {
								console.log('fail:', results);
							});
						}
					});
					$.when.all(connectionsDfer).done(function (lists) {
						if (options.depth == 1) {
							return deferred.resolve(connections);
						}
						if (options.depth >= 2) {
							var listsDfer = [];
							var listsDferIndex = 0;
							$.each(connections, function (index, connection) {
								$.each(connection.Lists, function (index, list) {
									listsDferIndex++;
									listsDfer.push($.Deferred()); // Create a $.Deferred() for each list
								});
							});
							listsDferIndex = 0;
							for (var i = 0; i < connections.length; i++) {
								for (var j = 0; j < connections[i].Lists.length; j++) {
									$.ajax({
										method: "GET",
										contentType: 'application/json',
										headers: {
											Accept: 'application/json,odata.metadata=minimal',
											AppId: appId
										},
										cache: false,
										indexValue: listsDferIndex,
										conns: connections,
										listDfer: listsDfer,
										conIndex: i,
										listIndex: j,
										url: window.location.origin + "/odata/Connections('" + connections[i].Id + "')/Lists('" + connections[i].Lists[j].Id + "')?%24expand=Fields%2CRelatedChildren(%24expand%3DFields)"
									})
									/*jshint -W083 */
										.done(function (fields) {
											this.conns[this.conIndex].Lists[this.listIndex].Fields = fields.Fields;
											this.conns[this.conIndex].Lists[this.listIndex].CrossAppAccessLevel = fields.CrossAppAccessLevel;
											this.conns[this.conIndex].Lists[this.listIndex].RelatedChildren = fields.RelatedChildren;
											this.listDfer[this.indexValue].resolve();
										});

									listsDferIndex++;
								}
							}

							$.when.all(listsDfer).done(function (lists) {
								if (options.depth == 2) {
									return deferred.resolve(connections);
								}
							});
						}

					});

			}
		});
		return deferred.promise();
	}
};

/**
 * @summary UI functions
 * @desc UI functions
 * <br />
 * Functions in this group are synchronous
 * @namespace
 */
cnc.ui = {
	/**
	 * @summary Enumerate the functions in this namespace
	 * @desc Enumerate the functions in this namespace
	 */
	about : function () {
		cnc.fn.enumerateFunctions(this);
	},
	/**
	 * @summary Show the Page/Tab Guides
	 * @desc Show the Page/Tab Guides
	 */
	showPageGuides : function () {
		$('#tlyPageGuideWrapper').show();
	},
	/**
	 * @summary Hide the Page/Tab Guides
	 * @desc Hide the Page/Tab Guides
	 */
	hidePageGuides : function () {
		$('#tlyPageGuideWrapper').hide();
	},
	/**
	 * @summary Remove the Page/Tab Guides
	 * @desc Remove the Page/Tab Guides
	 * <br />
	 * Once removed, they cannot be added back programatically
	 */
	removePageGuides : function () {
		$('#tlyPageGuideWrapper').remove();
	}
};
/**
 * @summary UI Form functions
 * @desc UI Form functions
 * <br />
 * Functions in this group are asynchronous
 * @namespace
 * @example <caption>Example: Open a Create form, no overrides</caption>
 * var formOptions = new cnc.ui.form.options();
 * formOptions.actionTitle = 'New Task';
 *
 * cnc.ui.form.run(formOptions)
 * .done(function (results) {
 * console.log('Done:', results);
 * })
 * .fail(function (results) {
 * console.log('Fail:', results);
 * });
 * @example <caption>Example: Open an Update form, no overrides</caption>
 * var formOptions = new cnc.ui.form.options();
 * formOptions.actionTitle = 'Update Task';
 * formOptions.itemId = ''; // Item ID GUID goes here
 *
 * cnc.ui.form.run(formOptions)
 * .done(function (results) {
 * console.log('Done:', results);
 * })
 * .fail(function (results) {
 * console.log('Fail:', results);
 * });
 * @example <caption>Example: Open an Update form in Read mode</caption>
 * var formOptions = new cnc.ui.form.options();
 * formOptions.actionTitle = 'Update Task';
 * formOptions.itemId = ''; // Item ID GUID goes here
 * formOptions.form.actionType = 2;
 *
 * cnc.ui.form.run(formOptions)
 * .done(function (results) {
 * console.log('Done:', results);
 * })
 * .fail(function (results) {
 * console.log('Fail:', results);
 * });
 * @example <caption>Example: Open a Create form, with override</caption>
 * var formOptions = new cnc.ui.form.options();
 * formOptions.actionTitle = 'New Task';
 *
 * // Set ParentTask, a Relation column, to have a default value and make it required
 * var columnOptions = new cnc.ui.form.columnOptions();
 * columnOptions.DefaultValue = "ea691581-8fcc-431c-8cad-4cff98e41a82";
 * columnOptions.StaticName = 'ParentTask';
 * columnOptions.required = true;
 * formOptions.addColumn(columnOptions);
 *
 * // Set UserStory, a Relation column, to have a default value and make it readonly
 * columnOptions = new cnc.ui.form.columnOptions();
 * columnOptions.StaticName = 'UserStory';
 * columnOptions.DefaultValue = 'a02b771c-651c-44ba-b5da-21196796ea98';
 * columnOptions.ReadOnly = true;
 * formOptions.addColumn(columnOptions);
 *
 * // Set Status, a Choice column, to be modifiable (it is ReadOnly in the form)
 * columnOptions = new cnc.ui.form.columnOptions();
 * columnOptions.StaticName = 'Status';
 * columnOptions.ReadOnly = false;
 * formOptions.addColumn(columnOptions);
 *
 * cnc.ui.form.run(formOptions)
 * .done(function (results) {
 * console.log('Done:', results);
 * })
 * .fail(function (results) {
 * console.log('Fail:', results);
 * });
 * @example <caption>Example: Open a Create form, disabling full RTF of a Note column</caption>
 * var formOptions = new cnc.ui.form.options();
 * formOptions.actionTitle = 'New Task';
 * columnOptions = new cnc.ui.form.columnOptions();
 * columnOptions.StaticName = 'Details';
 * columnOptions.DisableRTF = true;
 * formOptions.addColumn(columnOptions);
 * cnc.ui.form.run(formOptions)
 * .done(function (results) {
 * console.log('Done:', results);
 * })
 * .fail(function (results) {
 * console.log('Fail:', results);
 * });
 */
cnc.ui.form = {
	/**
	 * @desc Enumerate the functions in this namespace
	 * @summary Enumerate the functions in this namespace
	 */
	about : function () {
		cnc.fn.enumerateFunctions(this);
	},
	/**
	 * @desc Constructor for Action options
	 * @summary Constructor for Action options
 	 * @name ui.Form.options
	 * @class
	 * @param {String} itemId - Id of the item for Edit, Delete, Read and Email actions
	 * @property {String}  actionTitle - Title of the action to be run
	 * @property {String}  itemId - Id of the item to be modified, read, deleted or emailed
	 * @property {ui.Form.formOptions}  form - Form overrides
	 * @property {ui.Form.columnOptions}  column - Array of column overrides
	 */
	options : function (itemId) {
		this.actionTitle = '';
		this.itemId = itemId || undefined;
		this.form = new cnc.ui.form.formOptions();
		this.column = [];
		/**
		 * @desc Add column overrides
		 * @summary Add column overrides
		 * @param {ui.Form.columnOptions} columnOpts - Options for column override
		 */
		this.addColumn = function (columnOpts) {
			columnOpts = _.cloneDeep(columnOpts);
			columnOpts = columnOpts || new cnc.ui.form.columnOptions();
			this.column.push(columnOpts);
		};
	},
	/**
	 * @desc Constructor for Form options
	 * @summary Constructor for Form options
	 * @class
	 * @name ui.Form.formOptions
	 * @property {String} actionType - Override the Action Type
	 */
	formOptions : function () {
		this.actionType = null;
	},
	/**
	 * @desc Constructor for Column options
	 * @summary Constructor for Column options
	 * @class
	 * @name ui.Form.columnOptions
	 * @property {String} StaticName - StaticName
	 */
	columnOptions : function () {
		this.StaticName = null;
		this.Title = null;
		this.DefaultValue = null;
		this.Required = null;
		this.IsRequired = null;
		this.ReadOnly = null;
		this.UseMe = null;
		this.UseValue = null;
		this.UseDescription = null;
		this.Description = null;
		this.DisableRTF = null;
		this.required = null;
	},
	/**
	 * @summary Open action in a pop-up window
	 * @desc Open action in a pop-up window
	 * @param {uiCss.options} options - function options
	 * @returns {jQuery.Promise.then<cn.results>| jQuery.Promise.fail<cn.results>}
	 */
	run : function (options) {
		// Handlers for different form field types
		var fieldHandler = {
			bool: function(index, formField) {
				if(fieldArray[index].DefaultValue){
					formField.attr('checked', 'checked');
					formField.trigger("change");
				} else {
					formField.removeAttr('checked');
					formField.trigger("change");
				}
			},
			multiUser: function(index, multiselect) {
				var userIndex;
				multiselect.options.dataSource.read().then(function () {
					multiselect.value(fieldArray[index].DefaultValue);
					multiselect.trigger("change");
					if (fieldArray[index].ReadOnly) {
						multiselect.enable(false);
					}
				});
			},
			multiChoice: function(index, multiselect) {
				var userIndex;
				multiselect.options.dataSource.read().then(function () {
					multiselect.value(fieldArray[index].DefaultValue);
					multiselect.trigger("change");
					if (fieldArray[index].ReadOnly) {
						multiselect.enable(false);
					}
				});
			},
			multiRelation: function(index, multiselect) {
				var userIndex;
				multiselect.options.dataSource.read().then(function () {
					multiselect.value(fieldArray[index].DefaultValue);
					multiselect.trigger("change");
					if (fieldArray[index].ReadOnly) {
						multiselect.enable(false);
					}
				});
			},
			user: function(index, dropdownlist) {
				if(dropdownlist === null){
					return;
				}
				var userIndex;
				dropdownlist.options.dataSource.read().then(function () {
					$.each(dropdownlist.options.dataSource.data(), function (i, item) {
						if(fieldArray[index].DefaultValue == item.Id){
							userIndex = i;
						}
					});
					dropdownlist.select(userIndex + 1);
					dropdownlist.trigger("change");
					if (fieldArray[index].ReadOnly) {
						dropdownlist.enable(false);
					}
				});
			},
			editor: function(index, formField) {
				var editor = formField.data("kendoEditor");
				editor.value(fieldArray[index].DefaultValue);
				editor.trigger("change");
			},
			dropdownRelation: function (index, dropdownlist) {
				if(dropdownlist === null){
					return;
				}
				var relationIndex;
				dropdownlist.options.dataSource.read().then(function () {
					$.each(dropdownlist.options.dataSource.data(), function (i, item) {
						if(fieldArray[index].DefaultValue == item.ItemId){
							relationIndex = i;
						}
					});
					dropdownlist.select(relationIndex + 1);
					dropdownlist.trigger("change");
					if (fieldArray[index].ReadOnly) {
						dropdownlist.enable(false);
					}
				});
			},
			dropdownLookup: function (index, dropdownlist) {
				if(dropdownlist === null){
					return;
				}
				var lookupIndex;
				dropdownlist.options.dataSource.read().then(function () {
					$.each(dropdownlist.options.dataSource.data(), function (i, item) {
						if(fieldArray[index].DefaultValue == item.LookUpValue){
							lookupIndex = i;
						}
					});
					dropdownlist.select(lookupIndex + 1);
					dropdownlist.trigger("change");
					if (fieldArray[index].ReadOnly) {
						dropdownlist.enable(false);
					}
				});
			},
			dropdownChoice: function (index, dropdownlist) {
				if(dropdownlist === null){
					return;
				}
				var lookupIndex;
				$.each(dropdownlist.options.dataSource, function (i, item) {
					if(fieldArray[index].DefaultValue == item.value){
						lookupIndex = i;
					}
				});
				dropdownlist.select(lookupIndex);
				dropdownlist.trigger("change");
				if (fieldArray[index].ReadOnly) {
					dropdownlist.enable(false);
				}
			},
			input: function (index, formField){
				formField.val(fieldArray[index].DefaultValue);
				formField.trigger("change");
			},
			number: function (index, numberTextBox){
				numberTextBox.value(fieldArray[index].DefaultValue);
				numberTextBox.trigger("change");
			},
			datetime: function(index, datepicker){
				datepicker.value(fieldArray[index].DefaultValue);
				datepicker.trigger("change");
			}
		};



		var deferred = $.Deferred();
		var results = new cnc.objects.results();
		var localOptions = options || new this.options();
		var localListInfo;
		var fieldArray = [];
		//	cnc.ui.form.work = {};
		if($('.actionWindow').length > 0){
			results.notificationMethod = 'error';
			results.type = 'Init';
			results.msg = 'Action form already open. Only one at a time allowed.';
			return deferred.reject(results);
		}
		if (!(_.isEqual(_.keys(localOptions), _.keys(new this.options())))) { // Is the structure of the options object matches what's expected
			results.notificationMethod = 'error';
			results.type = 'Init';
			results.msg = 'Options object inconsistent: ' + _.keys(localOptions);
			return deferred.reject(results);
		}
		if (!localOptions.actionTitle || localOptions.actionTitle === null || localOptions.actionTitle === '') {
			results.notificationMethod = 'error';
			results.type = 'Init';
			results.msg = 'run(options) required property \'options.actionTitle\' missing, null or blank';
			return deferred.reject(results);
		}

		var uid = Date.now();
		var listInfo;
		var actionDS = cc.api.getActionConfigsDS();
		var actionRendered = $.Deferred();
		var actionDone = $.Deferred();
		var story = this;
		actionDS.read().then(function () {
			var thisAction = _.find(actionDS.data(), {
				Title : localOptions.actionTitle
			});
			if (thisAction === undefined) {
				results.notificationMethod = 'error';
				results.type = 'Init';
				results.msg = 'Action not found: ' + localOptions.actionTitle;
				return deferred.reject(results);
			}
			if (localOptions.itemId === undefined && thisAction.Type !== 1) {
				results.notificationMethod = 'error';
				results.type = 'Init';
				results.msg = 'Action requires itemId ';
				return deferred.reject(results);
			}

			var actionConfig = JSON.parse(thisAction.ActionConfigJSON);


			$.each(actionConfig.Rows, (function (index, row) {
				$.each(row.Columns, (function (index, column) {
					$.each(column.Fields, (function (index, field) {
						fieldArray.push(field);
						$.each(localOptions.column, function (i, col) {
							if (col.StaticName == field.StaticName) {
								for (var key in col) {
									if (field[key] !== undefined && col[key] !== null) {
										field[key] = col[key];
									}
								}
							}
						});
					}));
				}));
			}));
			var actionViewModel = {
				type : localOptions.form.actionType || thisAction.Type,
				actionConfig : actionConfig,
				connectionId : thisAction.ConnectionId,
				listId : thisAction.ListId,
				itemId : localOptions.itemId,
				ds : 2,
				events : {
					trigger : function (evt) {
						var myWindow = $("#actionWindow_" + uid).data("kendoWindow");
						switch (evt) {
							case 'action:rendered':
								actionRendered.resolve();
								break;
							case 'action:cancel':
								actionDone.reject('info', 'User Cancelled');
								myWindow.close();
								break;
							case 'action:save':
								actionDone.resolve('Saved');
								myWindow.close();
						}
					}
				},
				redirect : false
			};
			$.when(actionRendered)
				.done(function () {
					var dropdownlist;
					var lists = cc.api.getListsDS();
					lists.read({
						$expand: 'Fields'
					})
						.done(function (){
							localListInfo = _.find(lists.data(), {
								Id: thisAction.ListId
							});
							$.each(fieldArray, (function (index, field) {
								$.each(localOptions.column, function (i, col) {
									if(col.StaticName == 'Title'){
										fieldType = 'Text';

									} else {
										colInfo =  _.find(localListInfo.Fields, {
											StaticName: col.StaticName
										});
										fieldType = colInfo.FieldType;

									}
									if (col.StaticName == field.StaticName) {
										for (var key in col) {
											if (field[key] !== undefined && col[key] !== null && key == 'DefaultValue') {
												var formField = $('[name=' + field.StaticName + ']');
												switch (fieldType) {
													case 'Text':
														fieldHandler.input(index, formField);
														break;
													case 'Boolean':
														fieldHandler.bool(index, formField);
														break;
													case 'Currency':
														numberTextBox = formField.data("kendoNumericTextBox");
														fieldHandler.number(index, numberTextBox);
														break;
													case 'DateTime':
														datePicker = formField.data("kendoDatePicker");
														if(datePicker === undefined) {
															datePicker = formField.data("kendoDateTimePicker");
														}
														fieldHandler.datetime(index, datePicker);
														break;
													case 'Note':
														fieldHandler.editor(index, formField);
														break;
													case 'Number':
														numberTextBox = formField.data("kendoNumericTextBox");
														fieldHandler.number(index, numberTextBox);
														break;
													case 'Choice':
														dropdownlist = formField.data("kendoDropDownList");
														fieldHandler.dropdownChoice(index, dropdownlist);
														break;
													case 'MultiChoice':
														multiselect = formField.data("kendoMultiSelect");
														fieldHandler.multiChoice(index, multiselect);
														break;
													case 'Lookup':
														dropdownlist = formField.data("kendoDropDownList");
														fieldHandler.dropdownLookup(index, dropdownlist);
														break;
													case 'User':
														dropdownlist = formField.data("kendoDropDownList");
														fieldHandler.user(index, dropdownlist);
														break;
													case 'MultiUser':
														multiselect = formField.data("kendoMultiSelect");
														fieldHandler.multiUser(index, multiselect);
														break;
													case 'Relation':
														dropdownlist = formField.data("kendoDropDownList");
														fieldHandler.dropdownRelation(index, dropdownlist);
														break;
													case 'MultiRelation':
														multiselect = formField.data("kendoMultiSelect");
														fieldHandler.multiRelation(index, multiselect);
														break;
													default:
												}
											}
										}
									}
								});

							}));
						});

				});
			$.when(actionDone).done(function (result) {
				results.notificationMethod = 'success';
				results.type = 'Run';
				results.msg = result;
				return deferred.resolve(results);
			})
				.fail(function (noti, err) {
					results.notificationMethod = noti;
					results.type = 'Run';
					results.msg = err;
					return deferred.reject(results);
				});
			$('body').append('<div class="actionWindow" id="actionWindow_' + uid + '"></div>');
			$("#actionWindow_" + uid).html(
				'<action-viewer id="actionViewer_' + uid + '" params="type: type, actionConfig: actionConfig, connectionId: connectionId, listId: listId, itemId: itemId, ds: ds, events: events, redirect: false">');

			ko.applyBindings(actionViewModel, document.getElementById('actionViewer_' + uid));
			var myWindow = $("#actionWindow_" + uid).kendoWindow({
				width : "800px",
				height : "600px",
				title : options.actionTitle,
				modal : true,
				visible : false,
				actions : [
					"Close"
				],
				close : function () {
					if (results.type === '' && results.msg === '') {
						actionDone.reject('info', 'User Cancelled');

					}
					this.destroy();
				}
			}).data("kendoWindow").center().open();

		});

		return deferred.promise();
	}

};


/**
 * @summary UI CSS functions
 * @desc UI CSS functions
 *	<br />
 * Functions in this group are asynchronous
 * @namespace
 * @example <caption>Example: Inject an HREF adn a style into the DOM</caption>
 * var css = new cnc.ui.css.options();
 * css.addHref('//2010sandbox.corasworks.net/Anonymous Library/CNC/cnc.css');
 * css.addStyle('span {	font-style:italic}');
 * cnc.ui.css.inject(css);
 */
cnc.ui.css = {
	/**
	 * @desc Enumerate the functions in this namespace
	 * @summary Enumerate the functions in this namespace
	 */
	about : function () {
		cnc.fn.enumerateFunctions(this);
	},
	/**
	 * @summary Constructor for UI CSS options
	 * @desc Constructor for UI CSS options
	 * @class
	 * @name uiCss.options
	 * @property {Array}  css - Array of styles and references
	 */
	options : function () {
		/* Array of additional CSS files/styles */
		this.css = [];
		/**
		 * @summary Add an HREF to the .css array
		 * @desc Add an HREF to the .css array
		 * @function
		 * @param {uri} href - The URI of a stylesheet to be injected into the DOM
		 */
		this.addHref = function (href) {
			if (href !== undefined && href !== null && href !== '') {
				this.css.push({
					type : 'href',
					value : href
				});
			}
		};
		/**
		 * @summary Add a style to the .css array
		 * @desc Add a style to the .css array
		 * @function
		 * @param {String} style - The style to be added (without the &lt;style&gt; tags &lt;/style&gt; )
		 */
		this.addStyle = function (style) {
			if (style !== undefined && style !== null && style !== '') {
				this.css.push({
					type : 'style',
					value : style
				});
			}
		};

	},
	/**
	 * @summary Inject styles and links into DOM
	 * @desc Inject styles and links into DOM
	 * @param {uiCss.options} options - function options
	 * @returns {jQuery.Promise.then<cn.results> | jQuery.Promise.fail<cn.results>}
	 */
	inject : function (options) {
		var deferred = $.Deferred();
		var results = new cnc.objects.results();
		options = options || new this.options();
		if (!(_.isEqual(_.keys(options), _.keys(new this.options())))) { // Is the structure of the options object matches what's expected
			results.type = 'Init';
			results.msg = 'Options object inconsistent: ' + _.keys(options);
			deferred.reject(results);
		} else {


			$.each(options.css, (function (index, css) {
				switch (css.type) {
					case 'href':
						$('head').append('<link rel="stylesheet" href="' + css.value + '" type="text/css" />');
						break;
					case 'style':
						$('head').append('<style>' + css.value + '</style>');
						break;
					default:
				}
			}));
			results.type = 'Success';
			results.msg = 'CSS applied';
			return deferred.resolve(results);
		}
		return deferred.promise();
	}

};


/**
 *  @summary Email functions
 *  @desc Email functions
 * <br />
 * Functions in this group are asynchronous.
 * @namespace
 * @example <caption>Example: Correct and complete</caption>
 * var sendEmail = new cnc.email.options();
 * sendEmail.emailBody = 'Any kind of HTML content can go in here. <em>Did I emphasize that?</em>';
 * sendEmail.emailSubject = 'From this app';
 * sendEmail.addTo('david.smiley@corascloud.com', 'David Smiley');
 * cnc.email.send(sendEmail)
 * .fail(function (results) {
     *  console.log('fail:', results);
     * })
 * .then(function (results) {
     *	console.log('success:', results);
     * });
 * @example <caption>Example: Incomplete (no emailTo) with failure</caption>
 * var sendEmail = new cnc.email.options();
 * sendEmail.emailBody = 'Any kind of HTML content can go in here. <em>Did I emphasize that?</em>';
 * sendEmail.emailSubject = 'From this app';
 * cnc.email.send(sendEmail)
 * .fail(function (results) {
     *  console.log('fail:', results);
     * })
 * .then(function (results) {
     *	console.log('success:', results);
     * });
 */
cnc.email = {
    /**
     * @desc Enumerate the functions in this namespace
     * @summary Enumerate the functions in this namespace
     */
    about : function () {
        cnc.email.enumerateFunctions(this);
    },
    /**
     * @summary Constructor for Email options
     * @desc Constructor for Email options
     * @class
     * @name email.options
     * @property {Array}  emailTo - An array of email recipients
     * @property {String} emailSubject - The subject line of the email
     * @property {String} emailBody - The body of the email
     */
    options : function () {
        this.emailTo = [];
        this.emailBody = '';
        this.emailSubject = '';
        /**
         * @summary Add a recipient to the .emailTo array
         * @desc Add a recipient to the .emailTo array
         * @function
         * @param {Email} emailAddress - The email address of the recipient
         * @param {String} displayName - The display name of the recipient
         */
        this.addTo = function (emailAddress, displayName) {
            this.emailTo.push(
                {
                    Email : emailAddress,
                    Display : displayName
                }
            );
        };
    },
    /**
     * @desc Send email
     * @summary Send email
     * @function
     * @param {email.options} options - Email options object
     * @returns {jQuery.Promise.then<cn.results> | jQuery.Promise.fail<cn.results>}
     */
    send: function(options){
        var deferred = $.Deferred();
        options = options || new this.options();
        var userDS;
        var results = new cnc.objects.results();
        if (!(_.isEqual(_.keys(options), _.keys(new this.options())))) { // Is the structure of the options object matches what's expected
            results.notificationMethod = 'error';
            results.type = 'System';
            results.msg = 'Options object inconsistent: ' + _.keys(options);
            return deferred.reject(results);
        }
        if(options.emailBody === undefined || options.emailBody === null || options.emailBody === ''){
            results.notificationMethod = 'error';
            results.type = 'System';
            results.msg = 'Required option emailBody is empty, null or missing';
            return deferred.reject(results);
        }
        if(options.emailSubject === undefined || options.emailSubject === null || options.emailSubject === ''){
            results.notificationMethod = 'error';
            results.type = 'System';
            results.msg = 'Required option emailSubject is empty, null or missing';
            return deferred.reject(results);
        }
        if(options.emailTo === undefined || options.emailTo === null || options.emailTo.length === 0){
            results.notificationMethod= 'error';
            results.type = 'System';
            results.msg = 'Required option emailTo is empty, null or missing';
            return deferred.reject(results);
        }
        var baseURL = window.location.origin;
        $.ajax({
            method : "POST",
            url : baseURL + "/api/Email",
            data : {Body:options.emailBody,
                Subject: options.emailSubject,
                To: options.emailTo,
                IsHtml:true
            }

        })
            .done(function (response) {
                results.notificationMethod= 'success';
                results.type = 'System';
                results.msg = 'Email sent';
                return deferred.resolve(results);
            })
            .fail(function (response) {
                results.notificationMethod= 'error';
                results.type = 'System';
                results.msg = response;
                return deferred.reject(results);
            });
        return deferred.promise();

    }
};

cnc.waitForLoad = function () {
	if (typeof _ !== "undefined") {
		return cnc.ready.resolve();
	} else {
		setTimeout(function () {
			cnc.waitForLoad();
		}, 250);
	}
};
cnc.waitForLoad();