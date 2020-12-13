<textarea class="form-control auto-height" data-name="{{name}}Street" rows="1" placeholder="{{translate 'Street'}}" autocomplete="espo-street" maxlength="{{streetMaxLength}}">{{streetValue}}</textarea>
<div class="row">
    <div class="col-sm-6 col-xs-6">
        <input type="text" class="form-control" data-name="{{name}}PostalCode" value="{{postalCodeValue}}" placeholder="{{translate 'PostalCode'}}" autocomplete="espo-postalCode" maxlength="{{postalCodeMaxLength}}">
    </div>
    <div class="col-sm-6 col-xs-6">
        <input type="text" class="form-control" data-name="{{name}}City" value="{{cityValue}}" placeholder="{{translate 'City'}}" autocomplete="espo-city" maxlength="{{cityMaxLength}}">
    </div>
</div>
<div class="row">
    <div class="col-sm-6 col-xs-6">
        <input type="text" class="form-control" data-name="{{name}}State" value="{{stateValue}}" placeholder="{{translate 'State'}}" autocomplete="espo-state" maxlength="{{stateMaxLength}}">
    </div>
    <div class="col-sm-6 col-xs-6">
        <select data-name="{{name}}Country" class="form-control main-element">
            {{#each countryList}}
                <option value="{{./this}}">{{translate this category='countryLabels' scope='DubasAddress'}}</option>
            {{/each}}
        </select>
    </div>
</div>
