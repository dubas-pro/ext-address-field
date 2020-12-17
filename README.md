# Dubas Address field for EspoCRM
![Screenshot of Dubas Address for EspoCRM](https://devcrm.it/files/2020-12-13_02-16-07_0002ae-Ez-859608_7789aacfd57032.png)
Free extension which will add new field type to your EspoCRM and let you to create new field with enum list of countries instead of varchar. 
Extension created by devcrm.it to EspoCRM. Extension is available for download as an extension to EspoCRM at [https://devcrm.it/address](https://devcrm.it/address).

Our extension already have imported list of countries. We've managed to import all countries thanks to [https://github.com/umpirsky/country-list](https://github.com/umpirsky/country-list). Extension have simple structure. As `value` we used country codes in [ISO 3166-1 alpha-2 format](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)(for United States it will be US). As label we've created translation files in 29 languages. Example of structure for United States in `en_US` language: `'US' => 'United States'`.

This repo is for comments only, but we do not give any warranty for the theme or installer. You install this theme on your own responsibility. We do not provide additional free support.

### Available translations of countries
- bg_BG
- cs_CZ
- da_DK
- de_DE
- en_GB
- en_US
- es_ES
- es_MX
- fa_IR
- fr_FR
- hr_HR
- hu_HU
- id_ID
- it_IT
- lt_LT
- lv_LV
- nb_NO
- nl_NL
- pl_PL
- pt_BR
- ro_RO
- ru_RU
- sk_SK
- sr_RS
- tr_TR
- uk_UA
- vi_VN
- zh_CN
- zh_TW

If you want to add own translation, you can do so by yourself. Just copy a [folder en_US](https://github.com/dubas-pro/ext-address-field/tree/main/files/application/Espo/Modules/DubasAddressField/Resources/i18n/en_US) and just to your needs. You can also create a pull request to this repo. 


## Requirements
1. EspoCRM in version higher than 6.0.0.
2. PHP 7.2+


## Getting started
1. Open our website [https://devcrm.it/address](https://devcrm.it/address) and download installer;
2. Login to your EspoCRM as admin;
3. Go to admin section and open extensions page;
4. Choose installer from you computer and start installation process;
5. Go to Entity Manager and choose target entity in which you want to create new address field;
6. Create new field with type "DUBAS Address" and choose name of field.

## FAQ
1. **Can i change already created address fields to Dubas Address?** <br />
Yes, you can. Just change field type to `dubasAddress`. <br />Please remember that we're using in Country field enum list with country codes as values. That's mean that if you have already existing records in this entity which have different values than [ISO 3166-1 alpha-2 format](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements), you should edit them first. For example if you had something like USA or United States, you should change that to `US`.

**Remember about rebuilding your EspoCRM after that change.**

2. **What with fields which are not available in Custom directory?**<br />
You can also change that field to `DubasAddress`. Here you have an example for `billingAddress`:
```
"billingAddress": {
  "type": "dubasAddress",
  "isCustom": true
},
```
**Please remember that you should first adjust content of addressCountry field to [ISO 3166-1 alpha-2 format](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)**

**Remember about rebuilding your EspoCRM after that change.**

## Support
This extension is shared without any support. Extension is available as it is.
If you want to order some service, all information about us you can find on our website [https://devcrm.it/](https://devcrm.it/).
