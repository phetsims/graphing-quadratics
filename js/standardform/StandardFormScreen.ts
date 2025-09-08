// Copyright 2014-2025, University of Colorado Boulder

/**
 * The 'Standard Form' screen.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import Tandem from '../../../tandem/js/Tandem.js';
import GQColors from '../common/GQColors.js';
import GQScreenIconFactory from '../common/view/GQScreenIconFactory.js';
import graphingQuadratics from '../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../GraphingQuadraticsStrings.js';
import StandardFormModel from './model/StandardFormModel.js';
import StandardFormScreenView from './view/StandardFormScreenView.js';
import StandardFormKeyboardHelpContent from './view/StandardFormKeyboardHelpContent.js';

export default class StandardFormScreen extends Screen<StandardFormModel, StandardFormScreenView> {

  public constructor( tandem: Tandem ) {

    const options: ScreenOptions = {
      name: GraphingQuadraticsStrings.screen.standardFormStringProperty,
      backgroundColorProperty: GQColors.screenBackgroundColorProperty,
      homeScreenIcon: GQScreenIconFactory.createStandardFormScreenIcon( 10 ),
      screenButtonsHelpText: GraphingQuadraticsStrings.a11y.standardFormScreen.screenButtonsHelpTextStringProperty,
      createKeyboardHelpNode: () => new StandardFormKeyboardHelpContent(),
      tandem: tandem,

      // Workaround for https://github.com/phetsims/joist/issues/532, which will not be fixed.
      navigationBarIcon: GQScreenIconFactory.createStandardFormScreenIcon( 20 )
    };

    super(
      () => new StandardFormModel( tandem.createTandem( 'model' ) ),
      model => new StandardFormScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

graphingQuadratics.register( 'StandardFormScreen', StandardFormScreen );