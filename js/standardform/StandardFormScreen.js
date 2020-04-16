// Copyright 2014-2020, University of Colorado Boulder

/**
 * The 'Standard Form' screen.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import GQColors from '../common/GQColors.js';
import GQScreenIconFactory from '../common/view/GQScreenIconFactory.js';
import graphingQuadratics from '../graphingQuadratics.js';
import graphingQuadraticsStrings from '../graphingQuadraticsStrings.js';
import StandardFormModel from './model/StandardFormModel.js';
import StandardFormScreenView from './view/StandardFormScreenView.js';

class StandardFormScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    const options = {

      // Screen options
      name: graphingQuadraticsStrings.screen.standardForm,
      backgroundColorProperty: new Property( GQColors.SCREEN_BACKGROUND ),
      homeScreenIcon: GQScreenIconFactory.createStandardFormScreenIcon(),
      //TODO remove this workaround for https://github.com/phetsims/joist/issues/532
      navigationBarIcon: GQScreenIconFactory.createStandardFormScreenIcon(),

      // phet-io
      tandem: tandem
    };

    super(
      () => new StandardFormModel( tandem.createTandem( 'model' ) ),
      model => new StandardFormScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

graphingQuadratics.register( 'StandardFormScreen', StandardFormScreen );
export default StandardFormScreen;