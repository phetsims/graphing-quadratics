// Copyright 2014-2020, University of Colorado Boulder

/**
 * The 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Property from '../../../axon/js/Property.js';
import Screen from '../../../joist/js/Screen.js';
import GQColors from '../common/GQColors.js';
import GQScreenIconFactory from '../common/view/GQScreenIconFactory.js';
import graphingQuadratics from '../graphingQuadratics.js';
import graphingQuadraticsStrings from '../graphingQuadraticsStrings.js';
import VertexFormModel from './model/VertexFormModel.js';
import VertexFormScreenView from './view/VertexFormScreenView.js';

class VertexFormScreen extends Screen {

  /**
   * @param {Tandem} tandem
   */
  constructor( tandem ) {

    const options = {

      // Screen options
      name: graphingQuadraticsStrings.screen.vertexForm,
      backgroundColorProperty: new Property( GQColors.SCREEN_BACKGROUND ),
      homeScreenIcon: GQScreenIconFactory.createVertexFormScreenIcon(),
      //TODO remove this workaround for https://github.com/phetsims/joist/issues/532
      navigationBarIcon: GQScreenIconFactory.createVertexFormScreenIcon(),

      // phet-io
      tandem: tandem
    };

    super(
      () => new VertexFormModel( tandem.createTandem( 'model' ) ),
      model => new VertexFormScreenView( model, tandem.createTandem( 'view' ) ),
      options
    );
  }
}

graphingQuadratics.register( 'VertexFormScreen', VertexFormScreen );
export default VertexFormScreen;