// Copyright 2018-2022, University of Colorado Boulder

/**
 * Panel that contains controls for various features related to the graph on the 'Focus and Directrix' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import { HSeparator, VBox } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQColors from '../../common/GQColors.js';
import GQConstants from '../../common/GQConstants.js';
import CoordinatesCheckbox from '../../common/view/CoordinatesCheckbox.js';
import EquationsCheckbox from '../../common/view/EquationsCheckbox.js';
import VertexCheckbox from '../../common/view/VertexCheckbox.js';
import graphingQuadratics from '../../graphingQuadratics.js';
import DirectrixCheckbox from './DirectrixCheckbox.js';
import FocusCheckbox from './FocusCheckbox.js';
import PointOnParabolaCheckbox from './PointOnParabolaCheckbox.js';

export default class FocusAndDirectrixGraphControlPanel extends Panel {

  /**
   * @param {FocusAndDirectrixViewProperties} viewProperties
   * @param {Object} [options]
   */
  constructor( viewProperties, options ) {

    options = merge( {

      // phet-io
      tandem: Tandem.REQUIRED,
      phetioDocumentation: 'panel that contains controls related to the graph'

    }, GQConstants.PANEL_OPTIONS, options );

    // checkboxes
    const vertexCheckbox = new VertexCheckbox( viewProperties.vertexVisibleProperty,
      options.tandem.createTandem( 'vertexCheckbox' ) );
    const focusCheckbox = new FocusCheckbox( viewProperties.focusVisibleProperty,
      options.tandem.createTandem( 'focusCheckbox' ) );
    const directrixCheckbox = new DirectrixCheckbox( viewProperties.directrixVisibleProperty,
      options.tandem.createTandem( 'directrixCheckbox' ) );
    const pointOnParabolaCheckbox = new PointOnParabolaCheckbox( viewProperties.pointOnParabolaVisibleProperty,
      options.tandem.createTandem( 'pointOnParabolaCheckbox' ) );
    const equationsCheckbox = new EquationsCheckbox( viewProperties.equationsVisibleProperty,
      options.tandem.createTandem( 'equationsCheckbox' ) );
    const coordinatesCheckbox = new CoordinatesCheckbox( viewProperties.coordinatesVisibleProperty,
      options.tandem.createTandem( 'coordinatesCheckbox' ) );

    // vertical layout
    const contentNode = new VBox( {
      align: 'left',
      spacing: GQConstants.CHECKBOXES_Y_SPACING,
      children: [
        vertexCheckbox,
        focusCheckbox,
        directrixCheckbox,
        pointOnParabolaCheckbox,
        new HSeparator( { stroke: GQColors.SEPARATOR } ),
        equationsCheckbox,
        coordinatesCheckbox
      ]
    } );

    super( contentNode, options );
  }
}

graphingQuadratics.register( 'FocusAndDirectrixGraphControlPanel', FocusAndDirectrixGraphControlPanel );