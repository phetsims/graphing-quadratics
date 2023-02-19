// Copyright 2018-2022, University of Colorado Boulder

// @ts-nocheck
/**
 * The 'Focus and Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import GQColors from '../common/GQColors.js';
import GQScreenIconFactory from '../common/view/GQScreenIconFactory.js';
import graphingQuadratics from '../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../GraphingQuadraticsStrings.js';
import FocusAndDirectrixModel from './model/FocusAndDirectrixModel.js';
import FocusAndDirectrixScreenView from './view/FocusAndDirectrixScreenView.js';

export default class FocusAndDirectrixScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    const options = {

      // Screen options
      name: GraphingQuadraticsStrings.screen.focusAndDirectrixStringProperty,
      backgroundColorProperty: new Property( GQColors.SCREEN_BACKGROUND ),
      homeScreenIcon: GQScreenIconFactory.createFocusAndDirectrixScreenIcon(),

      // Workaround for https://github.com/phetsims/joist/issues/532, which will not be fixed.
      navigationBarIcon: GQScreenIconFactory.createFocusAndDirectrixScreenIcon(),

      // phet-io
      tandem: tandem
    };

    super(
      () => new FocusAndDirectrixModel( tandem.createTandem( 'model' ) ),
      model => new FocusAndDirectrixScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

graphingQuadratics.register( 'FocusAndDirectrixScreen', FocusAndDirectrixScreen );