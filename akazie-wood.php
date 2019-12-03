<?php
namespace Grav\Theme;

use Grav\Common\Data\Blueprints;
use Grav\Common\Theme;
use Grav\Common\Utils;
use RocketTheme\Toolbox\Event\Event;

class AkazieWood extends Theme
{

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
    $this->grav['assets']->addCss('theme://build/css/akazie-wood.min.css');
    $this->grav['assets']->addJs('theme://build/js/akazie-wood.core.min.js', ['group' => 'bottom', 'priority' => 100]);
    $this->grav['assets']->addJs('theme://build/js/akazie-wood.app.min.js', ['group' => 'bottom', 'priority' => 95]);

  }

}
