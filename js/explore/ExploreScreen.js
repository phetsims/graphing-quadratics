// Copyright 2018-2021, University of Colorado Boulder

/**
 * The 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import GQColors from '../common/GQColors.js';
import GQScreenIconFactory from '../common/view/GQScreenIconFactory.js';
import graphingQuadratics from '../graphingQuadratics.js';
import graphingQuadraticsStrings from '../graphingQuadraticsStrings.js';
import ExploreModel from './model/ExploreModel.js';
import ExploreScreenView from './view/ExploreScreenView.js';

class ExploreScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    const options = {

      // Screen options
      name: graphingQuadraticsStrings.screen.explore,
      backgroundColorProperty: new Property( GQColors.SCREEN_BACKGROUND ),
      homeScreenIcon: GQScreenIconFactory.createExploreScreenIcon(),

      // Workaround for https://github.com/phetsims/joist/issues/532, which will not be fixed.
      navigationBarIcon: GQScreenIconFactory.createExploreScreenIcon(),

      // phet-io
      tandem: tandem
    };

    super(
      () => new ExploreModel( tandem.createTandem( 'model' ) ),
      model => new ExploreScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

graphingQuadratics.register( 'ExploreScreen', ExploreScreen );
export default ExploreScreen;