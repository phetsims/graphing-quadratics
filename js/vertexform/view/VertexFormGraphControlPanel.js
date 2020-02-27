// Copyright 2018-2019, University of Colorado Boulder

/**
 * Panel that contains controls for various features related to the graph on the 'Vertex Form' screen.
 *
 * @author Andrea Lin
 * @author Chris Malley (PixelZoom, Inc.)
 */

import merge from '../../../../phet-core/js/merge.js';
import VBox from '../../../../scenery/js/nodes/VBox.js';
import HSeparator from '../../../../sun/js/HSeparator.js';
import Panel from '../../../../sun/js/Panel.js';
import Tandem from '../../../../tandem/js/Tandem.js';
import GQColors from '../../common/GQColors.js';
import GQConstants from '../../common/GQConstants.js';
import AxisOfSymmetryCheckbox from '../../common/view/AxisOfSymmetryCheckbox.js';
import CoordinatesCheckbox from '../../common/view/CoordinatesCheckbox.js';
import EquationsCheckbox from '../../common/view/EquationsCheckbox.js';
import VertexCheckbox from '../../common/view/VertexCheckbox.js';
import graphingQuadratics from '../../graphingQuadratics.js';

class VertexFormGraphControlPanel extends Panel {

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
    const vertexCheckbox = new VertexCheckbox( viewProperties.vertexVisibleProperty, {
      tandem: options.tandem.createTandem( 'vertexCheckbox' )
    } );
    const axisOfSymmetryCheckbox = new AxisOfSymmetryCheckbox( viewProperties.axisOfSymmetryVisibleProperty, {
      tandem: options.tandem.createTandem( 'axisOfSymmetryCheckbox' )
    } );
    const equationsCheckbox = new EquationsCheckbox( viewProperties.equationsVisibleProperty, {
      tandem: options.tandem.createTandem( 'equationsCheckbox' )
    } );
    const coordinatesCheckbox = new CoordinatesCheckbox( viewProperties.coordinatesVisibleProperty, {
      tandem: options.tandem.createTandem( 'coordinatesCheckbox' )
    } );

    const maxCheckboxWidth = _.maxBy(
      [ vertexCheckbox, axisOfSymmetryCheckbox, equationsCheckbox, coordinatesCheckbox ],
      node => node.width ).width;

    // vertical layout
    const contentNode = new VBox( {
      align: 'left',
      spacing: GQConstants.CHECKBOXES_Y_SPACING,
      children: [
        vertexCheckbox,
        axisOfSymmetryCheckbox,
        new HSeparator( maxCheckboxWidth, { stroke: GQColors.SEPARATOR } ),
        equationsCheckbox,
        coordinatesCheckbox
      ]
    } );

    super( contentNode, options );
  }
}

graphingQuadratics.register( 'VertexFormGraphControlPanel', VertexFormGraphControlPanel );
export default VertexFormGraphControlPanel;