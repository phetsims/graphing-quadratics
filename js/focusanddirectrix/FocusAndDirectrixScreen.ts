// Copyright 2018-2025, University of Colorado Boulder

/**
 * The 'Focus and Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import Tandem from '../../../tandem/js/Tandem.js';
import GQColors from '../common/GQColors.js';
import GQScreenIconFactory from '../common/view/GQScreenIconFactory.js';
import graphingQuadratics from '../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../GraphingQuadraticsStrings.js';
import FocusAndDirectrixModel from './model/FocusAndDirectrixModel.js';
import FocusAndDirectrixScreenView from './view/FocusAndDirectrixScreenView.js';
import FocusAndDirectrixKeyboardHelpContent from './view/FocusAndDirectrixKeyboardHelpContent.js';

export default class FocusAndDirectrixScreen extends Screen<FocusAndDirectrixModel, FocusAndDirectrixScreenView> {

  public constructor( tandem: Tandem ) {

    const options: ScreenOptions = {
      name: GraphingQuadraticsStrings.screen.focusAndDirectrixStringProperty,
      backgroundColorProperty: GQColors.screenBackgroundColorProperty,
      homeScreenIcon: GQScreenIconFactory.createFocusAndDirectrixScreenIcon(),
      screenButtonsHelpText: GraphingQuadraticsStrings.a11y.focusAndDirectrixScreen.screenButtonsHelpTextStringProperty,
      createKeyboardHelpNode: () => new FocusAndDirectrixKeyboardHelpContent(),
      tandem: tandem,

      // Workaround for https://github.com/phetsims/joist/issues/532, which will not be fixed.
      navigationBarIcon: GQScreenIconFactory.createFocusAndDirectrixScreenIcon()
    };

    super(
      () => new FocusAndDirectrixModel( tandem.createTandem( 'model' ) ),
      model => new FocusAndDirectrixScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

graphingQuadratics.register( 'FocusAndDirectrixScreen', FocusAndDirectrixScreen );