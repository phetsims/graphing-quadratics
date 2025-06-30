// Copyright 2018-2025, University of Colorado Boulder

/**
 * The 'Explore' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen, { ScreenOptions } from '../../../joist/js/Screen.js';
import Tandem from '../../../tandem/js/Tandem.js';
import GQColors from '../common/GQColors.js';
import GQScreenIconFactory from '../common/view/GQScreenIconFactory.js';
import graphingQuadratics from '../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../GraphingQuadraticsStrings.js';
import ExploreModel from './model/ExploreModel.js';
import ExploreScreenView from './view/ExploreScreenView.js';

export default class ExploreScreen extends Screen<ExploreModel, ExploreScreenView> {

  public constructor( tandem: Tandem ) {

    const options: ScreenOptions = {
      name: GraphingQuadraticsStrings.screen.exploreStringProperty,
      backgroundColorProperty: GQColors.screenBackgroundColorProperty,
      homeScreenIcon: GQScreenIconFactory.createExploreScreenIcon(),
      screenButtonsHelpText: GraphingQuadraticsStrings.a11y.exploreScreen.screenButtonsHelpTextStringProperty,
      tandem: tandem,

      // Workaround for https://github.com/phetsims/joist/issues/532, which will not be fixed.
      navigationBarIcon: GQScreenIconFactory.createExploreScreenIcon()
    };

    super(
      () => new ExploreModel( tandem.createTandem( 'model' ) ),
      model => new ExploreScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

graphingQuadratics.register( 'ExploreScreen', ExploreScreen );