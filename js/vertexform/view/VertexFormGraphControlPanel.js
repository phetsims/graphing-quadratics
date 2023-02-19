// Copyright 2018-2022, University of Colorado Boulder

/**
 * Panel that contains controls for various features related to the graph on the 'Vertex Form' screen.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import { HSeparator, VBox } from '../../../../scenery/js/imports.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQColors from '../../common/GQColors.js';
import GQConstants from '../../common/GQConstants.js';
import GQCheckbox from '../../common/view/GQCheckbox.js';
import graphingQuadratics from '../../graphingQuadratics.js';

export default class VertexFormGraphControlPanel extends Panel {

  /**
   * @param {VertexFormViewProperties} viewProperties
   * @param {Object} [options]
   */
  constructor( viewProperties, options ) {

    options = merge( {

      // phet-io
      tandem: Tandem.REQUIRED,
      phetioDocumentation: 'panel that contains controls related to the graph'

    }, GQConstants.PANEL_OPTIONS, options );

    // checkboxes
    const vertexCheckbox = GQCheckbox.createVertexManipulatorCheckbox( viewProperties.vertexVisibleProperty,
      options.tandem.createTandem( 'vertexCheckbox' ) );
    const axisOfSymmetryCheckbox = GQCheckbox.createAxisOfSymmetryCheckbox(
      viewProperties.axisOfSymmetryVisibleProperty, options.tandem.createTandem( 'axisOfSymmetryCheckbox' ) );
    const equationsCheckbox = GQCheckbox.createEquationsCheckbox( viewProperties.equationsVisibleProperty,
      options.tandem.createTandem( 'equationsCheckbox' ) );
    const coordinatesCheckbox = GQCheckbox.createCoordinatesCheckbox( viewProperties.coordinatesVisibleProperty,
      options.tandem.createTandem( 'coordinatesCheckbox' ) );

    // vertical layout
    const contentNode = new VBox( {
      align: 'left',
      spacing: GQConstants.CHECKBOXES_Y_SPACING,
      children: [
        vertexCheckbox,
        axisOfSymmetryCheckbox,
        new HSeparator( { stroke: GQColors.SEPARATOR } ),
        equationsCheckbox,
        coordinatesCheckbox
      ]
    } );

    super( contentNode, options );
  }
}

graphingQuadratics.register( 'VertexFormGraphControlPanel', VertexFormGraphControlPanel );