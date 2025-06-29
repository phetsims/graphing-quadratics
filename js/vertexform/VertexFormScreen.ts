// Copyright 2014-2025, University of Colorado Boulder

/**
 * The 'Vertex Form' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import Screen from '../../../joist/js/Screen.js';
import Tandem from '../../../tandem/js/Tandem.js';
import GQColors from '../common/GQColors.js';
import GQScreenIconFactory from '../common/view/GQScreenIconFactory.js';
import graphingQuadratics from '../graphingQuadratics.js';
import GraphingQuadraticsStrings from '../GraphingQuadraticsStrings.js';
import VertexFormModel from './model/VertexFormModel.js';
import VertexFormScreenView from './view/VertexFormScreenView.js';

export default class VertexFormScreen extends Screen<VertexFormModel, VertexFormScreenView> {

  public constructor( tandem: Tandem ) {

    const options = {

      // ScreenOptions
      name: GraphingQuadraticsStrings.screen.vertexFormStringProperty,
      backgroundColorProperty: GQColors.screenBackgroundColorProperty,
      homeScreenIcon: GQScreenIconFactory.createVertexFormScreenIcon(),

      // Workaround for https://github.com/phetsims/joist/issues/532, which will not be fixed.
      navigationBarIcon: GQScreenIconFactory.createVertexFormScreenIcon(),

      screenButtonsHelpText: GraphingQuadraticsStrings.a11y.vertexFormScreen.screenButtonsHelpTextStringProperty,

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