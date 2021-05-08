<?php
namespace Grav\Theme;

use Grav\Common\Data\Blueprints;
use Grav\Common\Theme;
use Grav\Common\Utils;
use RocketTheme\Toolbox\Event\Event;

class AkazieWood extends Theme
{

  public function getThemeConfigKey($key = null) {
    $pluginKey = 'themes.' . $this->name;
    return ($key !== null) ? $pluginKey . '.' . $key : $pluginKey;
  }

  public function getThemeConfigValue($key = null, $default = null) {
    return $this->config->get($this->getThemeConfigKey($key), $default);
  }

  public function getConfigValue($key, $default = null) {
    return $this->config->get($key, $default);
  }

  public static function getSubscribedEvents()
  {
    return [
      'onBlueprintCreated' => ['onBlueprintCreated', 0],
      'onTwigSiteVariables'   => ['onTwigSiteVariables', 0]
    ];
  }

  public function onBlueprintCreated(Event $event)
  {
    $newtype = $event['type'];

    if (0 === strpos($newtype, 'modular/')) {
    } else {
      $blueprint = $event['blueprint'];
      if ($blueprint->get('form/fields/tabs', null, '/')) {

        $blueprints = new Blueprints(__DIR__ . '/blueprints/extended/');
        $extends = $blueprints->get('options');
        $blueprint->extend($extends, true);
      }
    }

    $blueprint = $event['blueprint'];
    if ($blueprint->get('form/fields/tabs', null, '/')) {

      $blueprints = new Blueprints(__DIR__ . '/blueprints/extended/');
      $extends = $blueprints->get('advanced');
      $blueprint->extend($extends, true);

    }

  }

  public function onTwigSiteVariables()
  {
    if(Utils::isAdminPlugin()){
      return [];
    }

    $custom_css = __DIR__ . '/custom/css/custom.css';
    $custom_js = __DIR__ . '/custom/js/custom.js';
    /*
    if(!file_exists($custom_css)){
      file_put_contents($custom_css, '');
    }
    */

      if($this->getThemeConfigValue('style.css')){
            if(file_exists($custom_css)){
                $this->grav['assets']->addCss('theme://custom/css/custom.css', ['priority' => 10]);
            }
      }

    $this->grav['assets']->addCss('theme://build/css/akazie-wood.min.css', ['priority' => 100]);
    $this->grav['assets']->addJs('theme://build/js/akazie-wood.core.min.js', ['group' => 'bottom', 'priority' => 100]);
    $this->grav['assets']->addJs('theme://build/js/akazie-wood.app.min.js', ['group' => 'bottom', 'priority' => 95]);
    if($this->getThemeConfigValue('style.js')){
          if(file_exists($custom_js)){
              $this->grav['assets']->addJs('theme://custom/js/custom.js', ['group' => 'bottom', 'priority' => 55]);
          }
    }
  }



}
