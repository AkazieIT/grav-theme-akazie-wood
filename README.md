# Akazie - Wood Theme

![akazie-holz](https://user-images.githubusercontent.com/15847494/69813757-22fdb980-11f3-11ea-9bdd-0cd9e7f3a696.png)


**Akazie - Wood**, this is a theme of Akazie IT GmbH and is intended for simple websites without great features. Works with the [Grav CMS](http://github.com/getgrav/grav).

## Sample

Show it on the [demo site](https://demo.akazie.com/akazie-wood)

## Intstallation

1. From the root of your Grav installation, run `bin/gpm install akazie-wood`.
   - Alternatively, download this repository, unzip it, rename the folder to `akazie-wood`, and place it in the `user/themes/` directory of your Grav install
2. Edit `user/config/system.yaml` to contain the following:
	```yaml
    pages:
      theme: akazie-wood
	```
3. For production sites please activate cache. ** If you do not activate cache, you will have very long load times because of the responsive images in the modular/image module **

Alternatively, you can install `Akazie - Wood` via the Grav Admin interface.

## Theme settings

It is possible to change various theme settings:

* Upload your own logo and favicon
* Change the colors of the theme
* Change the font
* Add the Google maps API key
* Choose your Map (Google map or Open street map)
* Add your own CSS file
* Fixed header
* Limit numbers of navigation links
* Manage imprint and data policy visibility
* Add a full screen custom footer
* Add parallax scrolling
* much more

These settings can be changed directly in the backend without time-consuming changes via FTP

Optionally, in the theme folder `/custom/css`,
the file `custom.css` can be used to define your own styles and to override the existing formatting.
