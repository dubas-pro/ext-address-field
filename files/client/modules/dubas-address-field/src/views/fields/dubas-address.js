define('dubas-address-field:views/fields/dubas-address', 'views/fields/base', function (Dep) {

    return Dep.extend({

        type: 'dubasAddress',

        listTemplate: 'fields/address/detail',

        detailTemplate: 'fields/address/detail',

        editTemplate: 'dubas-address-field:fields/dubas-address/edit',

        editTemplate1: 'dubas-address-field:fields/dubas-address/edit-1',

        editTemplate2: 'dubas-address-field:fields/dubas-address/edit-2',

        editTemplate3: 'dubas-address-field:fields/dubas-address/edit-3',

        editTemplate4: 'dubas-address-field:fields/dubas-address/edit-4',

        searchTemplate: 'fields/address/search',

        events: {
            'click [data-action="viewMap"]': function (e) {
                e.preventDefault();
                e.stopPropagation();
                this.viewMapAction();
            },
        },

        data: function () {
            var data = Dep.prototype.data.call(this);
            data.ucName = Espo.Utils.upperCaseFirst(this.name);

            this.addressPartList.forEach(function (item) {
                var value = this.model.get(this[item + 'Field']);
                data[item + 'Value'] = value;
            }, this);

            if (this.mode == 'detail' || this.mode == 'list') {
                data.formattedAddress = this.getFormattedAddress();

                if (this.params.viewMap && this.canBeDisplayedOnMap()) {
                    data.viewMap = true;
                    data.viewMapLink = '#AddressMap/view/' + this.model.entityType + '/' + this.model.id + '/' + this.name;
                }
            }

            if (this.isEditMode()) {
                data.stateMaxLength = this.stateMaxLength;
                data.streetMaxLength = this.streetMaxLength;
                data.postalCodeMaxLength = this.postalCodeMaxLength;
                data.cityMaxLength = this.cityMaxLength;
                data.countryMaxLength = this.countryMaxLength;
            }

            return _.extend({
                countryList: this.getCountryList(),
            }, data);
        },

        getCountryList: function () {
            var countryListCodes =  this.getMetadata().get('fields.dubasAddress.fields.country.options') || [];

            var countryValue = this.model.get(this.countryField);
            var countryList = [
                countryValue
            ];
            countryListCodes.forEach(function (item) {
                if (item === countryValue) return;
                countryList.push(item);
            }, this);

            return countryList;
        },

        setupSearch: function () {
            this.searchData.value = this.getSearchParamsData().value || this.searchParams.additionalValue;
        },

        canBeDisplayedOnMap: function () {
            return !!this.model.get(this.name + 'City') || !!this.model.get(this.name + 'PostalCode');
        },

        getFormattedAddress: function () {
            var isNotEmpty = false;
            var isSet = false;
            this.addressAttributeList.forEach(function (attribute) {
                isNotEmpty = isNotEmpty || this.model.get(attribute);
                isSet = isSet || this.model.has(attribute);
            }, this);

            var isEmpty = !isNotEmpty;

            if (isEmpty) {
                if (this.mode === 'list') {
                    return '';
                }
                if (!isSet) {
                    return this.translate('...');
                }
                return this.translate('None');
            }

            var methodName = 'getFormattedAddress' + this.getAddressFormat().toString();

            if (methodName in this) {
                return this[methodName]();
            }
        },

        getFormattedAddress1: function () {
            var postalCodeValue = this.model.get(this.postalCodeField);
            var streetValue = this.model.get(this.streetField);
            var cityValue = this.model.get(this.cityField);
            var stateValue = this.model.get(this.stateField);
            var countryValue = this.translate(this.model.get(this.countryField), 'countryLabels', 'DubasAddress');

            var html = '';
            if (streetValue) {
                html += streetValue;
            }
            if (cityValue || stateValue || postalCodeValue) {
                if (html != '') {
                    html += '\n';
                }
                if (cityValue) {
                    html += cityValue;
                }
                if (stateValue) {
                    if (cityValue) {
                        html += ', ';
                    }
                    html += stateValue;
                }
                if (postalCodeValue) {
                    if (cityValue || stateValue) {
                        html += ' ';
                    }
                    html += postalCodeValue;
                }
            }
            if (countryValue) {
                if (html != '') {
                    html += '\n';
                }
                html += countryValue;
            }
            return html;
        },

        getFormattedAddress2: function () {
            var postalCodeValue = this.model.get(this.postalCodeField);
            var streetValue = this.model.get(this.streetField);
            var cityValue = this.model.get(this.cityField);
            var stateValue = this.model.get(this.stateField);
            var countryValue = this.translate(this.model.get(this.countryField), 'countryLabels', 'DubasAddress');

            var html = '';
            if (streetValue) {
                html += streetValue;
            }
            if (cityValue || postalCodeValue) {
                if (html != '') {
                    html += '\n';
                }
                if (postalCodeValue) {
                    html += postalCodeValue;
                    if (cityValue) {
                        html += ' ';
                    }
                }
                if (cityValue) {
                    html += cityValue;
                }
            }
            if (stateValue || countryValue) {
                if (html != '') {
                    html += '\n';
                }
                if (stateValue) {
                    html += stateValue;
                    if (countryValue) {
                        html += ' ';
                    }
                }
                if (countryValue) {
                    html += countryValue;
                }
            }
            return html;
        },

        getFormattedAddress3: function () {
            var postalCodeValue = this.model.get(this.postalCodeField);
            var streetValue = this.model.get(this.streetField);
            var cityValue = this.model.get(this.cityField);
            var stateValue = this.model.get(this.stateField);
            var countryValue = this.translate(this.model.get(this.countryField), 'countryLabels', 'DubasAddress');

            var html = '';
            if (countryValue) {
                html += countryValue;
            }
            if (cityValue || stateValue || postalCodeValue) {
                if (html != '') {
                    html += '\n';
                }
                if (postalCodeValue) {
                    html += postalCodeValue;
                }
                if (stateValue) {
                    if (postalCodeValue) {
                        html += ' ';
                    }
                    html += stateValue;
                }
                if (cityValue) {
                    if (postalCodeValue || stateValue) {
                        html += ' ';
                    }
                    html += cityValue;
                }
            }
            if (streetValue) {
                if (html != '') {
                    html += '\n';
                }
                html += streetValue;
            }
            return html;
        },

        getFormattedAddress4: function () {
            var postalCodeValue = this.model.get(this.postalCodeField);
            var streetValue = this.model.get(this.streetField);
            var cityValue = this.model.get(this.cityField);
            var stateValue = this.model.get(this.stateField);
            var countryValue = this.translate(this.model.get(this.countryField), 'countryLabels', 'DubasAddress');

            var html = '';
            if (streetValue) {
                html += streetValue;
            }
            if (cityValue) {
                if (html != '') {
                    html += '\n';
                }
                html += cityValue;
            }
            if (countryValue || stateValue || postalCodeValue) {
                if (html != '') {
                    html += '\n';
                }
                if (countryValue) {
                    html += countryValue;
                }
                if (stateValue) {
                    if (countryValue) {
                        html += ' - ';
                    }
                    html += stateValue;
                }
                if (postalCodeValue) {
                    if (countryValue || stateValue) {
                        html += ' ';
                    }
                    html += postalCodeValue;
                }
            }

            return html;
        },

        _getTemplateName: function () {
            if (this.mode == 'edit') {
                var prop = 'editTemplate' + this.getAddressFormat().toString();
                if (prop in this) {
                    return this[prop];
                }
            }
            return Dep.prototype._getTemplateName.call(this);
        },

        getAddressFormat: function () {
            return this.getConfig().get('addressFormat') || 1;
        },

        afterRender: function () {
            var self = this;

            if (this.mode == 'edit') {
                this.$street = this.$el.find('[data-name="' + this.streetField + '"]');
                this.$postalCode = this.$el.find('[data-name="' + this.postalCodeField + '"]');
                this.$state = this.$el.find('[data-name="' + this.stateField + '"]');
                this.$city = this.$el.find('[data-name="' + this.cityField + '"]');
                this.$country = this.$el.find('[data-name="' + this.countryField + '"]');

                this.$street.on('change', function () {
                    self.trigger('change');
                });
                this.$postalCode.on('change', function () {
                    self.trigger('change');
                });
                this.$state.on('change', function () {
                    self.trigger('change');
                });
                this.$city.on('change', function () {
                    self.trigger('change');
                });
                this.$country.on('change', function () {
                    self.trigger('change');
                });

                var countryList = this.getConfig().get('addressCountryList') || [];
                if (countryList.length) {
                    this.$country.autocomplete({
                        minChars: 0,
                        lookup: countryList,
                        maxHeight: 200,
                        formatResult: function (suggestion) {
                            return this.getHelper().escapeString(suggestion.value);
                        }.bind(this),
                        lookupFilter: function (suggestion, query, queryLowerCase) {
                            if (suggestion.value.toLowerCase().indexOf(queryLowerCase) === 0) {
                                if (suggestion.value.length === queryLowerCase.length) return false;
                                return true;
                            }
                            return false;
                        },
                        onSelect: function () {
                            this.trigger('change');
                        }.bind(this)
                    });
                    this.$country.on('focus', function () {
                        if (this.$country.val()) return;
                        this.$country.autocomplete('onValueChange');
                    }.bind(this));
                    this.once('render', function () {
                        this.$country.autocomplete('dispose');
                    }, this);
                    this.once('remove', function () {
                        this.$country.autocomplete('dispose');
                    }, this);
                    this.$country.attr('autocomplete', 'espo-country');
                }

                this.controlStreetTextareaHeight();
                this.$street.on('input', function (e) {
                    this.controlStreetTextareaHeight();
                }.bind(this));

                var cityList = this.getConfig().get('addressCityList') || [];
                if (cityList.length) {
                    this.$city.autocomplete({
                        minChars: 0,
                        lookup: cityList,
                        maxHeight: 200,
                        formatResult: function (suggestion) {
                            return this.getHelper().escapeString(suggestion.value);
                        }.bind(this),
                        lookupFilter: function (suggestion, query, queryLowerCase) {
                            if (suggestion.value.toLowerCase().indexOf(queryLowerCase) === 0) {
                                if (suggestion.value.length === queryLowerCase.length) return false;
                                return true;
                            }
                            return false;
                        },
                        onSelect: function () {
                            this.trigger('change');
                        }.bind(this)
                    });
                    this.$city.on('focus', function () {
                        if (this.$city.val()) return;
                        this.$city.autocomplete('onValueChange');
                    }.bind(this));
                    this.once('render', function () {
                        this.$city.autocomplete('dispose');
                    }, this);
                    this.once('remove', function () {
                        this.$city.autocomplete('dispose');
                    }, this);
                    this.$city.attr('autocomplete', 'espo-city');
                }

                this.controlStreetTextareaHeight();
                this.$street.on('input', function (e) {
                    this.controlStreetTextareaHeight();
                }.bind(this));

                var stateList = this.getConfig().get('addressStateList') || [];
                if (stateList.length) {
                    this.$state.autocomplete({
                        minChars: 0,
                        lookup: stateList,
                        maxHeight: 200,
                        formatResult: function (suggestion) {
                            return this.getHelper().escapeString(suggestion.value);
                        }.bind(this),
                        lookupFilter: function (suggestion, query, queryLowerCase) {
                            if (suggestion.value.toLowerCase().indexOf(queryLowerCase) === 0) {
                                if (suggestion.value.length === queryLowerCase.length) return false;
                                return true;
                            }
                            return false;
                        },
                        onSelect: function () {
                            this.trigger('change');
                        }.bind(this)
                    });
                    this.$state.on('focus', function () {
                        if (this.$state.val()) return;
                        this.$state.autocomplete('onValueChange');
                    }.bind(this));
                    this.once('render', function () {
                        this.$state.autocomplete('dispose');
                    }, this);
                    this.once('remove', function () {
                        this.$state.autocomplete('dispose');
                    }, this);
                    this.$state.attr('autocomplete', 'espo-state');
                }

                this.controlStreetTextareaHeight();
                this.$street.on('input', function (e) {
                    this.controlStreetTextareaHeight();
                }.bind(this));
            }
        },

        controlStreetTextareaHeight: function (lastHeight) {
            var scrollHeight = this.$street.prop('scrollHeight');
            var clientHeight = this.$street.prop('clientHeight');

            if (typeof lastHeight === 'undefined' && clientHeight === 0) {
                setTimeout(this.controlStreetTextareaHeight.bind(this), 10);
                return;
            }

            if (clientHeight === lastHeight) return;

            if (scrollHeight > clientHeight + 1) {
                var rows = this.$street.prop('rows');
                this.$street.attr('rows', rows + 1);
                this.controlStreetTextareaHeight(clientHeight);
            }
            if (this.$street.val().length === 0) {
                this.$street.attr('rows', 1);
            }
        },

        setup: function () {
            Dep.prototype.setup.call(this);

            var actualAttributePartList = this.getMetadata().get(['fields', this.type, 'actualFields']) || [];
            this.addressAttributeList = [];
            this.addressPartList = [];
            actualAttributePartList.forEach(function (item) {
                var attribute = this.name + Espo.Utils.upperCaseFirst(item);
                this.addressAttributeList.push(attribute);
                this.addressPartList.push(item);
                this[item + 'Field'] = attribute;

                this[item + 'MaxLength'] = this.getMetadata().get(['entityDefs', this.model.name, 'fields', attribute, 'maxLength']);
            }, this);
        },

        validateRequired: function () {
            var validate = function (name) {
                if (this.model.isRequired(name)) {
                    if (this.model.get(name) === '') {
                        var msg = this.translate('fieldIsRequired', 'messages').replace('{field}', this.translate(name, 'fields', this.model.name));
                        this.showValidationMessage(msg, '[data-name="'+name+'"]');
                        return true;
                    }
                }
            }.bind(this);

            var result = false;
            result = validate(this.postalCodeField) || result;
            result = validate(this.streetField) || result;
            result = validate(this.stateField) || result;
            result = validate(this.cityField) || result;
            result = validate(this.countryField) || result;
            return result;
        },

        isRequired: function () {
            return this.model.getFieldParam(this.postalCodeField, 'required') ||
                   this.model.getFieldParam(this.streetField, 'required') ||
                   this.model.getFieldParam(this.stateField, 'required') ||
                   this.model.getFieldParam(this.cityField, 'required') ||
                   this.model.getFieldParam(this.countryField, 'required');
        },

        fetch: function () {
            var data = {};
            data[this.postalCodeField] = this.$postalCode.val().toString().trim();
            data[this.streetField] = this.$street.val().toString().trim();
            data[this.stateField] = this.$state.val().toString().trim();
            data[this.cityField] = this.$city.val().toString().trim();
            data[this.countryField] = this.$country.val().toString().trim();
            return data;
        },

        fetchSearch: function () {
            var value = this.$el.find('input.main-element').val().toString().trim();
            if (value) {
                var data = {
                    type: 'or',
                    value: [
                        {
                            type: 'like',
                            field: this.postalCodeField,
                            value: value + '%'
                        },
                        {
                            type: 'like',
                            field: this.streetField,
                            value: value + '%'
                        },
                        {
                            type: 'like',
                            field: this.cityField,
                            value: value + '%'
                        },
                        {
                            type: 'like',
                            field: this.stateField,
                            value: value + '%'
                        },
                            {
                            type: 'like',
                            field: this.countryField,
                            value: value + '%'
                        }
                    ],
                    data: {
                        value: value
                    }
                };
                return data;
            }
            return false;
        },

        viewMapAction: function () {
            this.createView('mapDialog', 'views/modals/view-map', {
                model: this.model,
                field: this.name,
            }, function (view) {
                view.render();
            });
        },

    });
});
