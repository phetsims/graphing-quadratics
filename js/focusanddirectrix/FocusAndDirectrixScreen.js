// Copyright 2018, University of Colorado Boulder

/**
 * The 'Focus and Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import GQColors from '../common/GQColors.js';
import GQScreenIconFactory from '../common/view/GQScreenIconFactory.js';
import graphingQuadraticsStrings from '../graphing-quadratics-strings.js';
import graphingQuadratics from '../graphingQuadratics.js';
import FocusAndDirectrixModel from './model/FocusAndDirectrixModel.js';
import FocusAndDirectrixScreenView from './view/FocusAndDirectrixScreenView.js';

const screenFocusAndDirectrixString = graphingQuadraticsStrings.screen.focusAndDirectrix;

class FocusAndDirectrixScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    const options = {

      // Screen options
      name: screenFocusAndDirectrixString,
      backgroundColorProperty: new Property( GQColors.SCREEN_BACKGROUND ),
      homeScreenIcon: GQScreenIconFactory.createFocusAndDirectrixScreenIcon(),
      //TODO remove this workaround for https://github.com/phetsims/joist/issues/532
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
export default FocusAndDirectrixScreen;